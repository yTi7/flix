export const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
export const TMDB_API_KEY = ''
export const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN
export const TMDB_AUTH_HEADER = `Bearer ${TMDB_API_TOKEN}`
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
export const TMDB_BACKDROP_SIZES = [
  'w300',
  'w780',
  'w1280',
  'original',
] as const
export const TMDB_POSTER_SIZES = [
  'w92',
  'w154',
  'w185',
  'w342',
  'w500',
  'w780',
  'original',
] as const
