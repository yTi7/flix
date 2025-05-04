import { TMDB_AUTH_HEADER, TMDB_BASE_URL } from '../constants'
import { Movie, ContentSearchResult, Tv, SearchByNameResponse } from '../types'

const baseOptions: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: TMDB_AUTH_HEADER,
  },
}

/**
 * Searches for movies, TV shows, and people by name using the TMDB API.
 *
 * @param query - The search query string to find movies, TV shows, or people
 * @returns A Promise that resolves to the search results from TMDB API
 * @throws Error if the API request fails
 *
 * @example
 * ```typescript
 * // Search for 'Inception'
 * const results = await searchByName('Inception');
 * ```
 */
export const searchByName = async (query: string) => {
  const movies = await searchMovieByName(query)
  const tvShows = await searchTvByName(query)
  const data = {
    movies: movies.results,
    tvShows: tvShows.results,
    total_results: movies.total_results + tvShows.total_results,
  }
  return data as SearchByNameResponse
}

export const searchMovieByName = async (query: string, page: number = 1) => {
  const url = `${TMDB_BASE_URL}/search/movie?query=${query}&language=en-US&page=${page}`
  const res = await fetch(url, baseOptions)
  const data = await res.json()
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return data as ContentSearchResult<Movie>
}

export const searchTvByName = async (query: string, page: number = 1) => {
  const url = `${TMDB_BASE_URL}/search/tv?query=${query}&language=en-US&page=${page}`
  const res = await fetch(url, baseOptions)
  const data = await res.json()
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return data as ContentSearchResult<Tv>
}

export { getPosterUrl } from './getPosterUrl'
