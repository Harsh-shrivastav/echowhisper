"use client"

import { useState, useEffect } from "react"

interface ProTrialState {
  isTrialActive: boolean
  trialStartDate: string | null
  trialEndDate: string | null
  hasUsedTrial: boolean
}

const TRIAL_DURATION_DAYS = 30
const TRIAL_STATE_KEY = "echowhisper-pro-trial"

export function useProTrial() {
  const [trialState, setTrialState] = useState<ProTrialState>({
    isTrialActive: false,
    trialStartDate: null,
    trialEndDate: null,
    hasUsedTrial: false,
  })

  useEffect(() => {
    // Load trial state from localStorage
    const savedState = localStorage.getItem(TRIAL_STATE_KEY)
    if (savedState) {
      const parsed = JSON.parse(savedState)
      setTrialState(parsed)
    }
  }, [])

  const startTrial = () => {
    const now = new Date()
    const endDate = new Date(now.getTime() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000) // 30 days from now

    const newState: ProTrialState = {
      isTrialActive: true,
      trialStartDate: now.toISOString(),
      trialEndDate: endDate.toISOString(),
      hasUsedTrial: true,
    }

    setTrialState(newState)
    localStorage.setItem(TRIAL_STATE_KEY, JSON.stringify(newState))
  }

  const checkTrialExpiry = () => {
    if (!trialState.trialEndDate) return false

    const now = new Date()
    const endDate = new Date(trialState.trialEndDate)

    if (now > endDate && trialState.isTrialActive) {
      // Trial has expired
      const expiredState = {
        ...trialState,
        isTrialActive: false,
      }
      setTrialState(expiredState)
      localStorage.setItem(TRIAL_STATE_KEY, JSON.stringify(expiredState))
      return true
    }

    return false
  }

  const getDaysRemaining = () => {
    if (!trialState.trialEndDate || !trialState.isTrialActive) return 0

    const now = new Date()
    const endDate = new Date(trialState.trialEndDate)
    const diffTime = endDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return Math.max(0, diffDays)
  }

  // Check if user can access Pro features (trial active or has pro subscription)
  const canAccessPro = trialState.isTrialActive || false // Add subscription check here later

  useEffect(() => {
    checkTrialExpiry()
  }, [trialState.trialEndDate])

  return {
    isTrialActive: trialState.isTrialActive,
    hasUsedTrial: trialState.hasUsedTrial,
    daysRemaining: getDaysRemaining(),
    canAccessPro,
    startTrial,
    checkTrialExpiry,
  }
}
