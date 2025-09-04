import { NextRequest } from "next/server"
import { PromptSchema, filterUnsafe, sanitize } from "@/lib/guardrails"
import { callAI } from "@/lib/ai"

export const runtime = "edge"            // good default for Vercel
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()

    const parsed = PromptSchema.safeParse({
      prompt: sanitize(json?.prompt ?? ""),
      system: sanitize(json?.system ?? ""),
      maxTokens: Number(json?.maxTokens) || 200,
      temperature: typeof json?.temperature === "number" ? json.temperature : 0.7,
    })
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid payload" },
        { status: 400 }
)
}

const { prompt } = parsed.data
if (filterUnsafe(prompt)) {
      return Response.json(
        { error: "Content not allowed by policy." },
        { status: 400 }
)
}

// Pass through optional model if present (schema doesn't require it)
const model = typeof json?.model === "string" ? json.model : undefined

const result = await callAI({ ...parsed.data, model })
if (!result.ok) {
      return Response.json({ error: result.error }, { status: result.status })
    }

    const { text, usage, cost, latencyMs } = result.data
    return Response.json({
      text,
      usage,
      cost,
      model: result.data.model,
      latencyMs,
    })
  } catch (e: any) {
    return Response.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    )
}
}
