export const PRICES = {
"gpt-4o-mini": { in: 0.15, out: 0.60 }, // USD por 1M tokens
"gpt-4o":      { in: 2.5,  out: 10.0 },
}
export function estimateUSD(model: string, usage: {prompt_tokens?:number;completion_tokens?:number}){
  const p = PRICES[model] ?? PRICES["gpt-4o-mini"]
  const inTok = usage.prompt_tokens ?? 0, outTok = usage.completion_tokens ?? 0
  const input = (inTok/1_000_000)*p.in, output = (outTok/1_000_000)*p.out
  return { input, output, total: input+output }
}
