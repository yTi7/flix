'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useQueryState } from 'nuqs'
import { motion } from 'motion/react'

import Navbar from '@/app/navbar'
import { Input } from '@/components/ui/input'

import { debounce } from '@/lib/utils'
import { GlowEffect } from '@/components/ui/glow-effect'
import { searchByName } from '@/lib/tmdb'
import { SearchByNameResponse } from '@/lib/types'
import ContentList from './ContentList'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function SearchPage() {
  const [query, setQuery] = useQueryState('query')
  const [isLoading, setIsLoading] = useState(false)
  const searchBoxRef = useRef<HTMLInputElement>(null)
  const [fetchedData, setFetchedData] = useState<SearchByNameResponse | null>(
    null,
  )
  const debouncedSetQuery = useCallback(debounce(setQuery, 500), [])

  useEffect(() => {
    searchBoxRef.current?.focus()
  }, [])

  // useGSAP(() => {
  //   gsap.to('.content__card', {
  //     opacity: 1,
  //     filter: 'blur(0)',
  //     y: 0,
  //     stagger: 0.1,
  //     duration: 0.5,
  //     ease: 'power2.in',
  //   })
  // }, [fetchedData])

  useEffect(() => {
    if (!query) return
    if (query.length < 3) return
    setIsLoading(true)
    searchByName(query).then(data => {
      console.log(data)
      setFetchedData(data)
      setIsLoading(false)
    })
  }, [query])

  return (
    <>
      <div className={`h-fit w-full bg-transparent backdrop-blur-md`}>
        <Navbar searchHidden />
      </div>
      <div className={`container mx-auto p-4`}>
        <div className={`relative mb-6`}>
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              opacity: isLoading ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}
          >
            <GlowEffect
              colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
              mode="flowHorizontal"
              blur="softest"
              duration={2}
            />
          </motion.div>
          <Input
            placeholder="Search for movie or show..."
            onChange={e => debouncedSetQuery(e.target.value)}
            ref={searchBoxRef}
            className={`bg-background relative inline-flex`}
          />
        </div>
        <main className={`flex flex-col gap-4`}>
          <div className="flex h-full w-full flex-col justify-center gap-2">
            <p>Searching for: {query}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold">Movies</h2>
            <ContentList
              content={fetchedData?.movies as SearchByNameResponse['movies']}
              type={'movie'}
            />
            <h2 className="text-4xl font-bold">TV Shows</h2>
            <ContentList
              content={fetchedData?.tvShows as SearchByNameResponse['tvShows']}
              type={'tvShow'}
            />
          </div>
        </main>
      </div>
    </>
  )
}
