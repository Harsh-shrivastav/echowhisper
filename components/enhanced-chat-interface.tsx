"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Send, Mic, MicOff, MoreVertical, Download, Settings, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { PersonalitySelector, type AIPersonality, personalities } from "./personality-selector"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
  mood?: number
  tags?: string[]
  reactions?: { [key: string]: number }
  personalityId?: string
}

interface EnhancedChatInterfaceProps {
  onConversationEnd: (summary: string, mood: number, insights: string[]) => void
}

const chatThemes = [
  { id: "default", name: "Default", colors: "from-blue-600 to-purple-600" },
  { id: "warm", name: "Warm", colors: "from-orange-500 to-pink-500" },
  { id: "nature", name: "Nature", colors: "from-green-500 to-teal-500" },
  { id: "sunset", name: "Sunset", colors: "from-yellow-500 to-red-500" },
  { id: "ocean", name: "Ocean", colors: "from-cyan-500 to-blue-500" },
  { id: "galaxy", name: "Galaxy", colors: "from-purple-500 to-indigo-600" },
]

const messageReactions = [
  { emoji: "👍", name: "thumbs_up" },
  { emoji: "❤️", name: "heart" },
  { emoji: "😊", name: "smile" },
  { emoji: "🤗", name: "hug" },
  { emoji: "💡", name: "lightbulb" },
  { emoji: "🙏", name: "pray" },
]

