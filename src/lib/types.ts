import { TMDB_BACKDROP_SIZES, TMDB_POSTER_SIZES } from './constants'

export type Movie = {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: 'movie' | 'tv'
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type Tv = {
  adult: boolean
  backdrop_path: string
  id: number
  genre_ids: number[]
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}

export type ContentSearchResult<T extends Movie | Tv> = {
  page: number
  total_pages: number
  total_results: number
  results: T[]
}

export type SearchByNameResponse = {
  movies: Movie[]
  tvShows: Tv[]
  total_results: number
}

export type TMDBPosterSize = (typeof TMDB_POSTER_SIZES)[number]
export type TMDBBackdropSize = (typeof TMDB_BACKDROP_SIZES)[number]
