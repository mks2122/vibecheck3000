"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Copy, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { queryLLM } from "@/lib/llmUtil"

type TranslationMode = "genz" | "meme" | "rizz" | "corporate"

const MODE_LABELS: Record<TranslationMode, string> = {
  genz: "Gen Z Speak",
  meme: "Meme Mode",
  rizz: "Flirty Rizz",
  corporate: "Corporate-to-Cursed",
}

const MODE_INSTRUCTIONS: Record<TranslationMode, string> = {
  genz: "Rewrite the following text in Gen Z speak, using slang, abbreviations, and emojis.just give me a single answer without any explanation and anyother unnecessary texts.",
  meme: "Transform the following text into a meme format, using popular meme templates.just give me a single answer without any explanation and anyother unnecessary texts.",
  rizz: "Add a flirty 'rizz' twist to the following text, with playful pickup lines.just give me a single answer without any explanation and anyother unnecessary texts.",
  corporate: "Rewrite the following text as a corporate email with a darkly humorous or cursed tone.just give me a single answer without any explanation and anyother unnecessary texts.",
}

export function VibeTranslator() {
  const [inputText, setInputText] = useState("")
  const [mode, setMode] = useState<TranslationMode>("genz")
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setLoading(true)
    try {
      const systemInstruction = MODE_INSTRUCTIONS[mode]
      const userPrompt = `Translate the following text in '${mode}' mode:\n\n${inputText}`
      const translated = await queryLLM(systemInstruction, userPrompt)
      setResult(translated)
    } catch (error) {
      console.error(error)
      setResult("Something went wrong while translating 😢")
    } finally {
      setLoading(false)
    }
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
        <p className="text-white/80">Transform your boring text into chaotic vibes (AI powered)</p>
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
          disabled={!inputText.trim() || loading}
        >
          {loading ? "Translating..." : "Translate My Vibe"}
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
