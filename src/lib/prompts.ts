export function buildMessages(userPrompt: string, system?: string) {
  const sys = system?.trim() || "You are a helpful assistant."
  return [
    { role: "system", content: sys },
    { role: "user", content: userPrompt }
  ]
}
