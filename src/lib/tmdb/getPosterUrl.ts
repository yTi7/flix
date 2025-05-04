import { TMDB_IMAGE_BASE_URL } from '../constants'
import { TMDBPosterSize } from '../types'

/**
 * Resolves the URL for a poster image.
 *
 * @param path - The path to the poster image (poster_path) from the `searchByName` function response
 * @param size - The size of the poster image
 * @returns The complete URL for the poster image or a placeholder image if the path is empty
 */
export const getPosterUrl = (path: string, size: TMDBPosterSize) => {
  if (!path)
    return 'https://image.tmdb.org/t/p/w185/4b4v7RnPhNyPEaVGFarEuo74r8W.jpg'
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}
