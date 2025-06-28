"use client"
import Link from "next/link"
import { MessageCircle, Home } from "lucide-react"
import { EnhancedChatInterface } from "@/components/enhanced-chat-interface"
import { useWellnessData } from "@/hooks/use-wellness-data"

export default function ChatPage() {
  const { addConversation } = useWellnessData()

  const handleConversationEnd = (summary: string, mood: number, insights: string[]) => {
    addConversation(summary, mood, insights)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="fixed inset-0 bg-gray-950"></div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 rounded-full flex items-center justify-between z-50 glass-effect-nav">
          <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <MessageCircle className="h-8 w-8 text-funky-pink group-hover:text-funky-orange transition-all duration-300" />
              <div className="absolute inset-0 bg-pink-500/10 rounded-full filter blur-lg"></div>
            </div>
            <span className="text-xl font-bold text-white logo-text-shadow">EchoWhisper</span>
          </Link>

          <Link
            href="/"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full font-semibold text-sm hover:scale-105 shine-button flex items-center gap-2"
          >
            <span>Back to Home</span>
            <Home className="h-4 w-4" />
          </Link>
        </nav>

        {/* Enhanced Chat Interface */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your AI{" "}
                <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                  Companions
                </span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Choose your perfect AI companion and customize their personality to match your needs. Each companion
                offers unique support styles and specialties.
              </p>
            </div>

            <EnhancedChatInterface onConversationEnd={handleConversationEnd} />
          </div>
        </section>
      </div>
    </div>
  )
}
