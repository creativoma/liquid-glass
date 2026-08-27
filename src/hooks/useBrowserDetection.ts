import { useSyncExternalStore } from 'react'

// RegExp patterns hoisted to module level for performance
const IOS_REGEX = /iPad|iPhone|iPod/
const SAFARI_REGEX = /^((?!chrome|android).)*safari/i

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Detects if the browser has limited SVG filter support (Safari/iOS)
 * Uses feature detection combined with user agent as fallback
 */
const hasLimitedFilterSupport = (): boolean => {
  if (typeof window === 'undefined') return false

  // Check for Safari/iOS using user agent as a practical approach
  // since feDisplacementMap support detection is complex and unreliable
  const ua = window.navigator.userAgent
  const isIOS = IOS_REGEX.test(ua)
  const isSafari = SAFARI_REGEX.test(ua)

  return isIOS || isSafari
}

/**
 * Detects whether the user has requested reduced motion at the OS level.
 * The full filter (turbulence + specular lighting + displacement) is the
 * most GPU-intensive path, so reduced-motion users get the cheaper filter too.
 */
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

// The user agent never changes during a session — nothing to subscribe to
const subscribeToNothing = () => () => {}

const subscribeToReducedMotion = (onChange: () => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

// Server snapshots are false so SSR and hydration always render the full
// filter markup; the client value takes over right after hydration
const serverSnapshot = () => false

/**
 * Custom hook for detecting browser capabilities
 * Returns whether a simplified filter should be used for Safari/iOS
 * or when the user has requested reduced motion
 */
export const useBrowserDetection = () => {
  const isReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    prefersReducedMotion,
    serverSnapshot
  )
  const limitedFilterSupport = useSyncExternalStore(
    subscribeToNothing,
    hasLimitedFilterSupport,
    serverSnapshot
  )

  return {
    useSimplifiedFilter: limitedFilterSupport || isReducedMotion,
    prefersReducedMotion: isReducedMotion,
  }
}
