import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory } = body

    // Input validation
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 })
    }

    // Crisis detection
    const crisisKeywords = [
      "suicide",
      "kill myself",
      "end it all",
      "not worth living",
      "better off dead",
      "hurt myself",
      "self harm",
      "cutting",
      "overdose",
      "jump off",
    ]

    const hasCrisisContent = crisisKeywords.some((keyword) => message.toLowerCase().includes(keyword))

    if (hasCrisisContent) {
      return NextResponse.json({
        response:
          "I'm really concerned about what you're sharing with me. Your life has value, and there are people who want to help. Please consider reaching out to a crisis helpline: Call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line). If you're in immediate danger, please call 911. Would you like me to help you find local mental health resources?",
        detectedMood: 1,
        tags: ["crisis", "urgent"],
        requiresFollowUp: true,
      })
    }

    // Sanitize input
    const sanitizedMessage = message.trim().replace(/[<>]/g, "")

    // Build context-aware prompt
    const systemPrompt = `You are EchoWhisper, a compassionate AI companion focused on emotional support and mental wellness. You provide a safe, non-judgmental space for users to express their thoughts and feelings.

Your approach:
- Listen actively and validate emotions
- Offer gentle support and encouragement
- Help users process their feelings
- Suggest healthy coping strategies when appropriate
- Recognize signs of distress and provide appropriate resources
- Maintain hope and focus on resilience

Always prioritize the user's emotional safety and well-being.`

    // Add conversation history for context
    let conversationContext = ""
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext =
        "\n\nRecent conversation context:\n" +
        conversationHistory
          .slice(-3)
          .map((msg: any) => `${msg.sender}: ${msg.text}`)
          .join("\n")
    }

    const fullPrompt = `${systemPrompt}${conversationContext}\n\nUser: ${sanitizedMessage}`

    // Use Gemini API
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured")
      return NextResponse.json({ error: "AI service is temporarily unavailable" }, { status: 503 })
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

    const payload = {
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "EchoWhisper/1.0",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Gemini API error:", response.status, response.statusText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const result = await response.json()

    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const aiResponse = result.candidates[0].content.parts[0].text

      return NextResponse.json({
        response: aiResponse,
        detectedMood: 3,
        tags: [],
      })
    } else {
      // Fallback response
      const fallbackResponses = [
        "I hear you, and I want you to know that your feelings are valid. Sometimes just expressing what we're going through can be the first step toward feeling better. What's most important to you right now?",
        "Thank you for sharing with me. It takes courage to open up about what you're experiencing. I'm here to listen and support you through this. How can I best help you today?",
        "I can sense that you're going through something. Please know that you're not alone in this. Your feelings matter, and it's okay to take things one moment at a time.",
      ]

      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

      return NextResponse.json({
        response: randomResponse,
        detectedMood: 3,
        tags: ["general"],
      })
    }
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "I'm having trouble connecting right now. Please try again in a moment." },
      { status: 500 },
    )
  }
}
