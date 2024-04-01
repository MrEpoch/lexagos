import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {

  const { userId } = auth();

  if (!userId) throw redirect('/sign-in');

  const user = await getUserById(userId);

  if (!user) throw redirect('/sign-in');

  return (
    <>{children}</>
  )
}
