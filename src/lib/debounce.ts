// This function creates a debounced version of the provided function.
// A debounced function will delay the execution of the provided function
/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified delay has elapsed since the last time the debounced function was invoked.
 *
 * @param func - The function to debounce
 * @param delay - The number of milliseconds to delay
 * @returns A debounced version of the provided function
 *
 * @example
 * ```typescript
 * // Create a debounced version of a search function that will only execute 300ms after the last call
 * const debouncedSearch = debounce((query: string) => {
 *   fetchSearchResults(query);
 * }, 300);
 *
 * // Can be called multiple times, but will only execute once after the last call
 * searchInput.addEventListener('input', (e) => {
 *   debouncedSearch(e.target.value);
 * });
 * ```
 */
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
