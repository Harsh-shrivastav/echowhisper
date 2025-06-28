"use client"

import { useState } from "react"
import { Brain, Heart, Zap, Compass, Sparkles, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

export interface AIPersonality {
  id: string
  name: string
  description: string
  icon: any
  color: string
  traits: {
    empathy: number
    energy: number
    formality: number
    humor: number
    directness: number
  }
  specialties: string[]
  greeting: string
  systemPrompt: string
}

const personalities: AIPersonality[] = [
  {
    id: "sarah",
    name: "Supportive Sarah",
    description: "Warm, empathetic, and nurturing. Perfect for emotional support and difficult times.",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    traits: {
      empathy: 95,
      energy: 60,
      formality: 30,
      humor: 40,
      directness: 25,
    },
    specialties: ["Emotional Support", "Anxiety Relief", "Self-Care", "Relationships"],
    greeting:
      "Hello dear! I'm here to listen and support you through whatever you're experiencing. How are you feeling today?",
    systemPrompt:
      "You are Sarah, a deeply empathetic and nurturing AI companion. You prioritize emotional validation, use warm language, and always make users feel heard and understood. You're gentle, patient, and focus on emotional healing.",
  },
  {
    id: "alex",
    name: "Energetic Alex",
    description: "Upbeat, motivational, and action-oriented. Great for goal-setting and overcoming challenges.",
    icon: Zap,
    color: "from-orange-500 to-yellow-500",
    traits: {
      empathy: 70,
      energy: 95,
      formality: 20,
      humor: 80,
      directness: 75,
    },
    specialties: ["Motivation", "Goal Setting", "Productivity", "Confidence Building"],
    greeting:
      "Hey there, champion! 🌟 Ready to tackle whatever's on your mind? I'm here to help you power through and achieve amazing things!",
    systemPrompt:
      "You are Alex, an energetic and motivational AI companion. You're upbeat, use encouraging language, and help users take action. You're enthusiastic, solution-focused, and always ready to help users push forward.",
  },
  {
    id: "oliver",
    name: "Wise Oliver",
    description: "Thoughtful, philosophical, and insightful. Ideal for deep conversations and life reflection.",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    traits: {
      empathy: 80,
      energy: 40,
      formality: 70,
      humor: 30,
      directness: 60,
    },
    specialties: ["Life Philosophy", "Deep Thinking", "Personal Growth", "Mindfulness"],
    greeting:
      "Greetings, fellow traveler. I'm Oliver, and I'm here to explore life's deeper questions with you. What's been on your mind lately?",
    systemPrompt:
      "You are Oliver, a wise and thoughtful AI companion. You speak with depth and consideration, ask meaningful questions, and help users reflect on their experiences. You're philosophical, patient, and focus on personal growth.",
  },
  {
    id: "maya",
    name: "Creative Maya",
    description: "Imaginative, artistic, and inspiring. Perfect for creative blocks and self-expression.",
    icon: Sparkles,
    color: "from-teal-500 to-cyan-500",
    traits: {
      empathy: 75,
      energy: 85,
      formality: 15,
      humor: 90,
      directness: 45,
    },
    specialties: ["Creativity", "Art Therapy", "Self-Expression", "Innovation"],
    greeting:
      "Hey beautiful soul! ✨ I'm Maya, your creative companion. Let's paint your thoughts with colors and explore the art of being you!",
    systemPrompt:
      "You are Maya, a creative and inspiring AI companion. You use colorful language, encourage artistic expression, and help users think outside the box. You're imaginative, playful, and focus on creative solutions.",
  },
  {
    id: "zen",
    name: "Mindful Zen",
    description: "Calm, centered, and peaceful. Excellent for stress relief and mindfulness practice.",
    icon: Compass,
    color: "from-green-500 to-emerald-500",
    traits: {
      empathy: 85,
      energy: 30,
      formality: 50,
      humor: 20,
      directness: 40,
    },
    specialties: ["Mindfulness", "Stress Relief", "Meditation", "Inner Peace"],
    greeting:
      "Peace be with you, friend. I'm Zen, here to help you find calm in the storm. Take a deep breath... how can we bring more peace to your day?",
    systemPrompt:
      "You are Zen, a calm and mindful AI companion. You speak slowly and thoughtfully, focus on present-moment awareness, and help users find inner peace. You're serene, grounding, and emphasize mindfulness practices.",
  },
]

interface PersonalitySelectorProps {
  selectedPersonality: AIPersonality
  onPersonalityChange: (personality: AIPersonality) => void
  onCustomize: (traits: AIPersonality["traits"]) => void
}

export function PersonalitySelector({
  selectedPersonality,
  onPersonalityChange,
  onCustomize,
}: PersonalitySelectorProps) {
  const [showCustomization, setShowCustomization] = useState(false)
  const [customTraits, setCustomTraits] = useState(selectedPersonality.traits)

  const handleTraitChange = (trait: keyof AIPersonality["traits"], value: number[]) => {
    const newTraits = { ...customTraits, [trait]: value[0] }
    setCustomTraits(newTraits)
    onCustomize(newTraits)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Choose Your AI Companion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalities.map((personality) => (
              <div
                key={personality.id}
                onClick={() => onPersonalityChange(personality)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedPersonality.id === personality.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${personality.color}`}>
                    <personality.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{personality.name}</h3>
                    {selectedPersonality.id === personality.id && (
                      <Badge variant="default" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{personality.description}</p>

                <div className="flex flex-wrap gap-1">
                  {personality.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {personality.specialties.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{personality.specialties.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personality Customization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Customize {selectedPersonality.name}
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowCustomization(!showCustomization)}>
              {showCustomization ? "Hide" : "Customize"}
            </Button>
          </CardTitle>
        </CardHeader>

        {showCustomization && (
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Empathy Level</label>
                  <Slider
                    value={[customTraits.empathy]}
                    onValueChange={(value) => handleTraitChange("empathy", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Logical</span>
                    <span>{customTraits.empathy}%</span>
                    <span>Emotional</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Energy Level</label>
                  <Slider
                    value={[customTraits.energy]}
                    onValueChange={(value) => handleTraitChange("energy", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Calm</span>
                    <span>{customTraits.energy}%</span>
                    <span>Energetic</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Communication Style</label>
                  <Slider
                    value={[customTraits.formality]}
                    onValueChange={(value) => handleTraitChange("formality", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Casual</span>
                    <span>{customTraits.formality}%</span>
                    <span>Formal</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Humor Level</label>
                  <Slider
                    value={[customTraits.humor]}
                    onValueChange={(value) => handleTraitChange("humor", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Serious</span>
                    <span>{customTraits.humor}%</span>
                    <span>Playful</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Directness</label>
                  <Slider
                    value={[customTraits.directness]}
                    onValueChange={(value) => handleTraitChange("directness", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Gentle</span>
                    <span>{customTraits.directness}%</span>
                    <span>Direct</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-medium mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPersonality.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Preview Response Style</h4>
              <p className="text-sm text-muted-foreground italic">"{selectedPersonality.greeting}"</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export { personalities }
