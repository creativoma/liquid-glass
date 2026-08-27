import { FC } from 'react'
import { LiquidGlass } from '@creativoma/liquid-glass'
import { INSTALL_COMMANDS, LINKS, VERSION } from '../lib'
import Reveal from './Reveal'
import CopyButton from './CopyButton'
import { DropletIcon, GithubIcon, HeartIcon } from './Icons'

const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: 'GitHub', href: LINKS.github },
  { label: 'npm', href: LINKS.npm },
  { label: 'Changelog', href: LINKS.changelog },
  { label: 'MIT License', href: LINKS.license },
]

const Footer: FC = () => (
  <footer className="relative mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24 lg:px-12">
    {/* Big closing CTA */}
    <Reveal className="mb-20 text-center sm:mb-28">
      <h2 className="font-display mx-auto mb-6 max-w-3xl text-5xl leading-[0.98] font-medium tracking-tight sm:text-6xl lg:text-7xl">
        <span className="block text-white">Build something</span>
        <span className="text-gradient-electric block">worth staring at.</span>
      </h2>
      <p className="mx-auto mb-8 max-w-md text-base text-white/55 sm:text-lg">
        Free, MIT, tiny. The glass is one install away.
      </p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <LiquidGlass
          className="rounded-full py-1 pr-1 pl-5"
          contentClassName="flex items-center gap-2"
          tintColor="rgba(255, 255, 255, 0.05)"
          backdropBlur={3}
        >
          <code className="font-mono text-xs text-white/80 sm:text-sm">
            {INSTALL_COMMANDS.npm}
          </code>
          <CopyButton text={INSTALL_COMMANDS.npm} size={15} />
        </LiquidGlass>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-(--color-electric-purple) to-(--color-indigo-deep) px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(168,85,247,0.55)]"
        >
          <GithubIcon size={16} />
          Star on GitHub
        </a>
      </div>
    </Reveal>

    <div className="hairline mb-10" />

    <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
      <div>
        <a
          href="#top"
          className="mb-3 flex items-center justify-center gap-2 text-white sm:justify-start"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-(--color-electric-purple) to-(--color-cyan-glow)">
            <DropletIcon size={15} />
          </span>
          <span className="font-display text-base font-medium">
            Liquid Glass
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/50">
            v{VERSION}
          </span>
        </a>
        <p className="max-w-xs text-center text-xs leading-relaxed text-white/40 sm:text-left">
          I maintain this lab in my own time. If it saved you an afternoon, you
          can sponsor the maintenance.
        </p>
        <a
          href={LINKS.sponsor}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 transition-all hover:border-(--color-electric-purple)/40 hover:bg-white/10 hover:text-white"
        >
          <HeartIcon size={13} className="text-(--color-electric-purple)" />
          Sponsor
        </a>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
        {FOOTER_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-(--color-electric-purple)"
          >
            {label}
          </a>
        ))}
      </nav>
    </div>

    <p className="mt-12 text-center text-xs text-white/30">
      MIT ©{' '}
      <a
        href={LINKS.author}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-(--color-electric-purple)"
      >
        Mariano Álvarez
      </a>{' '}
      — built with its own component. Every glass surface on this page is{' '}
      <code className="font-mono text-white/40">&lt;LiquidGlass /&gt;</code>.
    </p>
  </footer>
)

export default Footer
