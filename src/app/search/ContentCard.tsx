import { useId, useState } from 'react'
import { HTMLMotionProps, motion, Variants } from 'motion/react'

import { cn, truncateString } from '@/lib/utils'
import { getPosterUrl } from '@/lib/tmdb'
import { Movie, Tv } from '@/lib/types'

import { Button } from '@/components/ui/button'
import { LoaderCircleIcon, Plus } from 'lucide-react'
import Image from 'next/image'

type ContentCardProps = {
  item: Movie | Tv
  index?: number
  type: 'movie' | 'tvShow'
}

export default function ContentCard({
  item,
  index = 1,
  type,
}: ContentCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const title = type === 'movie' ? (item as any).title : (item as any).name
  const releaseDate =
    type === 'movie' ? (item as any).release_date : (item as any).first_air_date
  const id = useId()
  const animationDelay = 0.08 * index

  function handleOnImageLoad() {
    setIsLoading(false)
  }

  return (
    <motion.div
      key={item.id}
      className={`content__card flex w-fit cursor-pointer flex-col gap-2 opacity-0 blur-md transition-all hover:scale-105`}
      title={title}
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      animate={{
        opacity: 1,
        filter: 'blur(0)',
        y: 0,
      }}
      exit={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      transition={{
        delay: animationDelay,
        duration: 0.5,
        ease: 'anticipate',
      }}
    >
      <div
        className={`relative h-[278px] w-[185px] overflow-hidden rounded-lg`}
      >
        <ImagePlaceholder
          animationDelay={animationDelay}
          id={id}
          isLoading={isLoading}
        />
        <Image
          alt={`${type === 'movie' ? 'Movie' : 'TV Show'} Poster`}
          src={getPosterUrl(item.poster_path, 'w185')}
          fill
          onLoad={handleOnImageLoad}
          className={`rounded-lg object-cover transition-all`}
          sizes="(185px)"
          priority
        />
        <Button
          variant={'secondary'}
          size={'icon'}
          className={`absolute top-2 right-2 backdrop-blur-md`}
        >
          <Plus className={`h-4 w-4`} />
        </Button>
      </div>
      <div>
        <p className="text-lg font-semibold text-wrap">
          {truncateString(title, 20)}
        </p>
        <p className="text-muted-foreground text-sm">{releaseDate}</p>
      </div>
    </motion.div>
  )
}

type ImagePlaceholderProps = {
  className?: string
  isLoading?: boolean
  id?: string
  animationDelay: number
}

function ImagePlaceholder({
  className,
  isLoading,
  animationDelay,
  ...props
}: HTMLMotionProps<'div'> & ImagePlaceholderProps) {
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  return (
    <motion.div
      className={cn(
        `bg-muted absolute top-0 left-0 z-30 flex h-full w-full items-center justify-center`,
        className,
      )}
      {...props}
      initial={{ opacity: 0 }}
      variants={variants}
      transition={{
        delay: animationDelay + 0.2,
        duration: 0.5,
        ease: 'anticipate',
      }}
      animate={isLoading ? 'visible' : 'hidden'}
    >
      <LoaderCircleIcon className={`animate-spin`} />
    </motion.div>
  )
}
