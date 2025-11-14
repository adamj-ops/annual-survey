"use client"

import * as React from "react"

export function Step0Welcome() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mt-6 sm:mt-8 mb-6 sm:mb-8 w-full">
        <p className="text-[16px] sm:text-[18px] text-muted-foreground max-w-2xl mx-auto px-4 space-y-3">
          <span className="font-semibold block">We want to hear from you!</span>
          <span className="block">
            In 2024, the North American Thrombosis Forum (NATF) rebranded to Vasculearn Network (VLN)—reflecting our commitment to advancing education and collaboration across the broader spectrum of vascular health. As we continue to evolve, your perspectives are invaluable in helping us understand what’s working well and where we can improve.
          </span>
          <span className="block">
            Thank you for taking a few minutes to share your thoughts since the rebrand—your feedback helps shape our future programs, community, and impact.
          </span>
          <span className="font-semibold block">
            To be eligible to win the $250 Amazon gift card, you must provide your email and a testimonial.
          </span>
        </p>
      </div>
    </div>
  )
}

