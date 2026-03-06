import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LiquidGlass from './LiquidGlass'

// Mock browser detection to always return the full filter by default
vi.mock('../hooks/useBrowserDetection', () => ({
  useBrowserDetection: () => ({ useSimplifiedFilter: false }),
}))

/**
 * Component renders a Fragment: [<svg/>, <Wrapper>...]
 * container.children[0] = svg (display:none)
 * container.children[1] = wrapper element (div by default)
 *   wrapper.children[0] = backdrop layer
 *   wrapper.children[1] = tint layer
 *   wrapper.children[2] = content layer
 */
const getWrapper = (container: HTMLElement) =>
  container.children[1] as HTMLElement
const getLayers = (container: HTMLElement) => {
  const wrapper = getWrapper(container)
  return {
    backdrop: wrapper.children[0] as HTMLElement,
    tint: wrapper.children[1] as HTMLElement,
    content: wrapper.children[2] as HTMLElement,
  }
}

describe('LiquidGlass', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<LiquidGlass>Hello world</LiquidGlass>)
      expect(screen.getByText('Hello world')).toBeInTheDocument()
    })

    it('renders as div by default', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      expect(getWrapper(container).nodeName).toBe('DIV')
    })

    it('renders as custom element with as prop', () => {
      const { container } = render(
        <LiquidGlass as="section">content</LiquidGlass>
      )
      expect(getWrapper(container).nodeName).toBe('SECTION')
    })

    it('renders as button', () => {
      const { container } = render(
        <LiquidGlass as="button">click me</LiquidGlass>
      )
      expect(getWrapper(container).nodeName).toBe('BUTTON')
    })

    it('renders exactly 3 internal layers', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      expect(getWrapper(container).children).toHaveLength(3)
    })

    it('renders SVG filter element', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      expect(container.querySelector('svg')).toBeInTheDocument()
      expect(container.querySelector('filter')).toBeInTheDocument()
    })

    it('renders feTurbulence in filter', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      expect(container.querySelector('feTurbulence')).toBeInTheDocument()
    })

    it('SVG is hidden', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      const svg = container.querySelector('svg') as SVGElement
      expect(svg.style.display).toBe('none')
    })
  })

  describe('wrapper styles', () => {
    it('applies position relative', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      expect(getWrapper(container).style.position).toBe('relative')
    })

    it('applies overflow hidden', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      expect(getWrapper(container).style.overflow).toBe('hidden')
    })

    it('applies box shadow by default', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      expect(getWrapper(container).style.boxShadow).toBeTruthy()
    })

    it('applies className to wrapper', () => {
      const { container } = render(
        <LiquidGlass className="custom-class rounded-2xl">content</LiquidGlass>
      )
      expect(getWrapper(container)).toHaveClass('rounded-2xl')
      expect(getWrapper(container)).toHaveClass('custom-class')
    })

    it('applies custom style prop merged with defaults', () => {
      const { container } = render(
        <LiquidGlass style={{ borderRadius: '16px' }}>content</LiquidGlass>
      )
      expect(getWrapper(container).style.borderRadius).toBe('16px')
      // Defaults still present
      expect(getWrapper(container).style.position).toBe('relative')
    })
  })

  describe('props', () => {
    it('passes through HTML attributes', () => {
      render(<LiquidGlass data-testid="glass-box">content</LiquidGlass>)
      expect(screen.getByTestId('glass-box')).toBeInTheDocument()
    })

    it('passes through aria attributes', () => {
      render(<LiquidGlass aria-label="glass container">content</LiquidGlass>)
      expect(
        screen.getByRole('generic', { name: 'glass container' })
      ).toBeInTheDocument()
    })

    it('applies tintColor to tint layer', () => {
      const { container } = render(
        <LiquidGlass tintColor="rgba(0, 0, 255, 0.5)">content</LiquidGlass>
      )
      const { tint } = getLayers(container)
      expect(tint.style.background).toBe('rgba(0, 0, 255, 0.5)')
    })

    it('applies backdropBlur in the inline style markup', () => {
      const { container } = render(
        <LiquidGlass backdropBlur={10}>content</LiquidGlass>
      )
      // jsdom may not parse backdrop-filter, so check the rendered HTML string
      expect(container.innerHTML).toContain('blur(10px)')
    })

    it('generates unique filter id per instance', () => {
      const { container: c1 } = render(<LiquidGlass>first</LiquidGlass>)
      const { container: c2 } = render(<LiquidGlass>second</LiquidGlass>)
      const filter1 = c1.querySelector('filter')?.id
      const filter2 = c2.querySelector('filter')?.id
      expect(filter1).not.toBe(filter2)
    })

    it('filter id contains "liquid-glass" prefix', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      expect(container.querySelector('filter')?.id).toMatch(/^liquid-glass-/)
    })

    it('sets displacementScale on feDisplacementMap', () => {
      const { container } = render(
        <LiquidGlass displacementScale={200}>content</LiquidGlass>
      )
      expect(
        container.querySelector('feDisplacementMap')?.getAttribute('scale')
      ).toBe('200')
    })

    it('sets turbulenceBaseFrequency on feTurbulence', () => {
      const { container } = render(
        <LiquidGlass turbulenceBaseFrequency="0.05 0.05">content</LiquidGlass>
      )
      expect(
        container.querySelector('feTurbulence')?.getAttribute('baseFrequency')
      ).toBe('0.05 0.05')
    })

    it('sets turbulenceSeed on feTurbulence', () => {
      const { container } = render(
        <LiquidGlass turbulenceSeed={7}>content</LiquidGlass>
      )
      expect(
        container.querySelector('feTurbulence')?.getAttribute('seed')
      ).toBe('7')
    })
  })

  describe('default prop values', () => {
    it('uses default backdropBlur of 2px', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      expect(container.innerHTML).toContain('blur(2px)')
    })

    it('uses default tintColor (semi-transparent white)', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      const { tint } = getLayers(container)
      expect(tint.style.background).toContain('rgba')
    })

    it('uses default displacementScale of 150', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      expect(
        container.querySelector('feDisplacementMap')?.getAttribute('scale')
      ).toBe('150')
    })
  })

  describe('simplified filter (Safari)', () => {
    beforeEach(() => {
      vi.resetModules()
    })

    it('renders feBlend instead of feDisplacementMap in simplified filter', async () => {
      vi.doMock('../hooks/useBrowserDetection', () => ({
        useBrowserDetection: () => ({ useSimplifiedFilter: true }),
      }))
      const { default: LiquidGlassSafari } = await import('./LiquidGlass')
      const { container } = render(
        <LiquidGlassSafari>content</LiquidGlassSafari>
      )
      expect(container.querySelector('feBlend')).toBeInTheDocument()
      expect(
        container.querySelector('feDisplacementMap')
      ).not.toBeInTheDocument()
    })

    it('simplified filter has extended bounds (x=-20%)', async () => {
      vi.doMock('../hooks/useBrowserDetection', () => ({
        useBrowserDetection: () => ({ useSimplifiedFilter: true }),
      }))
      const { default: LiquidGlassSafari } = await import('./LiquidGlass')
      const { container } = render(
        <LiquidGlassSafari>content</LiquidGlassSafari>
      )
      expect(container.querySelector('filter')?.getAttribute('x')).toBe('-20%')
    })

    it('applies translateZ(0) on backdrop in simplified mode', async () => {
      vi.doMock('../hooks/useBrowserDetection', () => ({
        useBrowserDetection: () => ({ useSimplifiedFilter: true }),
      }))
      const { default: LiquidGlassSafari } = await import('./LiquidGlass')
      const { container } = render(
        <LiquidGlassSafari>content</LiquidGlassSafari>
      )
      const { backdrop } = getLayers(container)
      expect(backdrop.style.transform).toBe('translateZ(0)')
    })
  })

  describe('layer structure', () => {
    it('backdrop layer has isolation isolate', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      const { backdrop } = getLayers(container)
      expect(backdrop.style.isolation).toBe('isolate')
    })

    it('backdrop layer has zIndex 0', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      const { backdrop } = getLayers(container)
      expect(backdrop.style.zIndex).toBe('0')
    })

    it('tint layer has zIndex 1', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      const { tint } = getLayers(container)
      expect(tint.style.zIndex).toBe('1')
    })

    it('content layer has zIndex 2', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      const { content } = getLayers(container)
      expect(content.style.zIndex).toBe('2')
    })

    it('all inner layers are positioned absolute except content', () => {
      const { container } = render(<LiquidGlass>content</LiquidGlass>)
      const { backdrop, tint, content } = getLayers(container)
      expect(backdrop.style.position).toBe('absolute')
      expect(tint.style.position).toBe('absolute')
      expect(content.style.position).toBe('relative')
    })
  })
})
