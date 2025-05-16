"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Download, Share2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const VIBES = [
  { text: "You're giving SpongeBob grindset energy 🍍💼", gif: "/placeholder.svg?height=200&width=300" },
  {
    text: "Main character energy with side character responsibilities 💅",
    gif: "/placeholder.svg?height=200&width=300",
  },
  { text: "Chaotic good with a hint of caffeinated panic 🧠☕", gif: "/placeholder.svg?height=200&width=300" },
  { text: "Giving 'I'll do it tomorrow' but make it fashion 💫", gif: "/placeholder.svg?height=200&width=300" },
  { text: "Unhinged optimism meets organized chaos 🌈🔥", gif: "/placeholder.svg?height=200&width=300" },
  { text: "Chronically online but spiritually offline 📱🧘", gif: "/placeholder.svg?height=200&width=300" },
  { text: "Emotional support meme dealer energy 🤝", gif: "/placeholder.svg?height=200&width=300" },
  { text: "Overthinking but make it aesthetic ✨🤔", gif: "/placeholder.svg?height=200&width=300" },
  { text: "Radiating 'I'm fine' but in italic *I'm fine* 🙃", gif: "/placeholder.svg?height=200&width=300" },
]

export function MoodRing() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<(typeof VIBES)[0] | null>(null)
  const [pulseSize, setPulseSize] = useState(100)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const handleScan = () => {
    if (scanning || result) return

    setScanning(true)
    setPulseSize(100)

    // Pulse animation
    const pulseInterval = setInterval(() => {
      setPulseSize((prev) => {
        if (prev >= 150) return 100
        return prev + 10
      })
    }, 200)

    // After 3 seconds, show result
    setTimeout(() => {
      clearInterval(pulseInterval)
      setScanning(false)

      // Random vibe result
      const randomVibe = VIBES[Math.floor(Math.random() * VIBES.length)]
      setResult(randomVibe)
    }, 3000)
  }

  const resetScan = () => {
    setResult(null)
    setScanning(false)
  }

  const triggerEasterEgg = () => {
    setShowEasterEgg(true)
    setResult({
      text: "You're radiating keyboard smash energy: asdkljfa 😵",
      gif: "/placeholder.svg?height=200&width=300",
    })

    setTimeout(() => {
      setShowEasterEgg(false)
    }, 3000)
  }

  // Easter egg on shake or hidden button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`") {
        triggerEasterEgg()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Meme Mood Ring</h2>
        <p className="text-white/80">Click and hold to scan your chaotic aura</p>
      </div>

      {!result ? (
        <div className="relative w-64 h-64 flex items-center justify-center cursor-pointer mb-8" onClick={handleScan}>
          <div
            className={cn(
              "absolute rounded-full bg-purple-500/30 transition-all duration-500",
              scanning ? "animate-pulse" : "",
            )}
            style={{
              width: `${pulseSize}%`,
              height: `${pulseSize}%`,
              opacity: scanning ? 0.7 : 0.3,
            }}
          />
          <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
            {scanning ? (
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            ) : (
              <span className="text-4xl">🔮</span>
            )}
          </div>
        </div>
      ) : (
        <Card
          className={cn(
            "w-full max-w-md p-6 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white border-2 border-white/20 shadow-xl transition-all duration-300",
            showEasterEgg ? "animate-shake" : "",
          )}
        >
          <div className="flex flex-col items-center">
            <div className="mb-4 rounded-lg overflow-hidden border-2 border-white/30">
              <Image
                src={result.gif || "/placeholder.svg"}
                alt="Vibe result"
                width={300}
                height={200}
                className="w-full object-cover"
              />
            </div>

            <h3 className="text-xl font-bold text-center mb-6">{result.text}</h3>

            <div className="flex gap-3">
              <Button variant="secondary" size="sm" onClick={resetScan}>
                Scan Again
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
