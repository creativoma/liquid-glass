import { useEffect, useRef, useState } from 'react'
import LiquidGlass from './components/LiquidGlass'
import imageBackground from '/background.jpg'

const INSTALL_CMD = 'npm install @creativoma/liquid-glass'

// Static background elements - hoisted to avoid recreation on each render
const BackgroundLayers = () => (
  <>
    <div className="fixed inset-0 -z-30 bg-[var(--color-void)]" />
    <div className="bg-mesh fixed inset-0 -z-20 opacity-60" />
    <img
      src={imageBackground}
      alt=""
      className="fixed inset-0 -z-25 h-screen w-full object-cover opacity-20 mix-blend-luminosity"
    />
    <div
      className="blob fixed top-[20%] left-[10%] -z-15 h-[500px] w-[500px] bg-[var(--color-electric-purple)]"
      style={{ animationDelay: '0s' }}
    />
    <div
      className="blob fixed top-[60%] right-[15%] -z-15 h-[400px] w-[400px] bg-[var(--color-electric-blue)]"
      style={{ animationDelay: '5s' }}
    />
    <div
      className="blob fixed bottom-[10%] left-[50%] -z-15 h-[350px] w-[350px] bg-[var(--color-indigo-deep)]"
      style={{ animationDelay: '10s' }}
    />
    <div className="noise-overlay fixed inset-0 -z-10" />
  </>
)

const App = () => {
  // Use ref for cursor position to avoid re-renders on every mouse move
  const cursorRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    // Use passive listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(INSTALL_CMD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="font-body relative min-h-screen overflow-hidden">
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      <BackgroundLayers />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-12 lg:py-16">
        <header className="mb-8 grid items-center gap-6 sm:mb-16 sm:gap-8 lg:mb-24 lg:grid-cols-2 lg:gap-12">
          <div className="animate-fade-scale-in opacity-0 delay-100">
            <div className="mb-4 inline-block rounded-full border border-[var(--color-electric-purple)]/30 bg-black/40 px-3 py-1 text-[10px] font-medium tracking-wider text-[var(--color-electric-purple)] backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-1.5 sm:text-xs">
              v1.0 MORPHISM EDITION
            </div>
            <h1 className="font-display mb-4 text-5xl leading-[0.95] font-bold tracking-tight sm:mb-6 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <span className="shimmer-text block">Liquid</span>
              <span className="text-gradient-electric block">Glass</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
              React component with organic liquid frosted glass morphism. Fluid.
              Dynamic. Unforgettable.
            </p>
          </div>

          <div className="animate-fade-scale-in animate-liquid-float relative opacity-0 delay-300">
            <LiquidGlass
              className="rounded-2xl p-6 sm:rounded-3xl sm:p-8"
              tintColor="rgba(255, 255, 255, 0.03)"
              backdropBlur={4}
            >
              <div className="mb-3 text-xs font-medium tracking-wider text-[var(--color-electric-purple)] uppercase sm:mb-4 sm:text-sm">
                Installation
              </div>
              <div className="relative">
                <code className="block rounded-lg bg-black/40 p-3 pr-10 font-mono text-xs text-white/90 sm:rounded-xl sm:p-4 sm:pr-12 sm:text-xs">
                  {INSTALL_CMD}
                </code>
                <button
                  onClick={handleCopyInstall}
                  className={`absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-1.5 transition-all hover:scale-90 hover:bg-white/10 active:scale-75 sm:right-3 sm:p-2 ${
                    copied ? 'text-green-400' : 'text-white/60 hover:text-white'
                  }`}
                  aria-label="Copy install command"
                >
                  {copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            </LiquidGlass>
          </div>
        </header>

        <section className="mb-8 sm:mb-12 lg:mb-16">
          <LiquidGlass
            className="h-full rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
            backdropBlur={3}
            tintColor="rgba(255, 255, 255, 0.04)"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-electric-purple)]/20 bg-black/30 px-2.5 py-0.5 text-[10px] font-medium text-[var(--color-electric-purple)] sm:mb-6 sm:px-3 sm:py-1 sm:text-xs">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-electric-purple)] sm:h-2 sm:w-2" />
                  LIVE DEMO
                </div>
                <h2 className="font-display mb-3 text-3xl font-bold text-white sm:mb-4 sm:text-4xl lg:text-5xl">
                  Organic Liquid Effects
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                  Powered by SVG filters that create genuine liquid glass
                  distortion. Watch the fluid morph and flow in real-time.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-4">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[var(--color-electric-purple)] to-[var(--color-cyan-glow)]" />
                </div>
                <span className="font-mono text-xs text-white/60 sm:text-sm">
                  75% fluid
                </span>
              </div>
            </div>
          </LiquidGlass>
        </section>

        <footer className="animate-fade-scale-in text-center opacity-0 delay-1000">
          <LiquidGlass
            className="mx-auto inline-block rounded-xl px-6 py-3 sm:rounded-2xl sm:px-8 sm:py-4"
            tintColor="rgba(255, 255, 255, 0.03)"
            backdropBlur={2}
          >
            <p className="text-sm font-medium text-white/80 sm:text-base">
              Crafted with liquid energy by{' '}
              <span className="text-gradient-electric font-bold">
                @creativoma
              </span>
            </p>
          </LiquidGlass>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/40 sm:mt-8 sm:gap-6 sm:text-sm">
            <a
              href="https://github.com/creativoma/liquid-glass"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-electric-purple)]"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://www.npmjs.com/package/@creativoma/liquid-glass"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-electric-purple)]"
            >
              npm
            </a>
            <span>•</span>
            <a
              href="https://creativoma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-electric-purple)]"
            >
              creativoma.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
