import { FC, useState } from 'react'
import { LiquidGlass } from '@creativoma/liquid-glass'
import { INSTALL_COMMANDS, PackageManager } from '../lib'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import CopyButton from './CopyButton'

const USAGE_SNIPPET = `import { LiquidGlass } from '@creativoma/liquid-glass'

export const Card = () => (
  <LiquidGlass backdropBlur={4} className="rounded-2xl p-8">
    <h2>It just works</h2>
  </LiquidGlass>
)`

const Install: FC = () => {
  const [manager, setManager] = useState<PackageManager>('npm')

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-12">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <SectionHeading
          eyebrow="Get started"
          title={
            <>
              In your app in
              <br />
              <span className="text-gradient-electric">ten seconds.</span>
            </>
          }
          description="One install, one import. No config, no CSS file to include, no provider to wrap. Works with React 18 and 19, server or client."
        />

        <Reveal delay={120} className="min-w-0">
          <LiquidGlass
            className="rounded-3xl border border-white/8 p-1.5"
            backdropBlur={3}
            tintColor="rgba(255, 255, 255, 0.04)"
          >
            <div className="rounded-[1.3rem] bg-black/50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
                  {(Object.keys(INSTALL_COMMANDS) as PackageManager[]).map(
                    (pm) => (
                      <button
                        key={pm}
                        onClick={() => setManager(pm)}
                        className={`rounded-full px-3.5 py-1 font-mono text-xs transition-all ${
                          manager === pm
                            ? 'bg-(--color-electric-purple)/25 text-white'
                            : 'text-white/50 hover:text-white'
                        }`}
                      >
                        {pm}
                      </button>
                    )
                  )}
                </div>
                <CopyButton text={INSTALL_COMMANDS[manager]} size={15} />
              </div>

              <code className="mb-6 block overflow-x-auto rounded-xl border border-white/8 bg-white/4 px-4 py-3 font-mono text-xs whitespace-nowrap text-(--color-cyan-glow) sm:text-sm">
                {INSTALL_COMMANDS[manager]}
              </code>

              <div className="relative">
                <CopyButton
                  text={USAGE_SNIPPET}
                  className="absolute top-1 right-0"
                  size={14}
                />
                <pre className="overflow-x-auto pr-10 font-mono text-[12px] leading-[1.7] text-white/70">
                  {USAGE_SNIPPET}
                </pre>
              </div>
            </div>
          </LiquidGlass>
        </Reveal>
      </div>
    </section>
  )
}

export default Install
