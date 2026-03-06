import { useEffect, useRef, useState } from 'react'
import { LiquidGlass } from '@creativoma/liquid-glass'
import imageBackground from '/background.jpg'
import pkg from '../package.json'

const INSTALL_CMD = 'npm install @creativoma/liquid-glass'
const VERSION = pkg.version

const BackgroundLayers = () => (
  <>
    <div className="fixed inset-0 -z-30 bg-(--color-void)" />
    <div className="bg-mesh fixed inset-0 -z-20 opacity-60" />
    <img
      src={imageBackground}
      alt=""
      className="fixed inset-0 -z-25 h-screen w-full object-cover opacity-20 mix-blend-luminosity"
    />
    <div
      className="blob fixed top-[20%] left-[10%] -z-15 h-125 w-125 bg-(--color-electric-purple)"
      style={{ animationDelay: '0s' }}
    />
    <div
      className="blob fixed top-[60%] right-[15%] -z-15 h-100 w-100 bg-(--color-electric-blue)"
      style={{ animationDelay: '5s' }}
    />
    <div
      className="blob fixed bottom-[10%] left-[50%] -z-15 h-87.5 w-87.5 bg-(--color-indigo-deep)"
      style={{ animationDelay: '10s' }}
    />
    <div className="noise-overlay fixed inset-0 -z-10" />
  </>
)

