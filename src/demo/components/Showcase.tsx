import { FC, ReactNode, useState } from 'react'
import { LiquidGlass } from '@creativoma/liquid-glass'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import CopyButton from './CopyButton'
import { CodeIcon, HeartIcon, PlayIcon, SkipIcon, StarIcon } from './Icons'

interface Demo {
  name: string
  background: string
  code: string
  render: ReactNode
}

const DEMOS: Demo[] = [
  {
    name: 'Button',
    background:
      'radial-gradient(circle at 30% 30%, #a855f7 0%, #4f46e5 45%, #0a0f1e 100%)',
    code: `<LiquidGlass
  as="button"
  backdropBlur={3}
  tintColor="rgba(255,255,255,0.12)"
  className="rounded-full px-8 py-3 font-semibold
             text-white hover:scale-105 transition-transform"
>
  Get started
</LiquidGlass>`,
    render: (
      <LiquidGlass
        as="button"
        backdropBlur={3}
        tintColor="rgba(255,255,255,0.12)"
        className="rounded-full px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
      >
        Get started
      </LiquidGlass>
    ),
  },
  {
    name: 'Profile card',
    background:
      'linear-gradient(135deg, #22d3ee 0%, #3b82f6 40%, #1e1b4b 100%)',
    code: `<LiquidGlass
  backdropBlur={6}
  tintColor="rgba(255,255,255,0.08)"
  className="rounded-2xl p-6 w-64"
>
  <img className="h-12 w-12 rounded-full" … />
  <h3>Mariano Álvarez</h3>
  <p>Frontend engineer</p>
</LiquidGlass>`,
    render: (
      <LiquidGlass
        backdropBlur={6}
        tintColor="rgba(255,255,255,0.08)"
        className="w-60 rounded-2xl p-5"
      >
        <div className="flex items-center gap-3">
          <span className="font-display grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-(--color-electric-purple) to-(--color-cyan-glow) text-sm font-bold text-white">
            MA
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Mariano Álvarez</p>
            <p className="text-xs text-white/60">Frontend engineer</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/70">
            React
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/70">
            TypeScript
          </span>
        </div>
      </LiquidGlass>
    ),
  },
  {
    name: 'Navbar',
    background:
      'linear-gradient(160deg, #8b5cf6 0%, #d946ef 50%, #1e1b4b 100%)',
    code: `<LiquidGlass
  as="nav"
  backdropBlur={5}
  tintColor="rgba(10,15,30,0.4)"
  className="rounded-full px-6 py-3"
  contentClassName="flex items-center gap-6"
>
  <span>Logo</span>
  <a href="#">Docs</a>
  <a href="#">Pricing</a>
</LiquidGlass>`,
    render: (
      <LiquidGlass
        as="nav"
        backdropBlur={5}
        tintColor="rgba(10,15,30,0.4)"
        className="rounded-full px-6 py-3"
        contentClassName="flex items-center gap-5"
      >
        <span className="font-display text-sm font-bold text-white">Logo</span>
        <span className="text-xs text-white/70">Docs</span>
        <span className="text-xs text-white/70">Pricing</span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
          Sign in
        </span>
      </LiquidGlass>
    ),
  },
  {
    name: 'Music player',
    background:
      'radial-gradient(circle at 70% 20%, #f472b6 0%, #a855f7 40%, #0f0a1e 100%)',
    code: `<LiquidGlass
  backdropBlur={8}
  tintColor="rgba(255,255,255,0.06)"
  displacementScale={100}
  className="rounded-3xl p-5 w-64"
>
  {/* artwork, title, controls */}
</LiquidGlass>`,
    render: (
      <LiquidGlass
        backdropBlur={8}
        tintColor="rgba(255,255,255,0.06)"
        displacementScale={100}
        className="w-64 rounded-3xl p-5"
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-pink-400 to-(--color-electric-purple) text-lg">
            ♪
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Liquid Dreams
            </p>
            <p className="text-xs text-white/60">Glassmorphism FM</p>
          </div>
        </div>
        <div className="mb-3 h-1 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-(--color-electric-purple) to-(--color-cyan-glow)" />
        </div>
        <div className="flex items-center justify-center gap-5 text-white/80">
          <SkipIcon size={14} className="rotate-180" />
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
            <PlayIcon size={14} />
          </span>
          <SkipIcon size={14} />
        </div>
      </LiquidGlass>
    ),
  },
  {
    name: 'Modal',
    background:
      'linear-gradient(200deg, #4f46e5 0%, #22d3ee 60%, #0a0f1e 100%)',
    code: `<LiquidGlass
  backdropBlur={10}
  tintColor="rgba(255,255,255,0.1)"
  className="rounded-2xl p-6 max-w-sm"
>
  <h3>Delete project?</h3>
  <p>This action cannot be undone.</p>
  <button>Cancel</button>
  <button>Delete</button>
</LiquidGlass>`,
    render: (
      <LiquidGlass
        backdropBlur={10}
        tintColor="rgba(255,255,255,0.1)"
        className="w-64 rounded-2xl p-5"
      >
        <h3 className="mb-1 text-sm font-semibold text-white">
          Delete project?
        </h3>
        <p className="mb-4 text-xs text-white/60">
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/80">
            Cancel
          </span>
          <span className="rounded-lg bg-red-500/80 px-3 py-1.5 text-xs font-medium text-white">
            Delete
          </span>
        </div>
      </LiquidGlass>
    ),
  },
  {
    name: 'Notification',
    background:
      'radial-gradient(circle at 20% 80%, #22d3ee 0%, #4f46e5 45%, #111827 100%)',
    code: `<LiquidGlass
  backdropBlur={4}
  tintColor="rgba(255,255,255,0.08)"
  turbulenceSeed={4}
  className="rounded-xl px-4 py-3"
>
  ⭐ New release is live!
</LiquidGlass>`,
    render: (
      <div className="flex flex-col gap-2">
        <LiquidGlass
          backdropBlur={4}
          tintColor="rgba(255,255,255,0.08)"
          turbulenceSeed={4}
          className="rounded-xl px-4 py-3"
          contentClassName="flex items-center gap-3"
        >
          <StarIcon size={16} className="shrink-0 text-yellow-300" />
          <div>
            <p className="text-xs font-semibold text-white">
              New release is live
            </p>
            <p className="text-[11px] text-white/60">v2 shipped just now</p>
          </div>
        </LiquidGlass>
        <LiquidGlass
          backdropBlur={4}
          tintColor="rgba(255,255,255,0.05)"
          turbulenceSeed={7}
          className="rounded-xl px-4 py-3"
          contentClassName="flex items-center gap-3"
        >
          <HeartIcon size={16} className="shrink-0 text-pink-400" />
          <div>
            <p className="text-xs font-semibold text-white">
              Someone starred the repo
            </p>
            <p className="text-[11px] text-white/60">2 minutes ago</p>
          </div>
        </LiquidGlass>
      </div>
    ),
  },
]

