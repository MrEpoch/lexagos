import React from 'react'
import VideoPlayer from '../VideoPlayer'

export default function HomeVideo() {
  return (
    <div className="min-h-screen h-full w-full flex items-center relative">
      <div className="w-full items-center lg:flex-row flex-col justify-between flex h-full">
        <div className="w-full">f</div>
        <VideoPlayer video="/assets/intro-video.mp4" thumb="/assets/book.jpg" videoWidth={1920} videoHeight={1080} thumbWidth={1920} thumbHeight={1080} />
      </div>
    </div>
  )
}
