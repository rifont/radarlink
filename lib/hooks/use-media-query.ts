import { useEffect, useState } from 'react'

/**
 * The `useMediaQuery` function is a custom React hook that returns a boolean value indicating whether
 * a given media query matches the current viewport.
 * @param {string} query - The `query` parameter is a string representing a media query. It can be any
 * valid CSS media query, such as `"screen and (max-width: 768px)"` or `"print"`. The `useMediaQuery`
 * hook will return a boolean value indicating whether the current viewport matches the
 * @returns The function `useMediaQuery` returns a boolean value indicating whether the media query
 * specified by the `query` parameter matches the current viewport.
 */
export function useMediaQuery(query: string): boolean {
    const getMatches = (query: string): boolean => {
        // Prevents SSR issues
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches
        }
        return false
    }

    const [matches, setMatches] = useState<boolean>(getMatches(query))

    function handleChange() {
        setMatches(getMatches(query))
    }

    useEffect(() => {
        const matchMedia = window.matchMedia(query)

        // Triggered at the first client-side load and if query changes
        handleChange()

        // Listen matchMedia
        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange)
        } else {
            matchMedia.addEventListener('change', handleChange)
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange)
            } else {
                matchMedia.removeEventListener('change', handleChange)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    return matches
}
