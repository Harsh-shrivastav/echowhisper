"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Send, Mic, MicOff, MoreVertical, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
  mood?: number
  tags?: string[]
}

interface ChatInterfaceProps {
  onConversationEnd: (summary: string, mood: number, insights: string[]) => void
}

export function ChatInterface({ onConversationEnd }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationMode, setConversationMode] = useState<"supportive" | "therapeutic" | "casual">("supportive")
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    // Initialize with a greeting
    const greeting = "Hello! I'm here to listen and support you. How are you feeling today?"

    setMessages([
      {
        id: "1",
        text: greeting,
        sender: "ai",
        timestamp: new Date(),
      },
    ])
  }, [])

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

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue.trim(),
          mode: conversationMode,
          conversationHistory: messages.slice(-5), // Last 5 messages for context
        }),
      })

      const data = await response.json()

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: "ai",
          timestamp: new Date(),
          mood: data.detectedMood,
          tags: data.tags,
        }

        setMessages((prev) => [...prev, aiMessage])

        // Trigger insights if conversation is substantial
        if (messages.length > 10 && data.insights) {
          onConversationEnd(data.summary, data.detectedMood, data.insights)
        }
      } else {
        throw new Error(data.error || "Failed to get response")
      }
    } catch (error) {
      console.error("Chat error:", error)
      toast({
        title: "Connection Error",
        description: "I'm having trouble connecting right now. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceInput = () => {
    // Simple voice input toggle (implementation would require speech recognition)
    setIsRecording(!isRecording)
    toast({
      title: "Voice Input",
      description: isRecording ? "Voice recording stopped" : "Voice recording started",
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
    a.download = `echowhisper-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Conversation Exported",
      description: "Your conversation has been saved to your downloads.",
    })
  }

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Your Safe Space</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {conversationMode === "supportive"
                  ? "Supportive"
                  : conversationMode === "therapeutic"
                    ? "Therapeutic"
                    : "Casual"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {messages.length > 1 ? `${messages.length - 1} messages` : "New conversation"}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setConversationMode("supportive")}>Supportive Mode</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setConversationMode("therapeutic")}>Therapeutic Mode</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setConversationMode("casual")}>Casual Mode</DropdownMenuItem>
              <DropdownMenuItem onClick={exportConversation}>
                <Download className="w-4 h-4 mr-2" />
                Export Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col h-full p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"
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
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <span className="text-sm">Thinking...</span>
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
              onClick={handleVoiceInput}
              className={isRecording ? "bg-red-100 border-red-300" : ""}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>

            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isRecording ? "Listening..." : "Share what's on your mind..."}
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
            This is a safe, judgment-free space. Your privacy is protected.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
