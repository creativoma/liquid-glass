import { FC } from 'react'
import { LiquidGlass } from '@creativoma/liquid-glass'
import { LINKS, VERSION } from '../lib'
import { useStats } from '../hooks/useStats'
import { DropletIcon, GithubIcon, StarIcon } from './Icons'

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'Examples', href: '#examples' },
  { label: 'Playground', href: '#playground' },
  { label: 'Props', href: '#props' },
]

const Navbar: FC = () => {
  const { stars } = useStats()

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <LiquidGlass
        as="nav"
        className="mx-auto max-w-5xl rounded-2xl border border-white/10 px-4 py-2.5 sm:px-5"
        contentClassName="flex items-center justify-between"
        backdropBlur={8}
        tintColor="rgba(10, 15, 30, 0.55)"
        displacementScale={40}
      >
        <a href="#top" className="flex items-center gap-2 text-white">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-(--color-electric-purple) to-(--color-cyan-glow) text-white">
            <DropletIcon size={15} />
          </span>
          <span className="font-display text-sm font-medium tracking-tight sm:text-base">
            Liquid Glass
          </span>
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/50 sm:inline-block">
            v{VERSION}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-(--color-electric-purple)/40 hover:bg-white/10 hover:text-white sm:text-sm"
          >
            <GithubIcon size={15} />
            <span className="hidden sm:inline">GitHub</span>
            {stars !== null && (
              <span className="inline-flex items-center gap-1 border-l border-white/10 pl-2 font-mono text-[11px] text-white/50">
                <StarIcon size={11} className="text-yellow-400/80" />
                {stars}
              </span>
            )}
          </a>
        </div>
      </LiquidGlass>
    </div>
  )
}

export default Navbar
