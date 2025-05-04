import { useId } from 'react'
import gsap from 'gsap'
import { motion } from 'motion/react'

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
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ContentCard({
  item,
  index = 1,
  type,
  setIsLoading,
}: ContentCardProps) {
  const title = type === 'movie' ? (item as any).title : (item as any).name
  const releaseDate =
    type === 'movie' ? (item as any).release_date : (item as any).first_air_date
  const id = useId()

  function handleOnImageLoad() {
    gsap.to(`#${id}`, {
      delay: 0.2,
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        setIsLoading?.(false)
        document.getElementById(id)?.remove()
      },
    })
  }

  return (
    <motion.div
      key={item.id}
      className={`content__card flex w-fit cursor-pointer flex-col gap-2 opacity-0 blur-md transition-all hover:scale-105`}
      title={title}
      initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.9 }}
      animate={{
        opacity: 1,
        filter: 'blur(0)',
        scale: 1,
        y: 0,
      }}
      exit={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      transition={{
        delay: 0.08 * index,
        duration: 0.5,
        ease: 'anticipate',
      }}
    >
      <div
        className={`relative h-[278px] w-[185px] overflow-hidden rounded-lg`}
      >
        <ImagePlaceholder id={id} />
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

function ImagePlaceholder({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        `bg-muted absolute top-0 left-0 z-30 flex h-full w-full items-center justify-center`,
        className,
      )}
      {...props}
    >
      <LoaderCircleIcon className={`animate-spin`} />
    </div>
  )
}
