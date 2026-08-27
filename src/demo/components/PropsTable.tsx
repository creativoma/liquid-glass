import { FC } from 'react'
import { LiquidGlass } from '@creativoma/liquid-glass'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const PROPS: {
  prop: string
  type: string
  def: string
  description: string
}[] = [
  {
    prop: 'children',
    type: 'ReactNode',
    def: '—',
    description: 'Content rendered inside the glass container',
  },
  {
    prop: 'className',
    type: 'string',
    def: "''",
    description: 'Classes for the wrapper — put your border-radius here',
  },
  {
    prop: 'contentClassName',
    type: 'string',
    def: '—',
    description: 'Classes for the content wrapper — put flex/grid layout here',
  },
  {
    prop: 'backdropBlur',
    type: 'number',
    def: '2',
    description: 'Backdrop blur level in px',
  },
  {
    prop: 'tintColor',
    type: 'string',
    def: "'rgba(255, 255, 255, .2)'",
    description: 'Tint overlay color',
  },
  {
    prop: 'displacementScale',
    type: 'number',
    def: '150',
    description: 'Displacement map scale — the liquid intensity',
  },
  {
    prop: 'turbulenceBaseFrequency',
    type: 'string',
    def: "'0.008 0.008'",
    description: 'Turbulence base frequency, controls noise size',
  },
  {
    prop: 'turbulenceSeed',
    type: 'number',
    def: '1.5',
    description: 'Turbulence seed for different noise patterns',
  },
  {
    prop: 'as',
    type: 'ElementType',
    def: "'div'",
    description: 'Element to render: div, button, nav, section…',
  },
  {
    prop: 'style',
    type: 'CSSProperties',
    def: '—',
    description: 'Additional inline styles on the wrapper',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    def: 'false',
    description: 'Bypass the effect entirely and render plain children',
  },
]

const PropsTable: FC = () => (
  <section
    id="props"
    className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-12"
  >
    <SectionHeading
      eyebrow="API"
      title={
        <>
          Eleven props.
          <br />
          <span className="text-gradient-electric">Zero mysteries.</span>
        </>
      }
      description="Everything is optional — drop it in with no props and tune from there. All standard HTML attributes pass through."
    />

    <Reveal>
      <LiquidGlass
        className="overflow-hidden rounded-3xl border border-white/8"
        backdropBlur={3}
        tintColor="rgba(255, 255, 255, 0.03)"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs tracking-wider text-white/40 uppercase">
                <th className="px-6 py-4 font-medium">Prop</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Default</th>
                <th className="px-6 py-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {PROPS.map(({ prop, type, def, description }) => (
                <tr
                  key={prop}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/3"
                >
                  <td className="px-6 py-3.5">
                    <code className="font-mono text-sm font-semibold text-(--color-cyan-glow)">
                      {prop}
                    </code>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="rounded-md bg-(--color-electric-purple)/10 px-2 py-0.5 font-mono text-xs text-(--color-violet-bright)">
                      {type}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <code className="font-mono text-xs text-white/45">
                      {def}
                    </code>
                  </td>
                  <td className="px-6 py-3.5 text-white/60">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LiquidGlass>
    </Reveal>
  </section>
)

export default PropsTable
