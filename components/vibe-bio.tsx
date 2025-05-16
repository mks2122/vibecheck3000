"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Share2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { queryLLM  } from "@/lib/llmUtil"

const MODE_LABELS = {
  dating: { title: "Dating App Bio", emoji: "💘" },
  twitter: { title: "Sh*tposter Twitter Mode", emoji: "🐦" },
  villain: { title: "Villain Arc", emoji: "😈" },
} as const

type BioMode = keyof typeof MODE_LABELS

export function VibeBio() {
  const [inputBio, setInputBio] = useState("")
  const [selectedMode, setSelectedMode] = useState<BioMode>("dating")
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleTransform = async () => {
    if (!inputBio.trim()) return
    setLoading(true)
    const systemInstruction = `You are a creative assistant that transforms bios based on selected modes: dating, twitter, or villain. Use the mode to rewrite the bio in a witty, chaotic, or darkly humorous way. just give me a single answer without any explanation and anyother unnecessary texts.`
    const userPrompt = `Transform the following bio in '${selectedMode}' mode:\n\n${inputBio}`
    const transformed = await queryLLM (systemInstruction, userPrompt)
    setResult(transformed)
    setLoading(false)
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
        <p className="text-white/80">Transform your boring bio into something chaotic (powered by AI)</p>
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
          disabled={!inputBio.trim() || loading}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {loading ? "Transforming..." : "Transform My Bio"}
        </Button>

        {result && (
          <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-500 border-white/20 text-white mt-4">
            <div className="text-center mb-4">
              <span className="text-2xl">{MODE_LABELS[selectedMode].emoji}</span>
              <h3 className="font-bold text-lg">{MODE_LABELS[selectedMode].title}</h3>
            </div>

            <div className="bg-black/20 p-4 rounded-lg mb-4 text-lg whitespace-pre-wrap">{result}</div>

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
              {/* <Button variant="outline" size="sm" className="bg-white/10 text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button> */}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
