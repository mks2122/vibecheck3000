"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Copy, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

type TranslationMode = "genz" | "meme" | "rizz" | "corporate"

const TRANSLATIONS: Record<TranslationMode, (text: string) => string> = {
  genz: (text) => {
    const genzPhrases = [
      "no cap",
      "fr fr",
      "bussin",
      "slay",
      "vibes",
      "main character energy",
      "living rent free",
      "understood the assignment",
      "it's giving",
      "based",
    ]
    const emojis = ["💀", "😭", "🔥", "✨", "👁️👄👁️", "🤌", "🥺", "💅", "😤", "🙏"]

    // Simplistic transformation for demo purposes
    let result = text
      .toLowerCase()
      .replace(/working/g, "grinding")
      .replace(/tired/g, "dead")
      .replace(/good/g, "bussin")
      .replace(/happy/g, "living my best life")
      .replace(/sad/g, "not the vibe")

    // Add random Gen Z phrase
    const randomPhrase = genzPhrases[Math.floor(Math.random() * genzPhrases.length)]
    result += ` ${randomPhrase}`

    // Add random emojis
    const numEmojis = 1 + Math.floor(Math.random() * 3)
    for (let i = 0; i < numEmojis; i++) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]
      result += ` ${emoji}`
    }

    return result
  },

  meme: (text) => {
    const memeFormats = [
      `nobody:\nme: ${text}`,
      `*${text}*\n[everyone liked that]`,
      `when you ${text.toLowerCase()}\n*confused screaming*`,
      `${text}\nbottom text`,
      `me, an intellectual: ${text}`,
    ]

    return memeFormats[Math.floor(Math.random() * memeFormats.length)]
  },

  rizz: (text) => {
    const rizzPhrases = [
      "are you a parking ticket? because you've got FINE written all over you",
      "must be a museum, because you're a work of art",
      "did it hurt when you fell from the vending machine? cause you're a snack",
      "are you made of copper and tellurium? Because you're Cu-Te",
      "are you from Tennessee? Because you're the only 10 I see",
    ]

    const randomRizz = rizzPhrases[Math.floor(Math.random() * rizzPhrases.length)]
    return `${text}... speaking of which, ${randomRizz} 😏✨`
  },

  corporate: (text) => {
    // Corporate to cursed
    const cursedCorporate = [
      "per my last email, the souls of the damned cry out for release",
      "circling back on our synergy opportunities in the void",
      "let's take this offline and into the eternal abyss",
      "just touching base from the shadow realm",
      "we need to leverage our core competencies in existential dread",
    ]

    return `RE: ${text}\n\nAs discussed in our meeting,\n${cursedCorporate[Math.floor(Math.random() * cursedCorporate.length)]}\n\nBest,\nManagement 👹`
  },
}

const MODE_LABELS: Record<TranslationMode, string> = {
  genz: "Gen Z Speak",
  meme: "Meme Mode",
  rizz: "Flirty Rizz",
  corporate: "Corporate-to-Cursed",
}

export function VibeTranslator() {
  const [inputText, setInputText] = useState("")
  const [mode, setMode] = useState<TranslationMode>("genz")
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)

  const handleTranslate = () => {
    if (!inputText.trim()) return

    const translatedText = TRANSLATIONS[mode](inputText)
    setResult(translatedText)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Vibe Translator</h2>
        <p className="text-white/80">Transform your boring text into chaotic vibes</p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Enter your text here (e.g., 'Working late tonight')"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[100px] bg-white/20 border-white/30 text-white placeholder:text-white/50"
        />

        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">Choose your vibe:</h3>
          <RadioGroup
            value={mode}
            onValueChange={(value) => setMode(value as TranslationMode)}
            className="grid grid-cols-2 gap-2"
          >
            {Object.entries(MODE_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem value={key} id={key} className="text-purple-600" />
                <Label htmlFor={key} className="text-white cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button
          onClick={handleTranslate}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          disabled={!inputText.trim()}
        >
          Translate My Vibe
        </Button>

        {result && (
          <Card className="p-4 bg-white/10 border-white/20 text-white mt-4">
            <div className="whitespace-pre-line mb-4 text-lg">{result}</div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                className={cn(copied ? "bg-green-500 text-white" : "")}
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
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
