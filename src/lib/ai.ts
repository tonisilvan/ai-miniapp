import { buildMessages } from "./prompts"
import { PromptInput } from "./guardrails"
import { estimateUSD } from "./pricing"

const OPENAI_URL = "https://api.openai.com/v1/chat/completions"

type ExtendedInput = PromptInput & { model?: string }

export async function callAI(input: ExtendedInput) {
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    return { ok: false, status: 500, error: "Missing OPENAI_API_KEY" } as const
  }

  // Allow model override; default to a cheap model for demos
  const model = input.model ?? "gpt-4o-mini"

  const body = {
    model,
    messages: buildMessages(input.prompt, input.system),
    max_tokens: input.maxTokens,
    temperature: input.temperature,
  }

  const startedAt = Date.now()
  const r = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  })
  const latencyMs = Date.now() - startedAt

  if (!r.ok) {
    const err = await r.text().catch(() => "")
    return { ok: false, status: r.status, error: err || r.statusText } as const
  }

  const data = await r.json()
  const text =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    ""

  // OpenAI normally includes usage here: { prompt_tokens, completion_tokens, total_tokens }
  const usage = data?.usage ?? {}
  const cost = estimateUSD(model, usage)

  return {
    ok: true,
    status: 200,
    data: {
      text,
      usage,       // {prompt_tokens, completion_tokens, total_tokens}
      cost,        // {input, output, total} in USD
      model,
      latencyMs,
      raw: data,   // (optional) useful for a dev panel
    },
  } as const
}
