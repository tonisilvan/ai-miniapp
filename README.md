# AI Mini-App

An experimental project showcasing integration of **AI capabilities** into a modern web application.  
Built with **Next.js** and **TypeScript**, it provides a minimal API layer to interact with an AI provider (e.g., OpenAI), 
guardrails for prompt safety, and a simple frontend UI for experimentation.

---

## 🚀 Tech Stack

- **Framework**: Next.js (App Router, API routes)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **AI Integration**: OpenAI API (or other LLM provider)
- **Auth**: Basic key-based auth (optional)
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel (serverless functions)
- **CI/CD**: GitHub Actions

---

## 📂 Project Structure

```
ai-miniapp/
├─ src/
│  ├─ app/                  # Next.js App Router pages
│  │  ├─ page.tsx           # Home
│  │  ├─ layout.tsx         # Root layout
│  │  ├─ api/ai/route.ts    # AI endpoint (proxy to provider)
│  │  └─ demos/             # Example UIs
│  ├─ components/           # UI components
│  ├─ lib/                  # AI helpers (prompt builder, validation)
│  ├─ styles/               # Tailwind styles
│  └─ public/               # static assets
├─ test/                    # tests
├─ package.json
└─ README.md
```

---

## 🧩 Features

- Call external AI provider (e.g., OpenAI)
- Prompt builder & validator
- Guardrails (max tokens, content filtering, error handling)
- Minimal UI to experiment with prompts
- Optional usage tracking with Upstash Redis or DB

---

## ⚙️ Getting Started

### Prerequisites
- Node.js LTS (≥ 20)
- npm (or pnpm/yarn)
- API key from OpenAI (or compatible provider)

### Installation
```bash
git clone https://github.com/tonisilvan/ai-miniapp.git
cd ai-miniapp
npm install
```

### Environment

Create `.env.local`:

```dotenv
OPENAI_API_KEY=sk-xxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Run locally
```bash
npm run dev
# open http://localhost:3000
```

### Production build
```bash
npm run build
npm start
```

---

## 🧪 Testing

- Unit tests with Vitest
- Component tests with React Testing Library
- Example test:
```bash
npm test
```

---

## 📜 Roadmap

- [ ] Add prompt history
- [ ] Add cost estimation & token usage tracking
- [ ] Add user authentication (JWT/Clerk/Auth0)
- [ ] Add multi‑provider support (Anthropic, Cohere)
- [ ] Deploy demos to Vercel

---

## 📄 License

MIT © Toni Silván
