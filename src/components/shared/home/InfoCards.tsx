import { HoverEffect } from '@/components/ui/card-hover-effect'
import { homePageCards } from '@/lib/constant'
import React from 'react'

export default function InfoCards() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen h-full w-full mt-8">
      <h1 className="text-4xl font-bold mb-8">Check <span className="bg-gradient-to-br from-primary to-red-900 bg-clip-text text-transparent box-decoration-clone">main</span> courses</h1>
        <HoverEffect
    className="h-full"
          items={homePageCards}
        />
    </div>
  )
}
