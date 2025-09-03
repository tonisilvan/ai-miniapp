import { buildMessages } from "./prompts"
import { PromptInput } from "./guardrails"

const OPENAI_URL = "https://api.openai.com/v1/chat/completions"

export async function callAI(input: PromptInput) {
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    return { ok: false, status: 500, error: "Missing OPENAI_API_KEY" } as const
  }

  const body = {
    model: "gpt-4o-mini", // editable
    messages: buildMessages(input.prompt, input.system),
    max_tokens: input.maxTokens,
    temperature: input.temperature
  }

  const r = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify(body)
  })

  if (!r.ok) {
    const err = await r.text().catch(() => "")
    return { ok: false, status: r.status, error: err || r.statusText } as const
  }

  const data = await r.json()
  const text =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    ""

  return { ok: true, status: 200, data: { text, raw: data } } as const
}
