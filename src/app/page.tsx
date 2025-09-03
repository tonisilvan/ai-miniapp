import ChatForm from "@/components/chat-form"

export default function Page() {
  return (
    <main className="container">
      <h1 className="text-3xl font-bold">AIMiniApp</h1>
      <p className="text-sm text-neutral-500">
        Mini UI para experimentar con prompts y un endpoint proxy a un proveedor de IA.
      </p>
      <ChatForm />
    </main>
  )
}
