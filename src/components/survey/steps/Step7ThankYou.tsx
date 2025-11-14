"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function Step7ThankYou() {
  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-[64px]">Thank You!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Your feedback helps us strengthen our mission, improve our programs, and better support patients and clinicians across the vascular health community.
          </p>
          <p className="text-center text-muted-foreground">
            We appreciate your time and insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="https://vln.thrombosis.org" target="_blank" rel="noopener noreferrer">
                Explore the VLN Community
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Link
              href="https://thrombosis.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground underline decoration-2 underline-offset-4 hover:decoration-primary transition-all hover:text-primary"
            >
              Visit Vasculearn Network Website
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

