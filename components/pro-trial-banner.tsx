"use client"

import { useState } from "react"
import { X, Crown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProTrial } from "@/hooks/use-pro-trial"

export default function ProTrialBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const { isTrialActive, daysRemaining, startTrial, canAccessPro } = useProTrial()

  if (!isVisible) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl mx-auto z-40">
      <div className="pro-trial-banner rounded-xl p-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="h-6 w-6 text-yellow-400" />
            <div>
              {!isTrialActive && !canAccessPro ? (
                <>
                  <h3 className="text-white font-semibold">Start Your Free Pro Trial</h3>
                  <p className="text-gray-200 text-sm">Unlock all AI personalities and advanced features for 30 days</p>
                </>
              ) : isTrialActive ? (
                <>
                  <h3 className="text-white font-semibold flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Pro Trial Active
                  </h3>
                  <p className="text-gray-200 text-sm">{daysRemaining} days remaining • Enjoying premium features</p>
                </>
              ) : (
                <>
                  <h3 className="text-white font-semibold">Pro Features Available</h3>
                  <p className="text-gray-200 text-sm">Access to all AI personalities and advanced features</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isTrialActive && !canAccessPro && (
              <Button
                onClick={startTrial}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-lg font-semibold text-sm hover:scale-105 transition-transform duration-200"
              >
                Start Free Trial
              </Button>
            )}

            {isTrialActive && daysRemaining <= 3 && (
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:scale-105 transition-transform duration-200">
                Upgrade Now
              </Button>
            )}

            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
