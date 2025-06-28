"use client"

import Link from "next/link"
import { MessageCircle, KeyRound, CheckCircle, RotateCcw, Home } from "lucide-react"

export default function TermsPage() {
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

        {/* Terms of Service Content */}
        <section className="pt-24 pb-16 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rounded-3xl main-content-wrapper">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of{" "}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Welcome to EchoWhisper. These Terms of Service ("Terms") govern your access to and use of EchoWhisper's
              website, services, and applications ("Service"). By accessing or using the Service, you agree to be bound
              by these Terms.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-12">
              Acceptance of{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Terms
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-8 mt-6">
              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-8 text-left contributor-card">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-pink-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Agreement</h3>
                </div>
                <p className="text-gray-400 text-base">
                  By using our Service, you confirm that you have read, understood, and agree to be bound by these
                  Terms. If you do not agree, you may not use the Service.
                </p>
              </div>

              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-8 text-left contributor-card">
                <div className="flex items-center mb-4">
                  <RotateCcw className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Modifications</h3>
                </div>
                <p className="text-gray-400 text-base">
                  We reserve the right to modify these Terms at any time. We will notify you of any changes by posting
                  the new Terms on this page. Your continued use of the Service after such modifications constitutes
                  your acceptance of the updated Terms.
                </p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-12">
              User{" "}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Obligations
              </span>
            </h2>
            <ul className="text-gray-400 text-left max-w-2xl mx-auto space-y-2 mb-8">
              <li>
                <span className="text-teal-400">•</span> You must be at least 13 years old to use the Service.
              </li>
              <li>
                <span className="text-teal-400">•</span> You agree not to use the Service for any unlawful or prohibited
                purpose.
              </li>
              <li>
                <span className="text-teal-400">•</span> You are responsible for maintaining the confidentiality of your
                account information.
              </li>
              <li>
                <span className="text-teal-400">•</span> Do not engage in any activity that could damage, disable, or
                impair the Service.
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-12">
              Intellectual{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Property
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              All content, trademarks, service marks, trade names, logos, and icons are proprietary to EchoWhisper or
              its licensors. Nothing in these Terms grants you a right to use any intellectual property owned by
              EchoWhisper or its licensors.
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
