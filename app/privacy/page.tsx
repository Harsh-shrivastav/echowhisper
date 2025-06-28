"use client"

import Link from "next/link"
import { MessageCircle, KeyRound, MessageSquare, User, Cookie, Home } from "lucide-react"

export default function PrivacyPage() {
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

        {/* Privacy Policy Content */}
        <section className="pt-24 pb-16 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rounded-3xl main-content-wrapper">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy{" "}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              This Privacy Policy describes how EchoWhisper collects, uses, and discloses information when you use our
              website and services. Your privacy is paramount to us, and we are committed to protecting your personal
              data.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-12">
              Information We{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Collect
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-8 mt-6">
              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-8 text-left contributor-card">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 text-pink-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Conversation Data</h3>
                </div>
                <p className="text-gray-400 text-base">
                  When you interact with our AI, the content of your conversations (text and voice transcripts) is
                  processed to provide you with empathetic responses. This data is encrypted and anonymized to protect
                  your privacy. We do not store identifiable conversation data for longer than necessary to provide the
                  service.
                </p>
              </div>

              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-8 text-left contributor-card">
                <div className="flex items-center mb-4">
                  <User className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Usage Data</h3>
                </div>
                <p className="text-gray-400 text-base">
                  We collect non-personal usage data, such as the duration of your sessions, types of interactions, and
                  features used, to improve our service. This data is aggregated and does not identify you personally.
                </p>
              </div>

              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-8 text-left contributor-card">
                <div className="flex items-center mb-4">
                  <Cookie className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Cookies</h3>
                </div>
                <p className="text-gray-400 text-base">
                  We use cookies to ensure the proper functioning of our website and to enhance your user experience.
                  You can control cookie preferences through your browser settings.
                </p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-12">
              How We Use Your{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Information
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              We use the information we collect primarily to provide and improve our services, including:
            </p>
            <ul className="text-gray-400 text-left max-w-2xl mx-auto space-y-2 mb-8">
              <li>
                <span className="text-teal-400">•</span> To deliver personalized and empathetic AI interactions.
              </li>
              <li>
                <span className="text-teal-400">•</span> To analyze and understand usage patterns to enhance features
                and user experience.
              </li>
              <li>
                <span className="text-teal-400">•</span> To ensure the security and integrity of our platform.
              </li>
              <li>
                <span className="text-teal-400">•</span> To comply with legal obligations.
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-12">
              Data{" "}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Security</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              We implement a variety of security measures to maintain the safety of your personal information, including
              encryption, access controls, and regular security audits. While we strive to use commercially acceptable
              means to protect your data, no method of transmission over the Internet or method of electronic storage is
              100% secure.
            </p>

            <div className="mt-12 text-center">
              <Link
                href="/"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:scale-105 pulse-grow-button inline-flex items-center gap-2"
              >
                <span>Back to Home</span>
                <Home className="h-6 w-6" />
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
