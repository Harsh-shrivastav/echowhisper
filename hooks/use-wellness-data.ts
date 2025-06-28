"use client"

import { useState, useEffect } from "react"

interface WellnessData {
  moodEntries: Array<{
    mood: number
    timestamp: Date
    note?: string
  }>
  conversationSummaries: Array<{
    summary: string
    mood: number
    insights: string[]
    timestamp: Date
  }>
  goals: Array<{
    id: string
    title: string
    description: string
    progress: number
    targetDate: Date
  }>
}

export function useWellnessData() {
  const [wellnessData, setWellnessData] = useState<WellnessData>({
    moodEntries: [],
    conversationSummaries: [],
    goals: [],
  })

  useEffect(() => {
    loadWellnessData()
  }, [])

  const loadWellnessData = () => {
    try {
      const stored = localStorage.getItem("wellness-data")
      if (stored) {
        const data = JSON.parse(stored)
        // Convert date strings back to Date objects
        data.moodEntries =
          data.moodEntries?.map((entry: any) => ({
            ...entry,
            timestamp: new Date(entry.timestamp),
          })) || []
        data.conversationSummaries =
          data.conversationSummaries?.map((summary: any) => ({
            ...summary,
            timestamp: new Date(summary.timestamp),
          })) || []
        data.goals =
          data.goals?.map((goal: any) => ({
            ...goal,
            targetDate: new Date(goal.targetDate),
          })) || []

        setWellnessData(data)
      }
    } catch (error) {
      console.error("Error loading wellness data:", error)
    }
  }

  const saveWellnessData = (data: WellnessData) => {
    try {
      localStorage.setItem("wellness-data", JSON.stringify(data))
      setWellnessData(data)
    } catch (error) {
      console.error("Error saving wellness data:", error)
    }
  }

  const updateMood = (mood: number, timestamp: Date, note?: string) => {
    const newEntry = { mood, timestamp, note }
    const updatedData = {
      ...wellnessData,
      moodEntries: [newEntry, ...wellnessData.moodEntries].slice(0, 100), // Keep last 100
    }
    saveWellnessData(updatedData)
  }

  const addConversation = (summary: string, mood: number, insights: string[]) => {
    const newSummary = {
      summary,
      mood,
      insights,
      timestamp: new Date(),
    }
    const updatedData = {
      ...wellnessData,
      conversationSummaries: [newSummary, ...wellnessData.conversationSummaries].slice(0, 50),
    }
    saveWellnessData(updatedData)
  }

  return {
    wellnessData,
    updateMood,
    addConversation,
  }
}
