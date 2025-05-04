import React from 'react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export default function layout({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>
}
