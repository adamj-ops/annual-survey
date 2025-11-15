"use client"

import * as React from "react"

export function Step0Welcome() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full py-6 sm:py-8">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          {/* Main heading */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              We want to hear from you!
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Main content */}
          <div className="space-y-5 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
            <p className="text-justify">
              In 2024, the North American Thrombosis Forum (NATF) rebranded to Vasculearn Network (VLN)—reflecting our commitment to advancing education and collaboration across the broader spectrum of vascular health.
            </p>

            <p className="text-justify">
              As we continue to evolve, your perspectives are invaluable in helping us understand what&apos;s working well and where we can improve.
            </p>

            <p className="text-justify font-medium">
              Thank you for taking a few minutes to share your thoughts since the rebrand—your feedback helps shape our future programs, community, and impact.
            </p>
          </div>

          {/* Gift card notice */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 sm:p-5 mt-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-primary font-bold text-sm">🎁</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-[15px] sm:text-[16px]">
                  Gift Card Drawing
                </p>
                <p className="text-muted-foreground text-[14px] sm:text-[15px] mt-1">
                  To be eligible to win the <span className="font-semibold text-primary">$250 Amazon gift card</span>, you must provide your email and a testimonial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

