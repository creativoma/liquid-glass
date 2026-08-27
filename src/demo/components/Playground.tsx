import { FC, useState } from 'react'
import { LiquidGlass } from '@creativoma/liquid-glass'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import CopyButton from './CopyButton'

interface PlaygroundState {
  backdropBlur: number
  tintOpacity: number
  tintRgb: string
  displacementScale: number
  turbulenceFrequency: number
  turbulenceSeed: number
  disabled: boolean
}

const TINT_SWATCHES: { label: string; rgb: string; swatchClass: string }[] = [
  { label: 'White', rgb: '255, 255, 255', swatchClass: 'bg-white' },
  { label: 'Black', rgb: '0, 0, 0', swatchClass: 'bg-black' },
  { label: 'Purple', rgb: '168, 85, 247', swatchClass: 'bg-purple-500' },
  { label: 'Cyan', rgb: '34, 211, 238', swatchClass: 'bg-cyan-400' },
]

const PRESETS: { name: string; state: Partial<PlaygroundState> }[] = [
  {
    name: 'Subtle',
    state: {
      backdropBlur: 2,
      tintOpacity: 5,
      displacementScale: 60,
      turbulenceFrequency: 0.008,
      turbulenceSeed: 1.5,
      disabled: false,
    },
  },
  {
    name: 'Frosty',
    state: {
      backdropBlur: 14,
      tintOpacity: 18,
      displacementScale: 40,
      turbulenceFrequency: 0.005,
      turbulenceSeed: 2,
      disabled: false,
    },
  },
  {
    name: 'Liquid',
    state: {
      backdropBlur: 4,
      tintOpacity: 8,
      displacementScale: 200,
      turbulenceFrequency: 0.012,
      turbulenceSeed: 5,
      disabled: false,
    },
  },
  {
    name: 'Extreme',
    state: {
      backdropBlur: 1,
      tintOpacity: 4,
      displacementScale: 300,
      turbulenceFrequency: 0.02,
      turbulenceSeed: 8,
      disabled: false,
    },
  },
]

const DEFAULT_STATE: PlaygroundState = {
  backdropBlur: 4,
  tintOpacity: 8,
  tintRgb: '255, 255, 255',
  displacementScale: 150,
  turbulenceFrequency: 0.008,
  turbulenceSeed: 1.5,
  disabled: false,
}

const Slider: FC<{
  label: string
  value: number
  display?: string
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}> = ({ label, value, display, min, max, step = 1, onChange }) => (
  <div className="mb-5">
    <div className="mb-2 flex justify-between text-xs text-white/60">
      <span className="font-mono">{label}</span>
      <span className="font-mono text-(--color-electric-purple)">
        {display ?? value}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      aria-label={label}
      onChange={(e) => onChange(Number(e.target.value))}
      className="slider w-full"
    />
  </div>
)

