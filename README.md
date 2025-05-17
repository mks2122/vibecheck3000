# 🎉 VibeCheck 3000 🚀

**Welcome to VibeCheck 3000**—your one-stop chaotic, meme-infused, AI-powered vibe machine!
**Live Demo**: https://vibecheck3000.vercel.app/
---

## 😜 What Is This?

VibeCheck 3000 combines three wild features in a single page:

1. **Meme Mood Ring 🔮**

   * Click the crystal ball to scan your aura.
   * AI crafts a punchy one-liner vibe.
   * We fetch a matching meme/GIF to match your cosmic energy.
2. **Vibe Translator 💬**

   * Type any text (e.g. "Working late tonight").
   * Pick your vibe: Gen Z, Meme Mode, Flirty Rizz, or Corporate-to-Cursed.
   * AI transmogrifies your input into chaotic brilliance.
3. **Vibe My Bio 💘**

   * Paste your LinkedIn/Twitter/Instagram bio.
   * Choose your transformation mode: Dating App, Sh\*tposter Twitter, or Villain Arc.
   * AI spits out a wild, shareable bio.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React (Client Components), Tailwind CSS, Lucide Icons
* **AI & LLM:** Groq SDK → meta-llama/llama-4-scout-17b-16e-instruct
* **API Layer:** Next.js `app/api/` endpoints to proxy:

  * `/api/vibe` → Groq LLM for text generation
  * `/api/giphy` → Giphy REST for meme GIFs
* **Utilities:**

  * `lib/llmUtil.ts` → Generalized LLM query helper
  * `lib/giphy.ts` → Random-mood-based GIF fetcher

---

## 🚀 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/vibecheck3000.git
   cd vibecheck3000
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn
   ```

3. **Add Environment Variables**

   * Copy `.env.example` to `.env.local`
   * Fill in your keys:

     ```env
     GROQ_API_KEY=your_groq_api_key
     GIPHY_API_KEY=your_giphy_api_key
     ```

4. **Run locally**

   ```bash
   npm run dev
   # Or yarn dev
   ```

5. **Open your browser** at `http://localhost:3000`

---

## 🎉 Usage

* **Meme Mood Ring**: Click the orb, wait \~3s, and watch chaos unfold.
* **Vibe Translator**: Enter text → choose a mode → hit **Translate My Vibe**.
* **Vibe My Bio**: Paste your bio → pick a mode → **Transform My Bio** → copy/share.

---

## 📂 Project Structure

```
├── app/
│   ├── api/
│   │   ├── vibe/route.ts       # LLM proxy
│   ├── page.tsx                # Main UI page
│   └── ...                     # Layouts & globals
├── components/
│   ├── mood-ring.tsx
│   ├── vibe-translator.tsx
│   └── vibe-bio.tsx
├── lib/
│   ├── llmUtil.ts
│   └── giphy.ts
├── public/                     # Static assets & placeholders
├── .env                        # Sample env
├── next.config.js
└── package.json
```

---

## 🙏 Contributing

Pull requests, issues, and chaotic bug reports are welcome! Let’s make VibeCheck 3000 even more absurd.

---

## 🎉 License

MIT © 2025 VibeCheck Enthusiasts
