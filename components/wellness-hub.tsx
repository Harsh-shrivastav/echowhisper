"use client"

import { useState } from "react"
import { Leaf, Brain, Heart, Moon, Zap, Play, Pause, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function WellnessHub() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null)
  const [breathingTimer, setBreathingTimer] = useState(0)
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale" | "pause">("inhale")

  const wellnessActivities = [
    {
      id: "breathing",
      title: "Guided Breathing",
      description: "4-7-8 breathing technique for relaxation",
      icon: Leaf,
      duration: "5 min",
      category: "Mindfulness",
    },
    {
      id: "meditation",
      title: "Mindfulness Meditation",
      description: "Short guided meditation for present moment awareness",
      icon: Brain,
      duration: "10 min",
      category: "Mindfulness",
    },
    {
      id: "gratitude",
      title: "Gratitude Practice",
      description: "Reflect on three things you're grateful for today",
      icon: Heart,
      duration: "3 min",
      category: "Positivity",
    },
    {
      id: "sleep",
      title: "Sleep Preparation",
      description: "Wind-down routine for better sleep quality",
      icon: Moon,
      duration: "15 min",
      category: "Sleep",
    },
    {
      id: "energy",
      title: "Energy Boost",
      description: "Quick exercises to increase alertness and focus",
      icon: Zap,
      duration: "5 min",
      category: "Energy",
    },
  ]

  const dailyTips = [
    "Take three deep breaths before checking your phone in the morning",
    "Practice the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds",
    "Write down one thing you're grateful for each day",
    "Take a 5-minute walk outside if possible",
    "Practice progressive muscle relaxation before bed",
  ]

  const startBreathingExercise = () => {
    setActiveExercise("breathing")
    setBreathingTimer(0)
    setBreathingPhase("inhale")

    // Simple breathing timer implementation
    const interval = setInterval(() => {
      setBreathingTimer((prev) => {
        const newTime = prev + 1

        // 4-7-8 breathing pattern (scaled down for demo)
        if (newTime <= 4) setBreathingPhase("inhale")
        else if (newTime <= 11) setBreathingPhase("hold")
        else if (newTime <= 19) setBreathingPhase("exhale")
        else if (newTime <= 21) setBreathingPhase("pause")
        else {
          setBreathingTimer(0)
          setBreathingPhase("inhale")
          return 0
        }

        return newTime
      })
    }, 1000)

    // Auto-stop after 5 minutes
    setTimeout(() => {
      clearInterval(interval)
      setActiveExercise(null)
    }, 300000)
  }

  const stopExercise = () => {
    setActiveExercise(null)
    setBreathingTimer(0)
  }

  return (
    <div className="space-y-6">
      {/* Daily Wellness Tip */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Today's Wellness Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-800 dark:text-green-200">
            {dailyTips[new Date().getDay() % dailyTips.length]}
          </p>
        </CardContent>
      </Card>

      {/* Active Exercise */}
      {activeExercise === "breathing" && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Guided Breathing Exercise</span>
              <Button variant="outline" size="sm" onClick={stopExercise}>
                <Pause className="w-4 h-4 mr-1" />
                Stop
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div
                className={`w-32 h-32 mx-auto rounded-full border-4 border-blue-500 flex items-center justify-center transition-all duration-1000 ${
                  breathingPhase === "inhale"
                    ? "scale-110 bg-blue-100 dark:bg-blue-900/30"
                    : breathingPhase === "hold"
                      ? "scale-110 bg-blue-200 dark:bg-blue-900/50"
                      : "scale-90 bg-blue-50 dark:bg-blue-900/20"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 capitalize">{breathingPhase}</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">{breathingTimer}s</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {breathingPhase === "inhale" && "Breathe in slowly through your nose..."}
                {breathingPhase === "hold" && "Hold your breath gently..."}
                {breathingPhase === "exhale" && "Exhale slowly through your mouth..."}
                {breathingPhase === "pause" && "Rest and prepare for the next breath..."}
              </p>
              <Progress value={(breathingTimer % 21) * (100 / 21)} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wellness Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Wellness Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wellnessActivities.map((activity) => (
              <div key={activity.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{activity.title}</h3>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.duration}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {activity.category}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => (activity.id === "breathing" ? startBreathingExercise() : null)}
                    disabled={activity.id !== "breathing"}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Wellness Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <Brain className="w-6 h-6" />
              <span className="text-xs">5-4-3-2-1 Grounding</span>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <Heart className="w-6 h-6" />
              <span className="text-xs">Self-Compassion</span>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <RotateCcw className="w-6 h-6" />
              <span className="text-xs">Reset Moment</span>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <Zap className="w-6 h-6" />
              <span className="text-xs">Energy Check</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Learn More</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-1">Understanding Anxiety</h4>
              <p className="text-xs text-muted-foreground">
                Learn about anxiety symptoms and healthy coping strategies
              </p>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-1">Sleep Hygiene</h4>
              <p className="text-xs text-muted-foreground">
                Tips for better sleep quality and establishing healthy routines
              </p>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-1">Mindfulness Basics</h4>
              <p className="text-xs text-muted-foreground">Introduction to mindfulness and meditation practices</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
