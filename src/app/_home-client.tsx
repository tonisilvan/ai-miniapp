"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type Meta = { tokens?: number; usd?: number; model?: string; ms?: number }

export default function HomeClient() {
  const searchParams = useSearchParams()
  const [prompt, setPrompt] = useState("")
  const [answer, setAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState<Meta | null>(null)

  // Initialize from ?preset=
  useEffect(() => {
    const preset = searchParams.get("preset")
    if (preset) setPrompt(preset)
  }, [searchParams])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setAnswer(null)
    setMeta(null)

    try {
      const r = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, maxTokens: 200, temperature: 0.7 }),
      })
      const data = await r.json()
      if (!r.ok || data?.error) {
        setAnswer(`❌ ${data?.error ?? "Unknown error"}`)
      } else {
        setAnswer(data?.text ?? "")
        setMeta({
          tokens: data?.usage?.total_tokens,
          usd: typeof data?.cost?.total === "number" ? data.cost.total : undefined,
          model: data?.model,
          ms: data?.latencyMs,
        })
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error"
      setAnswer(`❌ ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">AIMiniApp</h1>
        <p className="text-muted-foreground">
          A minimal UI to experiment with prompts and an AI provider.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Your idea</Label>
              <Textarea
                id="prompt"
                rows={5}
                placeholder="E.g. Summarize this text, generate 3 ideas, etc."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading || !prompt.trim()}>
                {loading ? "Thinking…" : "Send"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setPrompt("")
                  setAnswer(null)
                  setMeta(null)
                }}
              >
                Clear
              </Button>
            </div>
          </form>

          {answer && (
            <div className="mt-4 space-y-2">
              <Label>Response</Label>
              <pre className="whitespace-pre-wrap rounded-md border bg-muted/40 p-3 text-sm">
                {answer}
              </pre>
              {meta && (
                <p className="text-xs text-muted-foreground">
                  {meta.model ? `${meta.model} · ` : ""}
                  {typeof meta.usd === "number" ? `cost: $${meta.usd.toFixed(4)} · ` : ""}
                  {meta.tokens ? `tokens: ${meta.tokens} · ` : ""}
                  {meta.ms ? `latency: ${meta.ms}ms` : ""}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
