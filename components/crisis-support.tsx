"use client"

import { Phone, MapPin, Clock, Heart, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function CrisisSupport() {
  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 crisis support for people in suicidal crisis or emotional distress",
      available: "24/7",
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text message",
      available: "24/7",
    },
    {
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service for mental health and substance abuse",
      available: "24/7",
    },
    {
      name: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      description: "Support for domestic violence survivors",
      available: "24/7",
    },
  ]

  const copingStrategies = [
    {
      title: "Grounding Technique (5-4-3-2-1)",
      description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
      icon: "🌱",
    },
    {
      title: "Box Breathing",
      description: "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.",
      icon: "💨",
    },
    {
      title: "Cold Water",
      description: "Splash cold water on your face or hold ice cubes",
      icon: "❄️",
    },
    {
      title: "Call Someone",
      description: "Reach out to a trusted friend, family member, or counselor",
      icon: "📞",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Emergency Alert */}
      <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800 dark:text-red-200">
          <strong>If you're in immediate danger, call 911 or go to your nearest emergency room.</strong>
          <br />
          If you're having thoughts of suicide or self-harm, please reach out for help immediately.
        </AlertDescription>
      </Alert>

      {/* Crisis Hotlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Crisis Support Hotlines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {crisisResources.map((resource, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{resource.name}</h3>
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <Clock className="w-3 h-3" />
                  {resource.available}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`tel:${resource.phone.replace(/\D/g, "")}`)}
                className="w-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                {resource.phone}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Immediate Coping Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Immediate Coping Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copingStrategies.map((strategy, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{strategy.icon}</span>
                  <h3 className="font-semibold text-sm">{strategy.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground">{strategy.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Local Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Find Local Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Connect with mental health professionals and support groups in your area.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <div className="font-semibold mb-1">Psychology Today</div>
              <div className="text-xs text-muted-foreground">Find therapists and support groups</div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <div className="font-semibold mb-1">NAMI</div>
              <div className="text-xs text-muted-foreground">National Alliance on Mental Illness</div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <div className="font-semibold mb-1">Crisis Centers</div>
              <div className="text-xs text-muted-foreground">Local crisis intervention centers</div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <div className="font-semibold mb-1">Support Groups</div>
              <div className="text-xs text-muted-foreground">Peer support and group therapy</div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Safety Planning */}
      <Card>
        <CardHeader>
          <CardTitle>Create a Safety Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A safety plan is a personalized, practical plan that can help you stay safe when you're having thoughts of
            suicide.
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-1">1. Warning Signs</div>
              <div className="text-xs text-muted-foreground">
                Identify thoughts, feelings, or situations that might lead to a crisis
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-1">2. Coping Strategies</div>
              <div className="text-xs text-muted-foreground">
                List things you can do on your own to help yourself feel better
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-1">3. Support People</div>
              <div className="text-xs text-muted-foreground">
                People you can reach out to for support and distraction
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-1">4. Professional Contacts</div>
              <div className="text-xs text-muted-foreground">Mental health professionals and crisis hotlines</div>
            </div>
          </div>

          <Button className="w-full mt-4">Download Safety Plan Template</Button>
        </CardContent>
      </Card>
    </div>
  )
}
