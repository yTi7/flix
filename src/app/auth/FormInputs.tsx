'use client'
import React from 'react'
import { AtSignIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

type InputProps = React.ComponentPropsWithoutRef<typeof Input>

export function EmailInput({ ...props }: InputProps) {
  const id = React.useId()
  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id={id}
          className="peer ps-9"
          placeholder="Email"
          type="email"
          {...props}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <AtSignIcon size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

export function PasswordInput({ ...props }: InputProps) {
  const id = React.useId()
  const [isVisible, setIsVisible] = React.useState<boolean>(false)

  const toggleVisibility = () => setIsVisible(prevState => !prevState)

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id={id}
          className="pe-9"
          placeholder="Password"
          type={isVisible ? 'text' : 'password'}
          autoComplete="current-password"
          {...props}
        />
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOffIcon size={16} aria-hidden="true" />
          ) : (
            <EyeIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  )
}
