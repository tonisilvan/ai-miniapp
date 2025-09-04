import "@/styles/globals.css"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "AIMiniApp", description: "AI mini-app" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-4xl p-6">
        <nav className="mb-6 flex gap-4 text-sm text-muted-foreground">
          <Link href="/">Home</Link>
          <Link href="/demos">Demos</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}