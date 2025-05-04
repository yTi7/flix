'use client'
import { useSession } from '@/lib/auth-client'
import { createContext, useContext } from 'react'

type Session = ReturnType<typeof useSession>

const SessionContext = createContext<Session | null>(null)

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const session = useSession()
  return <SessionContext value={session}>{children}</SessionContext>
}

export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
