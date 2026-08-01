import { useState } from 'react'

// RegExp patterns hoisted to module level for performance
const IOS_REGEX = /iPad|iPhone|iPod/
const SAFARI_REGEX = /^((?!chrome|android).)*safari/i

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
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Custom hook for detecting browser capabilities
 * Returns whether a simplified filter should be used for Safari/iOS
 * or when the user has requested reduced motion
 */
export const useBrowserDetection = () => {
  // Detect filter support immediately during render to avoid hydration mismatch
  // This runs once on client-side, returns false on server-side
  const [isReducedMotion] = useState(prefersReducedMotion)
  const [useSimplifiedFilter] = useState(
    () => hasLimitedFilterSupport() || isReducedMotion
  )

  return { useSimplifiedFilter, prefersReducedMotion: isReducedMotion }
}
