import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoodRing } from "@/components/mood-ring"
import { VibeTranslator } from "@/components/vibe-translator"
import { VibeBio } from "@/components/vibe-bio"
import { SparklesIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md mb-2 flex items-center justify-center gap-2">
            <SparklesIcon className="h-8 w-8 md:h-12 md:w-12" />
            <span>VibeCheck 30<button>0</button>0</span>
            <SparklesIcon className="h-8 w-8 md:h-12 md:w-12" />
          </h1>
          <p className="text-white/90 text-lg md:text-xl">Explore, express, and share your chaotic energy</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl border border-white/20">
          <Tabs defaultValue="mood-ring" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="mood-ring" className="text-sm md:text-base">
                🔮 Meme Mood Ring
              </TabsTrigger>
              <TabsTrigger value="translator" className="text-sm md:text-base">
                🗣️ Vibe Translator
              </TabsTrigger>
              <TabsTrigger value="bio" className="text-sm md:text-base">
                💘 Vibe My Bio
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mood-ring" className="mt-0">
              <MoodRing />
            </TabsContent>

            <TabsContent value="translator" className="mt-0">
              <VibeTranslator />
            </TabsContent>

            <TabsContent value="bio" className="mt-0">
              <VibeBio />
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center mt-6 text-white/70 text-sm">
          <p>Tap anywhere for easter eggs ✨ | Share your vibe with the world</p>
        </div>
      </div>
    </main>
  )
}
