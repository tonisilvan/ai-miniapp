export type ModelId = "gpt-4o-mini" | "gpt-4o"

type Price = { in: number; out: number }

/**
* Prices in USD per 1M tokens (input/output)
*/
export const PRICES: Record<ModelId, Price> = {
"gpt-4o-mini": { in: 0.15, out: 0.60 },
"gpt-4o": { in: 2.5, out: 10.0 },
} as const

function isModelId(x: string): x is ModelId {
  return x in PRICES
}

/**
 * Estimate cost in USD using OpenAI usage object.
 * Falls back to "gpt-4o-mini" if the provided model is unknown.
 */
export function estimateUSD(
  model: string,
  usage: { prompt_tokens?: number; completion_tokens?: number }
) {
  const key: ModelId = isModelId(model) ? model : "gpt-4o-mini"
  const p = PRICES[key]

  const inTok = usage.prompt_tokens ?? 0
  const outTok = usage.completion_tokens ?? 0

  const input = (inTok / 1_000_000) * p.in
  const output = (outTok / 1_000_000) * p.out

  return { input, output, total: input + output }
}
