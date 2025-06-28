"use client"

import { useState, useEffect } from "react"
import { Calendar, Heart, Brain, Zap, Moon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface MoodEntry {
  id: string
  mood: number
  energy: number
  anxiety: number
  sleep: number
  note: string
  timestamp: Date
  tags: string[]
}

interface MoodTrackerProps {
  onMoodUpdate: (mood: number, timestamp: Date) => void
}

export function MoodTracker({ onMoodUpdate }: MoodTrackerProps) {
  const [currentMood, setCurrentMood] = useState<Partial<MoodEntry>>({
    mood: 3,
    energy: 3,
    anxiety: 3,
    sleep: 3,
    note: "",
    tags: [],
  })
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([])
  const { toast } = useToast()

  const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Excellent"]
  const moodEmojis = ["😢", "😕", "😐", "🙂", "😊"]

  const commonTags = [
    "work",
    "family",
    "health",
    "social",
    "exercise",
    "sleep",
    "stress",
    "anxiety",
    "grateful",
    "productive",
    "tired",
    "energetic",
  ]

  useEffect(() => {
    loadRecentEntries()
  }, [])

  const loadRecentEntries = () => {
    try {
      const stored = localStorage.getItem("mood-entries")
      if (stored) {
        const entries = JSON.parse(stored).map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }))
        setRecentEntries(entries.slice(0, 7)) // Last 7 entries
      }
    } catch (error) {
      console.error("Error loading mood entries:", error)
    }
  }

  const saveMoodEntry = () => {
    if (!currentMood.mood) {
      toast({
        title: "Please select your mood",
        description: "Your mood rating is required to save the entry.",
        variant: "destructive",
      })
      return
    }

    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood: currentMood.mood!,
      energy: currentMood.energy || 3,
      anxiety: currentMood.anxiety || 3,
      sleep: currentMood.sleep || 3,
      note: currentMood.note || "",
      tags: currentMood.tags || [],
      timestamp: new Date(),
    }

    try {
      const stored = localStorage.getItem("mood-entries")
      const entries = stored ? JSON.parse(stored) : []
      entries.unshift(entry)
      localStorage.setItem("mood-entries", JSON.stringify(entries.slice(0, 30))) // Keep last 30

      setRecentEntries([entry, ...recentEntries].slice(0, 7))
      onMoodUpdate(entry.mood, entry.timestamp)

      // Reset form
      setCurrentMood({
        mood: 3,
        energy: 3,
        anxiety: 3,
        sleep: 3,
        note: "",
        tags: [],
      })

      toast({
        title: "Mood logged successfully",
        description: "Your entry has been saved and will help track your wellness journey.",
      })
    } catch (error) {
      console.error("Error saving mood entry:", error)
      toast({
        title: "Error saving mood",
        description: "There was a problem saving your mood entry. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleTag = (tag: string) => {
    const tags = currentMood.tags || []
    const newTags = tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]

    setCurrentMood({ ...currentMood, tags: newTags })
  }

  const ScaleSelector = ({
    label,
    value,
    onChange,
    icon: Icon,
    lowLabel,
    highLabel,
  }: {
    label: string
    value: number
    onChange: (value: number) => void
    icon: any
    lowLabel: string
    highLabel: string
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{lowLabel}</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => onChange(rating)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                value === rating
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-600 hover:border-blue-400 text-gray-300"
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-400">{highLabel}</span>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Current Mood Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            How are you feeling today?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Overall Mood</label>
            <div className="flex justify-between items-center">
              {moodEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMood({ ...currentMood, mood: index + 1 })}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                    currentMood.mood === index + 1
                      ? "bg-blue-600/20 border-2 border-blue-500"
                      : "hover:bg-gray-700 border-2 border-transparent"
                  }`}
                >
                  <span className="text-2xl mb-1">{emoji}</span>
                  <span className="text-xs text-center">{moodLabels[index]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScaleSelector
              label="Energy Level"
              value={currentMood.energy || 3}
              onChange={(value) => setCurrentMood({ ...currentMood, energy: value })}
              icon={Zap}
              lowLabel="Drained"
              highLabel="Energetic"
            />

            <ScaleSelector
              label="Anxiety Level"
              value={currentMood.anxiety || 3}
              onChange={(value) => setCurrentMood({ ...currentMood, anxiety: value })}
              icon={Brain}
              lowLabel="Calm"
              highLabel="Anxious"
            />

            <ScaleSelector
              label="Sleep Quality"
              value={currentMood.sleep || 3}
              onChange={(value) => setCurrentMood({ ...currentMood, sleep: value })}
              icon={Moon}
              lowLabel="Poor"
              highLabel="Great"
            />
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <label className="text-sm font-medium">What's influencing your mood?</label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={currentMood.tags?.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Additional thoughts (optional)</label>
            <Textarea
              value={currentMood.note}
              onChange={(e) => setCurrentMood({ ...currentMood, note: e.target.value })}
              placeholder="What's on your mind? Any specific events or feelings you'd like to note?"
              className="min-h-[80px] bg-gray-800 border-gray-600"
            />
          </div>

          <Button onClick={saveMoodEntry} className="w-full">
            Log Mood Entry
          </Button>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{moodEmojis[entry.mood - 1]}</span>
                    <div>
                      <div className="text-sm font-medium">{entry.timestamp.toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">{entry.timestamp.toLocaleTimeString()}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {entry.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
