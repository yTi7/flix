import React, { useState } from 'react'
import { SearchByNameResponse } from '@/lib/types'
import ContentCard from './ContentCard'

function ContentList<
  T extends SearchByNameResponse['movies'] | SearchByNameResponse['tvShows'],
>({ content, type }: { content: T; type: 'movie' | 'tvShow' }) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
      {content?.map((item, index) => {
        return (
          <ContentCard
            item={item}
            setIsLoading={setIsLoading}
            type={type}
            key={index}
            index={index}
          />
        )
      })}
    </div>
  )
}

export default ContentList
