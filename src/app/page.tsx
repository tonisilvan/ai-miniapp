import { Suspense } from "react"
import HomeClient from "./_home-client"

export default function Page() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <HomeClient />
    </Suspense>
  )
}
