'use client'
import { useSession } from '@/lib/auth-client'
import { createContext, useContext } from 'react'

export type Session = ReturnType<typeof useSession>

export const SessionContext = createContext<Session | null>(null)

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const session = useSession()
  return <SessionContext value={session}>{children}</SessionContext>
}
