"use client"

import Link from "next/link"
import { MessageCircle, KeyRound, Heart, Shield, ArrowRight } from "lucide-react"

export default function AboutPage() {
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
            href="/chat"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full font-semibold text-sm hover:scale-105 shine-button flex items-center gap-2"
          >
            <span>Unlock Your Voice</span>
            <KeyRound className="h-4 w-4" />
          </Link>
        </nav>

        {/* About Content */}
        <section className="pt-24 pb-16 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rounded-3xl main-content-wrapper">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Story</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              EchoWhisper was born from a simple yet powerful idea: in the digital age, where instant connections are
              abundant, genuine empathy and understanding are often rare. We aimed to create a platform that not only
              listens but truly comprehends, providing a non-judgmental space where anyone can express their thoughts
              and feelings without fear. This is our journey to create a friend for all who need a listening ear and a
              supportive voice. We believe everyone deserves to feel heard and understood, and EchoWhisper is here to
              bridge that gap.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-12">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Vision
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Our vision is to build a future where AI-powered companionship and emotional well-being go hand-in-hand.
              Through EchoWhisper, we aspire to empower individuals to explore their emotional journeys, manage stress,
              and develop resilience. We want to foster an ecosystem where AI is not just a tool, but a trusted
              confidant guiding you on a path of personal growth and self-discovery. Our goal is to make AI a natural
              extension of human connection, making mental wellness support accessible and intuitive for everyone,
              everywhere.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Empathy First Card */}
              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-8 contributor-card">
                <div className="text-pink-500 mb-4 flex justify-center">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center">Empathy First</h3>
                <p className="text-gray-400 text-base text-center">
                  We prioritize understanding and compassionate responses.
                </p>
              </div>

              {/* Unwavering Privacy Card */}
              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-8 contributor-card">
                <div className="text-green-500 mb-4 flex justify-center">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center">Unwavering Privacy</h3>
                <p className="text-gray-400 text-base text-center">
                  Your conversations are always secure and confidential.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/chat"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:scale-105 pulse-grow-button inline-flex items-center gap-2"
              >
                <span>Get Started with EchoWhisper</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-8 rounded-3xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row justify-center items-center text-center gap-y-6 md:gap-x-12">
              <div className="flex items-center space-x-2 justify-center w-full md:w-auto">
                <MessageCircle className="h-8 w-8 text-purple-500" />
                <span className="text-2xl font-bold text-gray-200">EchoWhisper</span>
              </div>
              <div className="flex flex-wrap justify-center space-x-8 text-base">
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About
                </Link>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
                <Link href="/contributors" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contributors
                </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </div>
            </div>
            <div className="border-t border-white/10 mt-10 pt-6 text-center">
              <p className="text-white text-lg font-mono">© 2025 EchoWhisper. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
