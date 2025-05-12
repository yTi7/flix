'use client'
import React from 'react'
import { useQueryState } from 'nuqs'
import { useQuery } from '@tanstack/react-query'

import { motion } from 'motion/react'
import Navbar from '@/app/navbar'
import { Input } from '@/components/ui/input'
import ContentList from './ContentList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GlowEffect } from '@/components/ui/glow-effect'

import { debounce } from '@/lib/utils'
import { searchByName } from '@/lib/tmdb'
import { SearchByNameResponse } from '@types'

export default function SearchPage() {
  const [query, setQuery] = useQueryState('query')
  const searchBoxRef = React.useRef<HTMLInputElement>(null)
  const debouncedSetQuery = React.useCallback(debounce(setQuery, 500), [])

  React.useEffect(() => {
    searchBoxRef.current?.focus()
  }, [])

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchByName', query],
    queryFn: () => searchByName(query as string),
    enabled: !!query,
  })

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
              duration: 0.15,
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
            defaultValue={query as string}
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
            <ContentArea fetchedData={data} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </>
  )
}

function ContentArea({
  fetchedData,
  isLoading,
}: {
  fetchedData?: SearchByNameResponse | null
  isLoading?: boolean
}) {
  return (
    <Tabs defaultValue="tab-1">
      <TabsList className={`my-4`}>
        <TabsTrigger value="tab-1">Movies</TabsTrigger>
        <TabsTrigger value="tab-2">Tv</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1" className={`w-full`}>
        <h2 className="mb-4 text-4xl font-bold">Movies</h2>
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
        {!isLoading && fetchedData?.movies?.length === 0 && (
          <div className="flex h-full w-full items-center justify-center">
            <p>No movies found.</p>
          </div>
        )}
        <ContentList
          content={fetchedData?.movies as SearchByNameResponse['movies']}
          type={'movie'}
        />
      </TabsContent>
      <TabsContent value="tab-2" className={`w-full`}>
        <h2 className="mb-4 text-4xl font-bold">TV Shows</h2>
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
        {!isLoading && fetchedData?.tvShows?.length === 0 && (
          <div className="flex h-full w-full items-center justify-center">
            <p>No TV shows found.</p>
          </div>
        )}
        <ContentList
          content={fetchedData?.tvShows as SearchByNameResponse['tvShows']}
          type={'tvShow'}
        />
      </TabsContent>
    </Tabs>
  )
}
