import { FC, ReactNode } from 'react'
import { LiquidGlass } from '@creativoma/liquid-glass'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import {
  BoxIcon,
  CompassIcon,
  EyeIcon,
  FeatherIcon,
  ServerIcon,
  TypeIcon,
} from './Icons'

interface Feature {
  icon: ReactNode
  title: string
  description: string
  detail?: ReactNode
  wide?: boolean
}

const FEATURES: Feature[] = [
  {
    icon: <ServerIcon size={20} />,
    title: 'SSR-ready',
    description:
      'Renders on the server out of the box — Next.js App Router, pages router, Remix. The "use client" directive ships baked into every bundle and browser detection waits until after mount, so hydration always matches.',
    detail: (
      <code className="mt-4 block rounded-lg bg-black/40 px-3 py-2 font-mono text-[11px] text-(--color-cyan-glow)">
        renderToString(&lt;LiquidGlass /&gt;) → ✓
      </code>
    ),
    wide: true,
  },
  {
    icon: <TypeIcon size={20} />,
    title: 'TypeScript-first',
    description:
      'Fully typed props, polymorphic `as` element, and split type declarations for ESM and CJS consumers.',
  },
  {
    icon: <FeatherIcon size={20} />,
    title: 'Featherweight',
    description:
      'Around 1.4 kB gzipped, zero runtime dependencies. React is the only peer.',
  },
  {
    icon: <CompassIcon size={20} />,
    title: 'Safari & iOS fallback',
    description:
      'Detects limited SVG filter support and swaps to a simplified filter automatically — no broken glass on WebKit.',
  },
  {
    icon: <EyeIcon size={20} />,
    title: 'Reduced-motion aware',
    description:
      'Honors the OS-level prefers-reduced-motion setting by dropping to the lighter, GPU-friendly filter path.',
  },
  {
    icon: <BoxIcon size={20} />,
    title: 'Renders as anything',
    description:
      'div, button, nav, section — pass any element via the `as` prop and keep full HTML attributes.',
    detail: (
      <code className="mt-4 block rounded-lg bg-black/40 px-3 py-2 font-mono text-[11px] text-(--color-violet-bright)">
        &lt;LiquidGlass as="button" onClick={'{…}'} /&gt;
      </code>
    ),
    wide: true,
  },
]

const Features: FC = () => (
  <section
    id="features"
    className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-12"
  >
    <div className="bg-grid-faint pointer-events-none absolute inset-0 -z-10" />
    <SectionHeading
      eyebrow="Why this one"
      title={
        <>
          Everything a glass
          <br />
          component <span className="text-gradient-electric">should be.</span>
        </>
      }
      description="Not another backdrop-blur div. Real SVG turbulence and displacement mapping, wrapped in an API you can drop anywhere."
    />

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map(({ icon, title, description, detail, wide }, i) => (
        <Reveal
          key={title}
          delay={(i % 4) * 80}
          className={wide ? 'min-w-0 sm:col-span-2' : 'min-w-0'}
        >
          <LiquidGlass
            className="hover-lift h-full rounded-2xl border border-white/8 p-6"
            tintColor="rgba(255, 255, 255, 0.03)"
            backdropBlur={2}
            displacementScale={60}
          >
            <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl border border-(--color-electric-purple)/25 bg-(--color-electric-purple)/10 text-(--color-electric-purple)">
              {icon}
            </div>
            <h3 className="font-display mb-2 text-lg font-semibold text-white">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-white/55">
              {description}
            </p>
            {detail}
          </LiquidGlass>
        </Reveal>
      ))}
    </div>
  </section>
)

export default Features
