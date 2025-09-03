import { NextRequest } from "next/server"
import { PromptSchema, filterUnsafe, sanitize } from "@/lib/guardrails"
import { callAI } from "@/lib/ai"

export const runtime = "edge" // ideal para Vercel
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = PromptSchema.safeParse({
      prompt: sanitize(json?.prompt ?? ""),
      system: sanitize(json?.system ?? ""),
      maxTokens: Number(json?.maxTokens) || 200,
      temperature: typeof json?.temperature === "number" ? json.temperature : 0.7
    })

    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid payload" }, { status: 400 })
    }

    const { prompt } = parsed.data
    if (filterUnsafe(prompt)) {
      return Response.json({ error: "Contenido no permitido por políticas." }, { status: 400 })
    }

    const result = await callAI(parsed.data)
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: result.status })
    }

    return Response.json({ text: result.data.text })
  } catch (e: any) {
    return Response.json({ error: e?.message ?? "Unknown error" }, { status: 500 })
  }
}
