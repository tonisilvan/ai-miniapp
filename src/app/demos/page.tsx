import Link from "next/link"

const examples = [
  {
    title: "Summarize text",
    prompt: "Summarize the following text in 3 bullet points:",
  },
  {
    title: "Write an email",
    prompt: "Write a professional email to a client about a delayed delivery.",
  },
  {
    title: "Generate ideas",
    prompt: "Give me 5 marketing campaign ideas for a coffee brand.",
  },
]

export default function DemosPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Demos</h1>
      <p className="text-sm text-muted-foreground">
        Example prompts you can try quickly.
      </p>
      <div className="grid gap-3">
        {examples.map((ex, i) => (
          <Link
            key={i}
            href={`/?preset=${encodeURIComponent(ex.prompt)}`}
            className="block rounded-md border p-4 hover:bg-accent"
          >
            <h2 className="font-medium">{ex.title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {ex.prompt}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