const Playground: FC = () => {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE)

  const patch = (partial: Partial<PlaygroundState>) =>
    setState((s) => ({ ...s, ...partial }))

  const tintColor = `rgba(${state.tintRgb}, ${(state.tintOpacity / 100).toFixed(2)})`
  const frequency = `${state.turbulenceFrequency} ${state.turbulenceFrequency}`

  const generatedCode = state.disabled
    ? `<LiquidGlass disabled>\n  …\n</LiquidGlass>`
    : `<LiquidGlass
  backdropBlur={${state.backdropBlur}}
  tintColor="${tintColor}"
  displacementScale={${state.displacementScale}}
  turbulenceBaseFrequency="${frequency}"
  turbulenceSeed={${state.turbulenceSeed}}
>
  …
</LiquidGlass>`

  return (
    <section
      id="playground"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-12"
    >
      <SectionHeading
        eyebrow="Playground"
        title={
          <>
            Every prop,
            <br />
            <span className="text-gradient-electric">live.</span>
          </>
        }
        description="Drag the sliders, hit a preset, and copy the exact JSX when it feels right."
      />

      <Reveal>
        <LiquidGlass
          className="rounded-3xl border border-white/8 p-6 sm:p-8 lg:p-10"
          backdropBlur={3}
          tintColor="rgba(255, 255, 255, 0.03)"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
            {/* Controls */}
            <div className="min-w-0">
              <div className="mb-6 flex flex-wrap gap-2">
                {PRESETS.map(({ name, state: presetState }) => (
                  <button
                    key={name}
                    onClick={() => patch(presetState)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-(--color-electric-purple)/50 hover:bg-(--color-electric-purple)/10 hover:text-white"
                  >
                    {name}
                  </button>
                ))}
              </div>

              <Slider
                label="backdropBlur"
                value={state.backdropBlur}
                display={`${state.backdropBlur}px`}
                min={0}
                max={20}
                onChange={(backdropBlur) => patch({ backdropBlur })}
              />
              <Slider
                label="displacementScale"
                value={state.displacementScale}
                min={0}
                max={300}
                step={10}
                onChange={(displacementScale) => patch({ displacementScale })}
              />
              <Slider
                label="turbulenceBaseFrequency"
                value={state.turbulenceFrequency}
                display={frequency}
                min={0.001}
                max={0.03}
                step={0.001}
                onChange={(turbulenceFrequency) =>
                  patch({ turbulenceFrequency })
                }
              />
              <Slider
                label="turbulenceSeed"
                value={state.turbulenceSeed}
                min={0}
                max={10}
                step={0.5}
                onChange={(turbulenceSeed) => patch({ turbulenceSeed })}
              />
              <Slider
                label="tintColor opacity"
                value={state.tintOpacity}
                display={`${state.tintOpacity}%`}
                min={0}
                max={40}
                onChange={(tintOpacity) => patch({ tintOpacity })}
              />

              <div className="mb-5">
                <div className="mb-2 text-xs text-white/60">
                  <span className="font-mono">tintColor</span>
                </div>
                <div className="flex gap-2">
                  {TINT_SWATCHES.map(({ label, rgb, swatchClass }) => (
                    <button
                      key={rgb}
                      onClick={() => patch({ tintRgb: rgb })}
                      aria-label={`Tint ${label}`}
                      className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${swatchClass} ${
                        state.tintRgb === rgb
                          ? 'border-(--color-electric-purple)'
                          : 'border-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-xs text-white/60">
                <input
                  type="checkbox"
                  checked={state.disabled}
                  onChange={(e) => patch({ disabled: e.target.checked })}
                  className="h-4 w-4 accent-(--color-electric-purple)"
                />
                <span className="font-mono">disabled</span>
                <span className="text-white/35">
                  — bypass the effect entirely
                </span>
              </label>
            </div>

            {/* Preview + generated code */}
            <div className="flex min-w-0 flex-col gap-5">
              <div
                className="grid min-h-64 flex-1 place-items-center overflow-hidden rounded-2xl p-8"
                style={{
                  background:
                    'radial-gradient(circle at 25% 25%, #a855f7 0%, #4f46e5 40%, #22d3ee 90%)',
                }}
              >
                <LiquidGlass
                  className="w-full max-w-sm rounded-2xl p-8"
                  backdropBlur={state.backdropBlur}
                  tintColor={tintColor}
                  displacementScale={state.displacementScale}
                  turbulenceBaseFrequency={frequency}
                  turbulenceSeed={state.turbulenceSeed}
                  disabled={state.disabled}
                >
                  <div className="text-center">
                    <div className="mb-3 text-4xl text-white/80">✦</div>
                    <h3 className="mb-1 text-base font-medium tracking-wide text-white/90">
                      Glass preview
                    </h3>
                    <p className="font-mono text-xs text-white/50">
                      {state.disabled
                        ? 'effect disabled'
                        : `blur ${state.backdropBlur}px · scale ${state.displacementScale}`}
                    </p>
                  </div>
                </LiquidGlass>
              </div>

              <div className="relative rounded-2xl bg-black/50 p-4">
                <CopyButton
                  text={generatedCode.replace('…', '{children}')}
                  className="absolute top-2 right-2"
                  size={15}
                />
                <pre className="overflow-x-auto pr-10 font-mono text-[12px] leading-relaxed text-white/75">
                  {generatedCode}
                </pre>
              </div>
            </div>
          </div>
        </LiquidGlass>
      </Reveal>
    </section>
  )
}

export default Playground
