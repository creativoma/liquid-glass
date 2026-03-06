import { renderHook } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { useBrowserDetection } from './useBrowserDetection'

const setUserAgent = (ua: string) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: ua,
    configurable: true,
  })
}

describe('useBrowserDetection', () => {
  const originalUserAgent = window.navigator.userAgent

  afterEach(() => {
    setUserAgent(originalUserAgent)
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
  })
})