const DemoTile: FC<{ demo: Demo; index: number }> = ({ demo, index }) => {
  const [showCode, setShowCode] = useState(false)

  return (
    <Reveal delay={(index % 3) * 90}>
      <div className="group overflow-hidden rounded-2xl border border-white/8 bg-black/30">
        <div
          className="relative grid h-72 place-items-center overflow-hidden p-6"
          style={{ background: demo.background }}
        >
          {showCode ? (
            <div className="absolute inset-0 overflow-auto bg-black/80 p-4 backdrop-blur-sm">
              <pre className="font-mono text-[11px] leading-relaxed whitespace-pre text-white/80">
                {demo.code}
              </pre>
            </div>
          ) : (
            demo.render
          )}
        </div>
        <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5">
          <span className="font-mono text-xs text-white/50">{demo.name}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowCode((v) => !v)}
              aria-label={showCode ? 'Show preview' : 'Show code'}
              className={`rounded-lg p-2 transition-all hover:bg-white/10 ${
                showCode
                  ? 'text-(--color-cyan-glow)'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <CodeIcon size={14} />
            </button>
            <CopyButton text={demo.code} size={14} />
          </div>
        </div>
      </div>
    </Reveal>
  )
}

const Showcase: FC = () => (
  <section
    id="examples"
    className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-12"
  >
    <SectionHeading
      eyebrow="See it in action"
      title={
        <>
          One component,
          <br />
          <span className="text-gradient-electric">endless surfaces.</span>
        </>
      }
      description="Buttons, cards, navbars, modals — wrap anything. Toggle the code on any tile and copy it straight into your project."
    />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {DEMOS.map((demo, i) => (
        <DemoTile key={demo.name} demo={demo} index={i} />
      ))}
    </div>
  </section>
)

export default Showcase
