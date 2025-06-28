"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  MessageCircle,
  MessageSquare,
  Mic,
  BrainCircuit,
  Lock,
  BookOpen,
  Gauge,
  Shield,
  ServerOff,
  ArrowRight,
  KeyRound,
} from "lucide-react"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = document.querySelectorAll(".fade-in-section")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Empathy",
      description: "Our advanced AI understands context and sentiment to provide truly empathetic responses.",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: Mic,
      title: "Voice & Text Input",
      description: "Seamlessly switch between speaking your thoughts or typing them out, whatever feels natural.",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: BrainCircuit,
      title: "Custom Personalities",
      description:
        "Choose from a range of AI personalities, or even train one to match your unique needs (Pro feature).",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      icon: Lock,
      title: "Private & Secure",
      description: "Your conversations are encrypted and confidential. We prioritize your privacy above all else.",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: BookOpen,
      title: "Thought Journaling",
      description: "Keep a private journal of your conversations and insights for personal reflection and growth.",
      gradient: "from-pink-500 to-red-500",
    },
    {
      icon: Gauge,
      title: "Sentiment Analysis",
      description: "Gain insights into your emotional patterns over time with our subtle sentiment tracking.",
      gradient: "from-teal-500 to-blue-500",
    },
  ]

  const testimonials = [
    {
      author: "Yash Raj",
      initials: "YR",
      review:
        "It's like having a diary that talks back and actually understands. I feel less alone and more confident in my own thoughts.",
      rating: 5,
      color: "bg-orange-500",
    },
    {
      author: "Shreya",
      initials: "S",
      review:
        "I've never felt so understood. EchoWhisper became my daily safe space to vent, reflect, and feel uplifted.",
      rating: 5,
      color: "bg-green-500",
    },
    {
      author: "Himadri",
      initials: "H",
      review:
        "The custom personalities feature is a game-changer. I can tailor the AI to my needs, making conversations truly resonate.",
      rating: 5,
      color: "bg-pink-500",
    },
  ]

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

        {/* Hero Section */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight fade-in-section">
                Your Voice Has a <span className="text-white">Friend</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed fade-in-section">
                Talk, vent, or explore your thoughts in a safe space that listens, understands, and grows with you. No
                judgment, just empathetic conversation in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 mb-12 fade-in-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-12 rounded-3xl backdrop-blur-md">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Key{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative p-8 rounded-3xl bg-gray-800/70 backdrop-blur-sm text-left overflow-hidden feature-card"
                >
                  <div
                    className={`absolute inset-0 rounded-3xl opacity-30 bg-gradient-to-br ${feature.gradient}`}
                  ></div>
                  <div className="relative z-10">
                    <div className="text-blue-400 mb-3">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy & Trust Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 fade-in-section">
          <div className="max-w-7xl mx-auto py-8 rounded-3xl backdrop-blur-md">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Your Privacy, Our{" "}
                <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Commitment
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                We are dedicated to providing a secure and confidential space for your thoughts. Your data is encrypted,
                anonymized, and never shared.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/70 backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-teal-400 mb-3" />
                  <p className="text-white text-center font-medium text-base">End-to-End Encryption</p>
                </div>
                <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/70 backdrop-blur-sm">
                  <Lock className="h-8 w-8 text-teal-400 mb-3" />
                  <p className="text-white text-center font-medium text-base">Strict No-Logging Policy</p>
                </div>
                <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/70 backdrop-blur-sm">
                  <ServerOff className="h-8 w-8 text-teal-400 mb-3" />
                  <p className="text-white text-center font-medium text-base">Data Anonymization</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 fade-in-section">
          <div className="max-w-7xl mx-auto py-8 rounded-3xl backdrop-blur-md">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Be{" "}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Heard?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                Start your first conversation for free. Find your voice, build resilience, and reconnect with the world
                at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/chat"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:scale-105 pulse-grow-button flex items-center gap-2"
                >
                  <span>Get Started for Free</span>
                  <ArrowRight className="h-6 w-6" />
                </Link>
                <button className="text-gray-300 hover:text-purple-500 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                  Watch Demo
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-6">No credit card required • Start chatting in under 30 seconds</p>
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
