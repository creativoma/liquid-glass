import { FC, ReactNode } from 'react'
import { LiquidGlass } from '@creativoma/liquid-glass'
import { INSTALL_COMMANDS, LINKS, VERSION } from '../lib'
import { useStats } from '../hooks/useStats'
import CopyButton from './CopyButton'
import {
  ArrowRightIcon,
  DownloadIcon,
  FeatherIcon,
  GithubIcon,
  ServerIcon,
  StarIcon,
} from './Icons'

const CODE_LINES = [
  {
    parts: [
      { text: 'import', cls: 'text-(--color-electric-purple)' },
      { text: ' { ', cls: 'text-white/40' },
      { text: 'LiquidGlass', cls: 'text-(--color-cyan-glow)' },
      { text: ' } ', cls: 'text-white/40' },
      { text: 'from', cls: 'text-(--color-electric-purple)' },
      { text: " '@creativoma/liquid-glass'", cls: 'text-green-400/90' },
    ],
  },
  { parts: [{ text: '', cls: '' }] },
  {
    parts: [
      { text: '<', cls: 'text-white/40' },
      { text: 'LiquidGlass', cls: 'text-(--color-cyan-glow)' },
    ],
  },
  {
    parts: [
      { text: '  backdropBlur', cls: 'text-(--color-violet-bright)' },
      { text: '={', cls: 'text-white/40' },
      { text: '4', cls: 'text-orange-300' },
      { text: '}', cls: 'text-white/40' },
    ],
  },
  {
    parts: [
      { text: '  tintColor', cls: 'text-(--color-violet-bright)' },
      { text: '=', cls: 'text-white/40' },
      { text: '"rgba(255,255,255,0.1)"', cls: 'text-green-400/90' },
    ],
  },
  {
    parts: [
      { text: '  className', cls: 'text-(--color-violet-bright)' },
      { text: '=', cls: 'text-white/40' },
      { text: '"rounded-2xl p-8"', cls: 'text-green-400/90' },
    ],
  },
  {
    parts: [
      { text: '>', cls: 'text-white/40' },
      { text: ' …anything ', cls: 'text-white/70' },
      { text: '</', cls: 'text-white/40' },
      { text: 'LiquidGlass', cls: 'text-(--color-cyan-glow)' },
      { text: '>', cls: 'text-white/40' },
    ],
  },
]

const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : `${n}`

const Hero: FC = () => {
  const { weeklyDownloads, stars } = useStats()

  const statChips = [
    weeklyDownloads !== null && {
      icon: <DownloadIcon size={13} />,
      label: `${formatCount(weeklyDownloads)} downloads/week`,
    },
    stars !== null && {
      icon: <StarIcon size={13} />,
      label: `${formatCount(stars)} stars`,
    },
    { icon: <FeatherIcon size={13} />, label: '~1.4 kB gzipped' },
    { icon: <ServerIcon size={13} />, label: 'SSR-ready' },
  ].filter(Boolean) as { icon: ReactNode; label: string }[]

  return (
    <header
      id="top"
      className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-36 pb-20 sm:px-6 sm:pt-44 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-12 lg:pb-28"
    >
      <div className="animate-fade-scale-in min-w-0 opacity-0 delay-100">
        <a
          href={LINKS.changelog}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-(--color-electric-purple)/30 bg-black/40 px-4 py-1.5 text-xs font-medium tracking-wider text-(--color-electric-purple) backdrop-blur-sm transition-colors hover:border-(--color-electric-purple)/60"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--color-cyan-glow)" />
          v{VERSION} — now SSR-ready
          <ArrowRightIcon size={12} />
        </a>

        <h1 className="font-display mb-6 text-6xl leading-[0.95] font-medium tracking-tight sm:text-7xl lg:text-8xl">
          <span className="block text-white">Glass that</span>
          <span className="text-gradient-electric block">flows like</span>
          <span className="shimmer-text block">liquid.</span>
        </h1>

        <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/65 sm:text-xl">
          A single React component that wraps anything in organic, frosted
          liquid glass. SVG displacement, backdrop blur, zero dependencies — and
          it renders on the server.
        </p>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          <a
            href="#examples"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-(--color-electric-purple) to-(--color-indigo-deep) px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(168,85,247,0.55)]"
          >
            See it in action
            <ArrowRightIcon
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition-all hover:border-(--color-electric-purple)/40 hover:bg-white/10 hover:text-white"
          >
            <GithubIcon size={16} />
            Star on GitHub
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          {statChips.map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-3 py-1.5 font-mono text-[11px] text-white/50"
            >
              <span className="text-(--color-cyan-glow)">{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="animate-fade-scale-in relative min-w-0 opacity-0 delay-300">
        {/* floating accent chips around the code card */}
        <div className="absolute -top-4 right-8 z-10 hidden rounded-full border border-(--color-cyan-glow)/25 bg-[#0c1428]/90 px-4 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] lg:block">
          <span className="font-mono text-xs text-(--color-cyan-glow)">
            "use client" ✓
          </span>
        </div>
        <div className="absolute -bottom-4 left-8 z-10 hidden rounded-full border border-(--color-electric-purple)/25 bg-[#140f28]/90 px-4 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] lg:block">
          <span className="font-mono text-xs text-(--color-violet-bright)">
            0 dependencies
          </span>
        </div>

        <LiquidGlass
          className="animate-liquid-float rounded-3xl p-1"
          tintColor="rgba(255, 255, 255, 0.04)"
          backdropBlur={3}
        >
          <div className="rounded-[1.4rem] bg-black/50 p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-white/30">
                App.tsx
              </span>
            </div>

            <pre className="overflow-x-auto font-mono text-[12px] leading-[1.75] sm:text-[13px]">
              {CODE_LINES.map((line, i) => (
                <div key={i}>
                  {line.parts.map((part, j) => (
                    <span key={j} className={part.cls}>
                      {part.text}
                    </span>
                  ))}
                  {line.parts.length === 1 && !line.parts[0].text && ' '}
                </div>
              ))}
            </pre>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/8 bg-white/4 py-1 pr-1 pl-4">
              <code className="overflow-x-auto font-mono text-[11px] whitespace-nowrap text-white/70 sm:text-xs">
                {INSTALL_COMMANDS.npm}
              </code>
              <CopyButton text={INSTALL_COMMANDS.npm} size={15} />
            </div>
          </div>
        </LiquidGlass>
      </div>
    </header>
  )
}

export default Hero
