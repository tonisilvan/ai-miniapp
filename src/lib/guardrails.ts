import { z } from "zod"

export const PromptSchema = z.object({
prompt: z.string().min(1, "Prompt requerido").max(4000, "Demasiado largo"),
  system: z.string().optional(),
  maxTokens: z.number().int().min(16).max(800),
  temperature: z.number().min(0).max(1).default(0.7)
})

export type PromptInput = z.infer<typeof PromptSchema>

const BLOCKLIST = [/terrorismo/i, /instrucciones.*(arma|explosivo)/i]

export function filterUnsafe(input: string) {
  return BLOCKLIST.some((rx) => rx.test(input))
}

export function sanitize(s: string) {
  return s.replaceAll(/\u0000/g, "").trim()
}
