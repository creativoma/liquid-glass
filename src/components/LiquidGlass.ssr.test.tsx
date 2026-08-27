// @vitest-environment node
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import LiquidGlass from './LiquidGlass'

// Regression guard for SSR: rendering on the server (no window/document)
// must not throw and must produce the full-filter markup, which is also
// what the client renders first so hydration always matches.
describe('LiquidGlass server-side rendering', () => {
  it('renders to string without a DOM', () => {
    expect(typeof window).toBe('undefined')

    const html = renderToString(
      <LiquidGlass className="rounded-xl">
        <p>server rendered</p>
      </LiquidGlass>
    )

    expect(html).toContain('server rendered')
    expect(html).toContain('<filter')
    // Server must emit the full filter path (displacement map), never the
    // Safari fallback — browser detection only runs after mount
    expect(html).toContain('feDisplacementMap')
  })

  it('renders to string when disabled', () => {
    const html = renderToString(
      <LiquidGlass disabled>
        <p>plain content</p>
      </LiquidGlass>
    )

    expect(html).toContain('plain content')
    expect(html).not.toContain('<filter')
  })
})
