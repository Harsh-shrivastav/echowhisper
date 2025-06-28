"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MessageCircle,
  KeyRound,
  Instagram,
  Github,
  Linkedin,
  Youtube,
  Globe,
  Music,
  Disc,
  LinkIcon,
} from "lucide-react"

export default function ContributorsPage() {
  const [selectedContributor, setSelectedContributor] = useState("amartya")

  const contributors = {
    amartya: {
      name: "Amartya Majumder",
      role: "Lead Researcher",
      description:
        "Amartya is the visionary and technical backbone of EchoWhisper. He oversees all API integrations, system architecture, and leads the comprehensive research efforts that drive our innovative solutions.",
      image: "https://i.ibb.co/mC5Tr6Mg/IMG-20250624-014530-1080-x-1920-pixel.jpg",
      socials: [
        {
          icon: Instagram,
          url: "https://www.instagram.com/amartya_majumder7777?igsh=c29id2FmOGw1eGUz",
          label: "Instagram",
        },
        { icon: Github, url: "https://github.com/Amartya989870xxxx/", label: "GitHub" },
        {
          icon: Linkedin,
          url: "https://www.linkedin.com/in/amartya-majumder-777x?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          label: "LinkedIn",
        },
        { icon: Youtube, url: "https://www.youtube.com/@anizex2025", label: "YouTube Anizex" },
        { icon: Youtube, url: "https://www.youtube.com/@azx0000", label: "YouTube AZX" },
      ],
    },
    arshad: {
      name: "Arshad Ali",
      role: "Lead Developer Behind UI/UX Enhancements and Support Page Logic",
      description:
        "Arshad is an experienced Python developer, proficient in both HTML and CSS. He has played a key role in UI/UX development, particularly in implementing the chat feature. The core logic of this support page was primarily written by him.",
      image: "https://i.ibb.co/Q7dZJFyn/Snapchat-2031716389.jpg",
      socials: [
        { icon: Instagram, url: "https://www.instagram.com/arshadali.coder/", label: "Instagram" },
        { icon: Github, url: "https://github.com/arshadali-coder", label: "GitHub" },
        { icon: Linkedin, url: "https://www.linkedin.com/in/arshad-ali-6a1250361", label: "LinkedIn" },
      ],
    },
    soumya: {
      name: "Soumya Sagar",
      role: "Lead Frontend Designer & Developer, Researcher",
      description:
        "Soumya is the creative force behind EchoWhisper's entire frontend, meticulously designing and building every pixel from scratch to ensure a visually stunning and intuitive user experience.",
      image: "https://i.ibb.co/9k6CN3Cy/IMG-20250622-230959-1080-x-1920-pixel.jpg",
      socials: [
        { icon: Github, url: "https://github.com/Soumya-codr", label: "GitHub" },
        { icon: Globe, url: "https://soumya-codr.github.io/Soumya-codr/", label: "Portfolio" },
        { icon: Linkedin, url: "https://www.linkedin.com/in/soumya-sagar-44812a371/", label: "LinkedIn" },
        { icon: Instagram, url: "https://www.instagram.com/soumya.sagar_guitarist/", label: "Instagram" },
        {
          icon: Music,
          url: "https://open.spotify.com/artist/0S2ZiodphaTqDny2saBggN?si=WsyagGVZR5m5aVcqt_oZLQ",
          label: "Spotify",
        },
        { icon: Music, url: "https://music.apple.com/us/artist/soumya-sagar/1711813492", label: "Apple Music" },
        { icon: Youtube, url: "https://youtube.com/@studylofi__soumya?feature=shared", label: "YouTube" },
        { icon: Disc, url: "https://push.fm/fl/fading-memories", label: "First Song" },
        {
          icon: LinkIcon,
          url: "https://linktr.ee/sound_of_peace?utm_source=linktree_profile_share&ltsid=184dd30b-7d7e-4ae0-9d35-f7ba03d738c3",
          label: "Linktree",
        },
      ],
    },
    ankush: {
      name: "Ankush Jha",
      role: "Full-Stack Web Developer & Bug Fixer",
      description:
        "Ankush, our full-stack web development expert, has been an immense help. Despite his full-time commitment to a startup, his contributions, especially in fixing bugs, have been exceptionally valuable.",
      image: "https://i.ibb.co/bjJpMDTv/IMG-20250622-231931-1080-x-1920-pixel.png",
      socials: [
        { icon: Github, url: "https://github.com/CR4ZED", label: "GitHub" },
        { icon: Globe, url: "https://www.ankushjha.com/", label: "Portfolio" },
        { icon: Linkedin, url: "https://www.linkedin.com/in/ankushjhaa/", label: "LinkedIn" },
      ],
    },
    harsh: {
      name: "Harsh Shrivastav",
      role: "UI/UX Contributor",
      description:
        "Harsh played a crucial role during the initial brainstorming phase of EchoWhisper. He contributed valuable ideas toward shaping the core vision of the project and helped lay the foundation for its emotional intelligence goals.",
      image: "https://i.ibb.co/FqxfvYFT/IMG-20250624-014915-1080-x-1920-pixel.jpg",
      socials: [
        { icon: Instagram, url: "https://www.instagram.com/harsh_shrivastav_3/#", label: "Instagram" },
        { icon: Github, url: "https://github.com/Harsh-shrivastav", label: "GitHub" },
        { icon: Linkedin, url: "https://www.linkedin.com/in/harsh-shrivastava/", label: "LinkedIn" },
      ],
    },
    priyanshu: {
      name: "Priyanshu Yadav",
      role: "Core Developer",
      description:
        "Priyanshu Yadav provided collaborative support during the early stages of the EchoWhisper project. He actively participated in team discussions and contributed to shaping the overall thought process.",
      image: "https://i.ibb.co/hwy2P0P/IMG-20250624-015158-1080-x-1920-pixel.jpg",
      socials: [
        {
          icon: Instagram,
          url: "https://www.instagram.com/priyanshu_yadav.124?igsh=NmQzdTFkY3V2amsy",
          label: "Instagram",
        },
      ],
    },
  }

  const contributorList = Object.keys(contributors)
  const currentContributor = contributors[selectedContributor as keyof typeof contributors]

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

        {/* Contributors Content */}
        <section className="pt-24 pb-16 relative overflow-hidden text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rounded-3xl main-content-wrapper">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Contributors
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
              Meet the brilliant minds and passionate individuals who contribute to making EchoWhisper a reality. Their
              dedication drives our mission forward.
            </p>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Contributor Selection List */}
              <div className="w-full lg:w-1/3 bg-gray-800/70 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Team Members</h3>
                <div className="space-y-2">
                  {contributorList.map((id) => (
                    <button
                      key={id}
                      onClick={() => setSelectedContributor(id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        selectedContributor === id
                          ? "bg-purple-600 text-white border border-purple-500"
                          : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                      }`}
                    >
                      {contributors[id as keyof typeof contributors].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contributor Details */}
              <div className="w-full lg:w-2/3 bg-gray-800/70 border border-gray-700 rounded-lg p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-48 h-64 mb-6 rounded-xl overflow-hidden border-2 border-purple-500/50">
                    <img
                      src={currentContributor.image || "/placeholder.svg"}
                      alt={currentContributor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=256&width=192&text=${currentContributor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}`
                      }}
                    />
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-2">{currentContributor.name}</h3>
                  <p className="text-teal-400 text-lg mb-4 font-medium">{currentContributor.role}</p>
                  <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-2xl">
                    {currentContributor.description}
                  </p>

                  {/* Social Media Links */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {currentContributor.socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-gray-700 border border-gray-600 hover:border-blue-500 hover:bg-gray-600 transition-all duration-300 group"
                        title={social.label}
                      >
                        <social.icon className="h-6 w-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
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
