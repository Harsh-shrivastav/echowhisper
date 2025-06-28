"use client"

import { useCallback } from "react"

interface ConversationEntry {
  id: string
  messages: Array<{
    text: string
    sender: "user" | "ai"
    timestamp: Date
  }>
  mood?: number
  tags?: string[]
  summary?: string
  timestamp: Date
}

interface ConversationContext {
  lastMood?: number
  conversationCount: number
  commonTopics: string[]
  recentSummaries: string[]
}

export function useConversationMemory() {
  const saveConversation = useCallback(async (messages: any[]) => {
    try {
      const conversations = JSON.parse(localStorage.getItem("conversations") || "[]")

      const newConversation: ConversationEntry = {
        id: Date.now().toString(),
        messages,
        timestamp: new Date(),
      }

      conversations.unshift(newConversation)
      localStorage.setItem("conversations", JSON.stringify(conversations.slice(0, 50))) // Keep last 50
    } catch (error) {
      console.error("Error saving conversation:", error)
    }
  }, [])

  const getConversationContext = useCallback(async (): Promise<ConversationContext> => {
    try {
      const conversations = JSON.parse(localStorage.getItem("conversations") || "[]")
      const moodEntries = JSON.parse(localStorage.getItem("mood-entries") || "[]")

      return {
        lastMood: moodEntries[0]?.mood,
        conversationCount: conversations.length,
        commonTopics: [], // Could analyze conversation content for topics
        recentSummaries: conversations
          .slice(0, 3)
          .map((c: ConversationEntry) => c.summary)
          .filter(Boolean),
      }
    } catch (error) {
      console.error("Error getting conversation context:", error)
      return {
        conversationCount: 0,
        commonTopics: [],
        recentSummaries: [],
      }
    }
  }, [])

  return {
    saveConversation,
    getConversationContext,
  }
}
