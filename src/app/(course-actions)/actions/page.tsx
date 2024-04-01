import ActionForm from '@/components/shared/courses/ActionForm'
import React from 'react'

export default function Page() {
  return (
    <main className="min-h-screen w-full h-full">
      <div className="max-w-screen-xl h-full mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
        <ActionForm isUpdate={false} />
      </div>
    </main>
  )
}
