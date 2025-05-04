import React from 'react'

interface Key {
  key: string
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
}

export default function useKey(key: Key, callback: (e: KeyboardEvent) => void) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === key.key &&
        (key.ctrlKey ? e.ctrlKey : true) &&
        (key.altKey ? e.altKey : true) &&
        (key.shiftKey ? e.shiftKey : true)
      ) {
        e.preventDefault()
        callback(e)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [key, callback])
}
