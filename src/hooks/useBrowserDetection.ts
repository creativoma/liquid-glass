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
 * Custom hook for detecting browser capabilities
 * Returns whether a simplified filter should be used for Safari/iOS
 */
export const useBrowserDetection = () => {
  // Detect filter support immediately during render to avoid hydration mismatch
  // This runs once on client-side, returns false on server-side
  const [useSimplifiedFilter] = useState(() => hasLimitedFilterSupport())

  return { useSimplifiedFilter }
}
