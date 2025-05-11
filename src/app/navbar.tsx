'use client'
import { Button } from '@/components/ui/button'
import { SessionContext } from '@/contexts/sessionContext'
import useKey from '@/hooks/useKey'
import { signOut } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { CommandIcon, LoaderCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { use } from 'react'

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  searchHidden?: boolean
}

const styles = {
  header: `flex items-center justify-between p-4 font-mono text-white bg-transparent container mx-auto`,
  logo: `flex items-center gap-2 text-xl`,
  searchButton: `focus-visible:ring-ring border-input hover:bg-accent hover:text-accent-foreground bg-muted/50 text-muted-foreground relative inline-flex h-8 w-full items-center justify-start gap-2 cursor-pointer rounded-[0.5rem] border px-4 py-2 pr-14 text-sm font-normal whitespace-nowrap shadow-none transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50`,
  kbd: `bg-muted pointer-events-none absolute top-1/2 right-2 hidden h-5 -translate-y-1/2 items-center gap-1 rounded border px-1.5 text-[10px] font-medium opacity-100 select-none sm:flex`,
}

const Navbar = ({ className, searchHidden, ...restProps }: NavbarProps) => {
  const router = useRouter()
  useKey(
    {
      key: 'k',
      ctrlKey: true,
    },
    () => {
      router.push('/search')
    },
  )
  const session = use(SessionContext)
  return (
    <header className={cn(styles.header, className)} {...restProps}>
      <Link href={'/'} className={styles.logo}>
        <Image alt="logo" src={'logo.svg'} width={16} height={16} />
        <p>flix</p>
      </Link>
      <div className={`flex items-center gap-2`}>
        <div
          className={cn(`hidden md:flex`, `${searchHidden ? 'md:hidden' : ''}`)}
        >
          <Link href={'/search'} className={styles.searchButton}>
            <span>Search for a movie or show</span>
            <kbd className={styles.kbd}>
              <CommandIcon className={`h-[1em] w-[1em]`} />
              <span>K</span>
            </kbd>
          </Link>
        </div>

        {session?.isPending ? (
          <Button variant={'default'} size={'sm'} disabled>
            <LoaderCircleIcon className={`animate-spin`} />
          </Button>
        ) : session?.error ? (
          <LoginButton />
        ) : session?.data?.user ? (
          <LogoutButton refetch={session?.refetch} />
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  )
}

const LogoutButton = ({ refetch }: { refetch: () => void }) => {
  return (
    <Button
      variant={'default'}
      size={'sm'}
      onClick={() => {
        signOut()
        refetch()
      }}
    >
      Logout
    </Button>
  )
}

const LoginButton = () => {
  return (
    <Button variant={'default'} size={'sm'}>
      <Link href={'/auth'}>Login</Link>
    </Button>
  )
}

export default Navbar