export function EnhancedChatInterface({ onConversationEnd }: EnhancedChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false)
  const [selectedPersonality, setSelectedPersonality] = useState<AIPersonality>(personalities[0])
  const [customTraits, setCustomTraits] = useState(selectedPersonality.traits)
  const [currentTheme, setCurrentTheme] = useState(chatThemes[0])
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    // Initialize with personality-specific greeting
    const greeting = selectedPersonality.greeting

    setMessages([
      {
        id: "1",
        text: greeting,
        sender: "ai",
        timestamp: new Date(),
        personalityId: selectedPersonality.id,
      },
    ])
  }, [selectedPersonality])

  const handlePersonalityChange = (personality: AIPersonality) => {
    setSelectedPersonality(personality)
    setCustomTraits(personality.traits)

    // Add a transition message
    const transitionMessage: Message = {
      id: Date.now().toString(),
      text: `I'm now ${personality.name}! ${personality.greeting}`,
      sender: "ai",
      timestamp: new Date(),
      personalityId: personality.id,
    }

    setMessages((prev) => [...prev, transitionMessage])

    toast({
      title: `Switched to ${personality.name}`,
      description: personality.description,
    })
  }

  const handleCustomTraits = (traits: AIPersonality["traits"]) => {
    setCustomTraits(traits)
  }

  const buildPersonalizedPrompt = (message: string) => {
    const basePrompt = selectedPersonality.systemPrompt

    const traitAdjustments = `
    Personality adjustments:
    - Empathy level: ${customTraits.empathy}% (${customTraits.empathy > 70 ? "very empathetic" : customTraits.empathy > 40 ? "moderately empathetic" : "more logical"})
    - Energy level: ${customTraits.energy}% (${customTraits.energy > 70 ? "high energy" : customTraits.energy > 40 ? "moderate energy" : "calm and measured"})
    - Formality: ${customTraits.formality}% (${customTraits.formality > 70 ? "formal" : customTraits.formality > 40 ? "semi-formal" : "casual"})
    - Humor: ${customTraits.humor}% (${customTraits.humor > 70 ? "playful and humorous" : customTraits.humor > 40 ? "occasionally humorous" : "serious"})
    - Directness: ${customTraits.directness}% (${customTraits.directness > 70 ? "direct and straightforward" : customTraits.directness > 40 ? "balanced approach" : "gentle and indirect"})
    `

    return `${basePrompt}\n\n${traitAdjustments}\n\nUser message: ${message}`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const personalizedPrompt = buildPersonalizedPrompt(inputValue.trim())

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: personalizedPrompt,
          personalityId: selectedPersonality.id,
          conversationHistory: messages.slice(-5),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Simulate typing delay for realism
        setTimeout(
          () => {
            const aiMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: data.response,
              sender: "ai",
              timestamp: new Date(),
              mood: data.detectedMood,
              tags: data.tags,
              personalityId: selectedPersonality.id,
              reactions: {},
            }

            setMessages((prev) => [...prev, aiMessage])
            setIsTyping(false)

            if (messages.length > 10 && data.insights) {
              onConversationEnd(data.summary, data.detectedMood, data.insights)
            }
          },
          1000 + Math.random() * 2000,
        ) // 1-3 second delay
      } else {
        throw new Error(data.error || "Failed to get response")
      }
    } catch (error) {
      console.error("Chat error:", error)
      setIsTyping(false)
      toast({
        title: "Connection Error",
        description: "I'm having trouble connecting right now. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReaction = (messageId: string, reactionName: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = { ...msg.reactions }
          reactions[reactionName] = (reactions[reactionName] || 0) + 1
          return { ...msg, reactions }
        }
        return msg
      }),
    )

    toast({
      title: "Reaction added!",
      description: "Your feedback helps me understand you better.",
    })
  }

  const exportConversation = () => {
    const conversation = messages
      .map((msg) => `[${msg.timestamp.toLocaleTimeString()}] ${msg.sender.toUpperCase()}: ${msg.text}`)
      .join("\n\n")

    const blob = new Blob([conversation], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `echowhisper-${selectedPersonality.name.toLowerCase()}-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Conversation Exported",
      description: "Your conversation has been saved to your downloads.",
    })
  }

  const filteredMessages = messages.filter(
    (msg) => searchQuery === "" || msg.text.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (showPersonalitySelector) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">AI Personality Settings</h2>
          <Button onClick={() => setShowPersonalitySelector(false)}>Back to Chat</Button>
        </div>
        <PersonalitySelector
          selectedPersonality={selectedPersonality}
          onPersonalityChange={handlePersonalityChange}
          onCustomize={handleCustomTraits}
        />
      </div>
    )
  }

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedPersonality.color}`}>
                <selectedPersonality.icon className="w-4 h-4 text-white" />
              </div>
              Chatting with {selectedPersonality.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {currentTheme.name} Theme
              </Badge>
              <span className="text-xs text-muted-foreground">
                {messages.length > 1 ? `${messages.length - 1} messages` : "New conversation"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowPersonalitySelector(true)}>
              <Settings className="w-4 h-4 mr-1" />
              Personality
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportConversation}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Chat
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Palette className="w-4 h-4 mr-2" />
                  Change Theme
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-2">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1 text-sm bg-muted rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col h-full p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredMessages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[80%] group">
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? `bg-gradient-to-r ${currentTheme.colors} text-white`
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                    {message.tags && (
                      <div className="flex gap-1">
                        {message.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Reactions */}
                {message.sender === "ai" && (
                  <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {messageReactions.map((reaction) => (
                      <button
                        key={reaction.name}
                        onClick={() => handleReaction(message.id, reaction.name)}
                        className="p-1 hover:bg-muted rounded text-sm transition-colors"
                        title={`React with ${reaction.emoji}`}
                      >
                        {reaction.emoji}
                      </button>
                    ))}
                  </div>
                )}

                {/* Show existing reactions */}
                {message.reactions && Object.keys(message.reactions).length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {Object.entries(message.reactions).map(([reactionName, count]) => {
                      const reaction = messageReactions.find((r) => r.name === reactionName)
                      return reaction ? (
                        <span key={reactionName} className="text-xs bg-muted px-2 py-1 rounded-full">
                          {reaction.emoji} {count}
                        </span>
                      ) : null
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-300">{selectedPersonality.name} is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
              className={isRecording ? "bg-red-100 border-red-300" : ""}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>

            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isRecording ? "Listening..." : `Share your thoughts with ${selectedPersonality.name}...`}
              className="min-h-[40px] max-h-32 resize-none bg-gray-800 border-gray-600 text-white"
              disabled={isLoading || isRecording}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />

            <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()} size="sm">
              {isLoading ? <LoadingSpinner size="sm" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>

          <p className="text-xs text-gray-400 mt-2 text-center">
            Chatting with {selectedPersonality.name} • Your privacy is protected
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
