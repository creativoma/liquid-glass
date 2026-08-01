import { renderHook } from '@testing-library/react'
import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { useBrowserDetection } from './useBrowserDetection'

const setUserAgent = (ua: string) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: ua,
    configurable: true,
  })
}

const setPrefersReducedMotion = (matches: boolean) => {
  window.matchMedia = ((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
}

describe('useBrowserDetection', () => {
  const originalUserAgent = window.navigator.userAgent
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    setPrefersReducedMotion(false)
  })

  afterEach(() => {
    setUserAgent(originalUserAgent)
    window.matchMedia = originalMatchMedia
  })

  describe('useSimplifiedFilter', () => {
    it('returns false for Chrome on desktop', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      )
      const { result } = renderHook(() => useBrowserDetection())
      expect(result.current.useSimplifiedFilter).toBe(false)
    })

    it('returns false for Firefox', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/120.0'
      )
      const { result } = renderHook(() => useBrowserDetection())
      expect(result.current.useSimplifiedFilter).toBe(false)
    })

    it('returns false for Edge', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
      )
      const { result } = renderHook(() => useBrowserDetection())
      expect(result.current.useSimplifiedFilter).toBe(false)
    })

    it('returns true for Safari on macOS', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15'
      )
      const { result } = renderHook(() => useBrowserDetection())
      expect(result.current.useSimplifiedFilter).toBe(true)
    })

    it('returns true for iPhone', () => {
      setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
      )
      const { result } = renderHook(() => useBrowserDetection())
      expect(result.current.useSimplifiedFilter).toBe(true)
    })

    it('returns true for iPad', () => {
      setUserAgent(
        'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
      )
      const { result } = renderHook(() => useBrowserDetection())
      expect(result.current.useSimplifiedFilter).toBe(true)
    })

    it('returns true for iPod', () => {
      setUserAgent(
        'Mozilla/5.0 (iPod touch; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
      )
      const { result } = renderHook(() => useBrowserDetection())
      expect(result.current.useSimplifiedFilter).toBe(true)
    })

    it('returns stable value across re-renders', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
      )
      const { result, rerender } = renderHook(() => useBrowserDetection())
      const first = result.current.useSimplifiedFilter
      rerender()
      expect(result.current.useSimplifiedFilter).toBe(first)
    })

    it('returns true for Chrome when prefers-reduced-motion is set', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
      )
      setPrefersReducedMotion(true)
      const { result } = renderHook(() => useBrowserDetection())
      expect(result.current.useSimplifiedFilter).toBe(true)
    })
  })

  describe('prefersReducedMotion', () => {
    it('returns false when the OS has no reduced motion preference', () => {
      const { result } = renderHook(() => useBrowserDetection())
      expect(result.current.prefersReducedMotion).toBe(false)
    })

    it('returns true when the OS prefers reduced motion', () => {
      setPrefersReducedMotion(true)
      const { result } = renderHook(() => useBrowserDetection())
      expect(result.current.prefersReducedMotion).toBe(true)
    })
  })
})
