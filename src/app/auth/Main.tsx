'use client'

import { SessionContext } from '@/contexts/sessionContext'
import { use } from 'react'

const Main = () => {
  const session = use(SessionContext)
  return (
    <div className={`flex h-screen flex-col items-center justify-center`}>
      <h1>
        Hello, {session?.isPending ? 'Loading...' : session?.data?.user?.name}!
      </h1>
      <p>Email: {session?.data?.user.email}</p>
    </div>
  )
}

export default Main
