import { TMDB_IMAGE_BASE_URL } from '@/lib/constants'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(TMDB_IMAGE_BASE_URL + '/**')],
  },
}

export default nextConfig
