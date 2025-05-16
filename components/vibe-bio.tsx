"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Share2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type BioMode = "dating" | "twitter" | "villain"

const BIO_TRANSFORMERS: Record<BioMode, (bio: string) => string> = {
  dating: (bio) => {
    const phrases = [
      "Will ghost you after 2 dates 💔",
      "Fluent in sarcasm and red flags 🚩",
      "Looking for someone to share my trauma with 🥰",
      "I'm not like other people, I'm worse 💅",
      "Emotionally unavailable but physically present 🙃",
      "Recovering overthinker. Coding and coping.",
      "My therapist warned you about me 🤷‍♀️",
      "Swipe right if you enjoy chaos 🔥",
    ]

    // Extract keywords from bio
    const keywords = bio.split(/\s+/).filter((word) => word.length > 4)
    let result = ""

    if (keywords.length > 0) {
      // Use a keyword in the transformed bio
      const keyword = keywords[Math.floor(Math.random() * keywords.length)]
      result = `${keyword} enthusiast. `
    }

    // Add random phrases
    const numPhrases = 1 + Math.floor(Math.random() * 2)
    for (let i = 0; i < numPhrases; i++) {
      const phrase = phrases[Math.floor(Math.random() * phrases.length)]
      result += `${phrase} `
    }

    return result
  },

  twitter: (bio) => {
    const twitterPhrases = [
      "professional overthinker",
      "chronically online",
      "posting through it",
      "terminally online",
      "extremely normal person",
      "shitposter extraordinaire",
      "hot takes and cold brew",
      "tweets are my own (nobody else wants them)",
      "my mutuals are my family (i'm being held hostage)",
      "ratio enthusiast",
    ]

    let result = ""

    // Add random phrases and emojis
    const numPhrases = 2 + Math.floor(Math.random() * 3)
    for (let i = 0; i < numPhrases; i++) {
      const phrase = twitterPhrases[Math.floor(Math.random() * twitterPhrases.length)]
      result += `${phrase} | `
    }

    // Add random emojis
    const emojis = ["✨", "🔥", "💀", "🤡", "🌈", "🧠", "👁️", "🫠", "🙃", "🤌"]
    const numEmojis = 2 + Math.floor(Math.random() * 4)
    for (let i = 0; i < numEmojis; i++) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]
      result += emoji
    }

    return result
  },

  villain: (bio) => {
    const villainPhrases = [
      "plotting world domination since [YEAR]",
      "your nightmares are my dreams",
      "chaos is a ladder, and I'm climbing",
      "the villain in everyone's story",
      "my enemies list is also my contact list",
      "professionally petty",
      "living rent-free in your head",
      "I don't get mad, I get even",
      "the main character, but evil",
    ]

    // Extract year if present in bio
    const yearMatch = bio.match(/\b(19|20)\d{2}\b/)
    const year = yearMatch ? yearMatch[0] : "2000"

    let result = ""

    // Add villain intro
    result += "Villain arc loading... 100% complete. "

    // Add customized villain phrase
    const phrase = villainPhrases[Math.floor(Math.random() * villainPhrases.length)]
    result += phrase.replace("[YEAR]", year)

    // Add evil emojis
    const evilEmojis = ["😈", "🖤", "⚡", "🔪", "🥀", "🦇", "🕸️", "🧛", "☠️", "🌑"]
    const numEmojis = 1 + Math.floor(Math.random() * 3)
    result += " "
    for (let i = 0; i < numEmojis; i++) {
      const emoji = evilEmojis[Math.floor(Math.random() * evilEmojis.length)]
      result += emoji
    }

    return result
  },
}

const MODE_LABELS: Record<BioMode, { title: string; emoji: string }> = {
  dating: { title: "Dating App Bio", emoji: "💘" },
  twitter: { title: "Sh*tposter Twitter Mode", emoji: "🐦" },
  villain: { title: "Villain Arc", emoji: "😈" },
}

export function VibeBio() {
  const [inputBio, setInputBio] = useState("")
  const [selectedMode, setSelectedMode] = useState<BioMode>("dating")
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)

  const handleTransform = () => {
    if (!inputBio.trim()) return

    const transformedBio = BIO_TRANSFORMERS[selectedMode](inputBio)
    setResult(transformedBio)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Vibe My Bio</h2>
        <p className="text-white/80">Transform your boring bio into something chaotic</p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Paste your current bio here (e.g., from LinkedIn, Instagram, etc.)"
          value={inputBio}
          onChange={(e) => setInputBio(e.target.value)}
          className="min-h-[120px] bg-white/20 border-white/30 text-white placeholder:text-white/50"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {Object.entries(MODE_LABELS).map(([key, { title, emoji }]) => (
            <Button
              key={key}
              variant={selectedMode === key ? "default" : "outline"}
              className={cn(
                "border-white/30 text-white",
                selectedMode === key ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-white/10 hover:bg-white/20",
              )}
              onClick={() => setSelectedMode(key as BioMode)}
            >
              <span className="mr-2 text-xl">{emoji}</span>
              {title}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleTransform}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          disabled={!inputBio.trim()}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Transform My Bio
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-500 border-white/20 text-white mt-4">
            <div className="text-center mb-4">
              <span className="text-2xl">{MODE_LABELS[selectedMode].emoji}</span>
              <h3 className="font-bold text-lg">{MODE_LABELS[selectedMode].title}</h3>
            </div>

            <div className="bg-black/20 p-4 rounded-lg mb-4 text-lg">{result}</div>

            <div className="flex gap-2 justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                className={cn(copied ? "bg-green-500 text-white" : "")}
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy Bio"}
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
