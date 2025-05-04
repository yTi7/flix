'use client'

import { useSessionContext } from '@/contexts/sessionContext'

const Main = () => {
  const { data, isPending } = useSessionContext()
  return (
    <div className={`flex h-screen flex-col items-center justify-center`}>
      <h1>Hello, {isPending ? 'Loading...' : data?.user?.name}!</h1>
      <p>Email: {data?.user.email}</p>
    </div>
  )
}

export default Main