const App = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [blurValue, setBlurValue] = useState(12)
  const [opacityValue, setOpacityValue] = useState(5)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(INSTALL_CMD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tintColor = `rgba(255, 255, 255, ${(opacityValue / 100).toFixed(2)})`

  return (
    <div className="font-body relative min-h-screen overflow-hidden">
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      <BackgroundLayers />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-12 lg:py-16">
        {/* HERO */}
        <header className="mb-8 grid items-center gap-6 sm:mb-12 lg:mb-16 lg:grid-cols-2 lg:gap-12">
          <div className="animate-fade-scale-in opacity-0 delay-100">
            <div className="mb-4 inline-block rounded-full border border-(--color-electric-purple)/30 bg-black/40 px-3 py-1 text-[10px] font-medium tracking-wider text-(--color-electric-purple) backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-1.5 sm:text-xs">
              v{VERSION} MORPHISM EDITION
            </div>
            <h1 className="font-display mb-4 text-5xl leading-[0.95] font-bold tracking-tight sm:mb-6 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <span className="shimmer-text block">Liquid</span>
              <span className="text-gradient-electric block">Glass</span>
            </h1>
            <p className="mb-6 max-w-lg text-base leading-relaxed text-white/70 sm:mb-8 sm:text-lg lg:text-xl">
              React component with organic liquid frosted glass morphism. Fluid.
              Dynamic. Unforgettable.
            </p>
            <a
              href="https://github.com/creativoma/liquid-glass"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-all hover:border-(--color-electric-purple)/40 hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Star on GitHub
            </a>
          </div>

          <div className="animate-fade-scale-in relative opacity-0 delay-300">
            <LiquidGlass
              className="animate-liquid-float rounded-2xl p-6 sm:rounded-3xl sm:p-8"
              tintColor="rgba(255, 255, 255, 0.04)"
              backdropBlur={3}
            >
              <div className="mb-3 text-xs font-medium tracking-wider text-(--color-electric-purple) uppercase sm:mb-4 sm:text-sm">
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

        {/* INTERACTIVE DEMO */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <LiquidGlass
            className="h-full rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
            backdropBlur={3}
            tintColor="rgba(255, 255, 255, 0.04)"
          >
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Controls */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-(--color-electric-purple)/20 bg-black/30 px-2.5 py-0.5 text-[10px] font-medium text-(--color-electric-purple) sm:mb-6 sm:px-3 sm:py-1 sm:text-xs">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--color-electric-purple) sm:h-2 sm:w-2" />
                  LIVE DEMO
                </div>
                <h2 className="font-display mb-3 text-3xl font-medium text-white sm:mb-4 sm:text-4xl lg:text-5xl">
                  Try It Live
                </h2>
                <p className="mb-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                  Adjust the props and watch the glass react in real-time.
                </p>

                <div className="mb-5">
                  <div className="mb-2 flex justify-between text-xs text-white/60">
                    <span className="font-mono">backdropBlur</span>
                    <span className="font-mono text-(--color-electric-purple)">
                      {blurValue}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={blurValue}
                    onChange={(e) => setBlurValue(Number(e.target.value))}
                    className="slider w-full"
                  />
                </div>

                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-xs text-white/60">
                    <span className="font-mono">tintColor opacity</span>
                    <span className="font-mono text-(--color-electric-purple)">
                      {opacityValue}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    value={opacityValue}
                    onChange={(e) => setOpacityValue(Number(e.target.value))}
                    className="slider w-full"
                  />
                </div>

                <code className="block rounded-lg bg-black/40 p-3 font-mono text-xs leading-relaxed text-white/70">
                  <span className="text-(--color-cyan-glow)">
                    {'<LiquidGlass'}
                  </span>
                  {'\n  '}
                  <span className="text-(--color-violet-bright)">
                    backdropBlur
                  </span>
                  <span className="text-white/40">={`{`}</span>
                  <span className="text-(--color-electric-purple)">
                    {blurValue}
                  </span>
                  <span className="text-white/40">{`}`}</span>
                  {'\n  '}
                  <span className="text-(--color-violet-bright)">
                    tintColor
                  </span>
                  <span className="text-white/40">="</span>
                  <span className="text-green-400">
                    rgba(255,255,255,{(opacityValue / 100).toFixed(2)})
                  </span>
                  <span className="text-white/40">"</span>
                  {'\n'}
                  <span className="text-(--color-cyan-glow)">{'>'}</span>
                </code>
              </div>

              {/* Live preview */}
              <div className="flex items-center justify-center">
                <LiquidGlass
                  className="w-full rounded-2xl p-10"
                  backdropBlur={blurValue}
                  tintColor={tintColor}
                >
                  <div className="text-center">
                    <div className="mb-3 text-4xl text-white/80">✦</div>
                    <h3 className="mb-2 text-base font-medium tracking-wide text-white/90">
                      Glass Preview
                    </h3>
                    <p className="text-sm text-white/50">
                      blur: {blurValue}px · opacity: {opacityValue}%
                    </p>
                  </div>
                </LiquidGlass>
              </div>
            </div>
          </LiquidGlass>
        </section>

        {/* PROPS REFERENCE */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <LiquidGlass
            className="rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
            backdropBlur={3}
            tintColor="rgba(255, 255, 255, 0.04)"
          >
            <div className="mb-3 text-xs font-medium tracking-wider text-(--color-electric-purple) uppercase sm:text-sm">
              API
            </div>
            <h2 className="font-display mb-6 text-2xl font-medium text-white sm:mb-8 sm:text-3xl">
              Props Reference
            </h2>
            <div className="space-y-2">
              {[
                {
                  prop: 'backdropBlur',
                  type: 'number',
                  default: '12',
                  description: 'Blur intensity of the glass effect',
                },
                {
                  prop: 'tintColor',
                  type: 'string',
                  default: 'rgba(255,255,255,0.05)',
                  description: 'RGBA tint color overlaid on the glass',
                },
                {
                  prop: 'className',
                  type: 'string',
                  default: '—',
                  description: 'Additional CSS classes for the wrapper',
                },
                {
                  prop: 'children',
                  type: 'ReactNode',
                  default: '—',
                  description: 'Content rendered inside the glass',
                },
              ].map(({ prop, type, default: def, description }) => (
                <div
                  key={prop}
                  className="flex flex-wrap items-start gap-x-4 gap-y-1 rounded-xl bg-black/20 px-4 py-3 sm:flex-nowrap sm:items-center"
                >
                  <code className="w-full shrink-0 text-sm font-bold text-(--color-cyan-glow) sm:w-36">
                    {prop}
                  </code>
                  <span className="shrink-0 rounded-md bg-(--color-electric-purple)/10 px-2 py-0.5 text-xs text-(--color-violet-bright)">
                    {type}
                  </span>
                  <code className="shrink-0 text-xs text-white/40">{def}</code>
                  <span className="text-sm text-white/60 sm:ml-auto">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </LiquidGlass>
        </section>

        {/* FOOTER */}
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
              className="transition-colors hover:text-(--color-electric-purple)"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://www.npmjs.com/package/@creativoma/liquid-glass"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-(--color-electric-purple)"
            >
              npm
            </a>
            <span>•</span>
            <a
              href="https://creativoma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-(--color-electric-purple)"
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
