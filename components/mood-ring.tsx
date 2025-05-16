"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Download, Share2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { queryLLM } from "@/lib/llmUtil"
import { getMemeFromGiphy } from "@/lib/giphy"

export function MoodRing() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<{ text: string; gif: string } | null>(null)
  const [pulseSize, setPulseSize] = useState(100)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const handleScan = async () => {
    if (scanning) return
    setScanning(true)
    setPulseSize(100)

    // start pulsing
    const pulseInterval = setInterval(() => {
      setPulseSize((prev) => (prev >= 150 ? 100 : prev + 10))
    }, 200)

    // perform scan animation then fetch vibe and gif
    setTimeout(async () => {
      clearInterval(pulseInterval)
      // 1. Generate vibe text via LLM
      const systemInstruction = "You are a meme mood ring: generate a short,chaotic, playful, meme-style vibe description in one sentence."
      const userPrompt = "Generate a random vibe description for a user aura scan."
      let vibeText = ""
      try {
        vibeText = await queryLLM(systemInstruction, userPrompt)
      } catch (e) {
        console.error(e)
        vibeText = "You're radiating keyboard smash energy: asdkljfa 😵"
      }

      // 2. Fetch relevant GIF from Giphy
      let gifUrl = ""
      try {
        // use a keyword or entire text for search
        const searchTerm = vibeText.split(' ').slice(0, 3).join(' ')
        const fetchedGif = await getMemeFromGiphy(searchTerm)
        gifUrl = fetchedGif || "/placeholder.svg?height=200&width=300"
      } catch {
        gifUrl = "/placeholder.svg?height=200&width=300"
      }

      setResult({ text: vibeText, gif: gifUrl })
      setScanning(false)
    }, 3000)
  }

  const resetScan = () => {
    setResult(null)
    setShowEasterEgg(false)
  }

  const triggerEasterEgg = () => {
    setShowEasterEgg(true)
    setResult({ text: "WOW, YOU FOUND THE OBVIOUS EASTER EGG 👏👏👏\nHERE YOU GO 🤡", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGJtaThxdHNmeml4Y2RmMmt1bmo5ZTJoaTN0b3VzNGdlMTE1YnF1YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aCFhMQwKwsvjLERlGB/giphy.gif" })
    setTimeout(() => setShowEasterEgg(false), 3000)
  }

  useEffect(() => {


    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`") triggerEasterEgg()
    }

    const easterEggBtn = document.getElementById("easter-egg")
    if (easterEggBtn) {
      easterEggBtn.addEventListener("click", triggerEasterEgg)
    }
    return () => {
      if (easterEggBtn) {
      easterEggBtn.removeEventListener("click", triggerEasterEgg)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Mood Ring</h2>
        <p className="text-white/80">Click to scan your chaotic aura</p>
      </div>

      {!result ? (
        <div className="relative w-64 h-64 flex items-center justify-center cursor-pointer mb-8" onClick={handleScan}>
          <div
            className={cn("absolute rounded-full bg-purple-500/30 transition-all duration-500", scanning ? "" : "")}
            style={{ width: `${pulseSize}%`, height: `${pulseSize}%`, opacity: scanning ? 0.7 : 0.3 }}
          />
          <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
            {scanning ? <Loader2 className="w-10 h-10 text-white animate-spin" /> : <span className="text-4xl">🔮</span>}
          </div>
        </div>
      ) : (
        <Card
          className={cn(
            "w-full max-w-md p-6 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white border-2 border-white/20 shadow-xl transition-all duration-300",
            showEasterEgg ? "animate-shake" : ""
          )}
        >
          <div className="flex flex-col items-center">
            <div className="mb-4 rounded-lg overflow-hidden border-2 border-white/30">
              <Image src={result.gif} alt="Vibe result" width={300} height={200} className="w-full object-cover" />
            </div>

            <h3 className="text-xl font-bold text-center mb-6 whitespace-pre-wrap">{result.text}</h3>

            <div className="flex gap-3">
              <Button variant="secondary" size="sm" onClick={resetScan}>
                Scan Again
              </Button>
              {/* <Button variant="outline" size="sm" className="bg-white/10">
                <Download className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button> */}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
