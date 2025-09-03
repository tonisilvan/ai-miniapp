"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"

export default function ChatForm() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setAnswer(null)
    setError(null)

    try {
      const r = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, maxTokens: 200, temperature: 0.7 })
      })
      const data = await r.json()
      if (!r.ok || data?.error) {
        setError(data?.error || "Error")
      } else {
        setAnswer(data?.text ?? JSON.stringify(data))
      }
    } catch (err: any) {
      setError(err?.message ?? "Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-lg font-semibold">Probar prompt</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full min-h-[120px] rounded-md border p-2"
            placeholder="Escribe tu prompt…"
          />
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={loading || !prompt.trim()}>
              {loading ? "Pensando…" : "Enviar"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => { setPrompt(""); setAnswer(null); setError(null); }}>
              Limpiar
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {answer && (
            <div className="rounded-md bg-neutral-50 p-3 text-sm dark:bg-neutral-900">
              {answer}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
