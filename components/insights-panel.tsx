"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, Calendar, Target, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

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
}

interface InsightsPanelProps {
  wellnessData: WellnessData
}

export function InsightsPanel({ wellnessData }: InsightsPanelProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("week")

  // Calculate insights from wellness data
  const calculateInsights = () => {
    const now = new Date()
    const daysBack = timeRange === "week" ? 7 : timeRange === "month" ? 30 : 90
    const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)

    const recentMoods = wellnessData.moodEntries.filter((entry) => entry.timestamp >= cutoffDate)
    const recentConversations = wellnessData.conversationSummaries.filter((summary) => summary.timestamp >= cutoffDate)

    const averageMood =
      recentMoods.length > 0 ? recentMoods.reduce((sum, entry) => sum + entry.mood, 0) / recentMoods.length : 0

    const moodTrend = recentMoods.length >= 2 ? recentMoods[0].mood - recentMoods[recentMoods.length - 1].mood : 0

    const conversationCount = recentConversations.length
    const totalInsights = recentConversations.reduce((sum, conv) => sum + conv.insights.length, 0)

    return {
      averageMood: Math.round(averageMood * 10) / 10,
      moodTrend,
      conversationCount,
      totalInsights,
      recentMoods,
      recentConversations,
    }
  }

  const insights = calculateInsights()

  const getMoodLabel = (mood: number) => {
    if (mood >= 4.5) return "Excellent"
    if (mood >= 3.5) return "Good"
    if (mood >= 2.5) return "Neutral"
    if (mood >= 1.5) return "Low"
    return "Very Low"
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return "text-green-600 dark:text-green-400"
    if (mood >= 3) return "text-blue-600 dark:text-blue-400"
    if (mood >= 2) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const achievements = [
    {
      title: "Consistent Check-ins",
      description: "Logged mood for 7 days in a row",
      progress: Math.min(insights.recentMoods.length, 7),
      target: 7,
      icon: Calendar,
    },
    {
      title: "Self-Reflection",
      description: "Had meaningful conversations",
      progress: insights.conversationCount,
      target: 5,
      icon: Target,
    },
    {
      title: "Wellness Journey",
      description: "Gained personal insights",
      progress: insights.totalInsights,
      target: 10,
      icon: Award,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(["week", "month", "quarter"] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              timeRange === range ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
          >
            {range === "week" ? "7 Days" : range === "month" ? "30 Days" : "90 Days"}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Average Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">
              <span className={getMoodColor(insights.averageMood)}>
                {insights.averageMood > 0 ? insights.averageMood.toFixed(1) : "—"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {insights.averageMood > 0 ? getMoodLabel(insights.averageMood) : "No data yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Mood Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">
              {insights.moodTrend > 0 ? (
                <span className="text-green-600 dark:text-green-400">↗ +{insights.moodTrend.toFixed(1)}</span>
              ) : insights.moodTrend < 0 ? (
                <span className="text-red-600 dark:text-red-400">↘ {insights.moodTrend.toFixed(1)}</span>
              ) : (
                <span className="text-muted-foreground">→ 0</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {insights.moodTrend > 0 ? "Improving" : insights.moodTrend < 0 ? "Declining" : "Stable"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{insights.recentMoods.length}</div>
            <p className="text-xs text-muted-foreground">
              {timeRange === "week" ? "This week" : timeRange === "month" ? "This month" : "This quarter"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <achievement.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{achievement.title}</span>
                </div>
                <Badge variant={achievement.progress >= achievement.target ? "default" : "outline"}>
                  {achievement.progress}/{achievement.target}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
              <Progress value={(achievement.progress / achievement.target) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Patterns */}
      {insights.recentConversations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.recentConversations.slice(0, 3).map((conversation, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{conversation.timestamp.toLocaleDateString()}</span>
                    <span className={`text-xs ${getMoodColor(conversation.mood)}`}>
                      {getMoodLabel(conversation.mood)}
                    </span>
                  </div>
                  <p className="text-sm">{conversation.summary}</p>
                  {conversation.insights.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {conversation.insights.slice(0, 2).map((insight, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {insight}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.averageMood < 3 && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-1">Focus on Self-Care</h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Your recent mood entries suggest you might benefit from extra self-care. Consider trying our guided
                  breathing exercises or reaching out to a friend.
                </p>
              </div>
            )}

            {insights.conversationCount < 2 && (
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-sm text-green-800 dark:text-green-200 mb-1">Express Yourself</h4>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Regular conversations can help process emotions and gain insights. Try sharing what's on your mind in
                  our chat feature.
                </p>
              </div>
            )}

            {insights.recentMoods.length < 3 && (
              <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-sm text-purple-800 dark:text-purple-200 mb-1">Track Your Journey</h4>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Regular mood tracking helps identify patterns and progress. Try logging your mood daily for better
                  insights.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
