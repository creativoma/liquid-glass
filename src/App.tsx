import LiquidGlass from './components/LiquidGlass'
import imageBackground from '/background.jpg'

const App = () => {
  return (
    <div className="min-h-screen p-6 sm:p-8">
      <img
        src={imageBackground}
        alt="Background"
        className="fixed inset-0 -z-10 h-screen w-full object-cover"
      />

      <div className="mx-auto max-w-5xl space-y-8">
        <header className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Liquid Glass
          </h1>
          <p className="text-sm text-white/80 sm:text-base">
            A React component with liquid frosted glass effect
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-xs font-semibold tracking-wider text-white/60 uppercase">
            Cards
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LiquidGlass
              className="rounded-xl p-6 transition-transform hover:scale-[1.02]"
              backdropBlur={3}
            >
              <h3 className="mb-2 text-base font-semibold text-white">
                Default Glass
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                Clean frosted glass effect with default settings
              </p>
            </LiquidGlass>

            <LiquidGlass
              className="rounded-xl p-6 transition-transform hover:scale-[1.02]"
              tintColor="rgba(255, 255, 255, 0.15)"
              backdropBlur={5}
            >
              <h3 className="mb-2 text-base font-semibold text-white">
                Light Tint
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                Subtle white overlay with enhanced blur
              </p>
            </LiquidGlass>

            <LiquidGlass
              className="rounded-xl p-6 transition-transform hover:scale-[1.02]"
              tintColor="rgba(0, 0, 0, 0.3)"
              backdropBlur={4}
            >
              <h3 className="mb-2 text-base font-semibold text-white">
                Dark Tint
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                Dark overlay for better contrast
              </p>
            </LiquidGlass>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xs font-semibold tracking-wider text-white/60 uppercase">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-3">
            <LiquidGlass
              as="button"
              className="rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105"
              backdropBlur={2}
            >
              Primary
            </LiquidGlass>

            <LiquidGlass
              as="button"
              className="rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105"
              tintColor="rgba(0, 0, 0, 0.2)"
              backdropBlur={3}
            >
              Secondary
            </LiquidGlass>

            <LiquidGlass
              as="button"
              className="rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105"
              tintColor="rgba(255, 255, 255, 0.3)"
              backdropBlur={2}
            >
              Accent
            </LiquidGlass>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xs font-semibold tracking-wider text-white/60 uppercase">
            Large Panel
          </h2>
          <LiquidGlass
            className="rounded-2xl p-8"
            backdropBlur={4}
            tintColor="rgba(255, 255, 255, 0.1)"
          >
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <h3 className="mb-1.5 text-sm font-semibold text-white">
                  Easy to Use
                </h3>
                <p className="text-xs leading-relaxed text-white/70">
                  Simple API with TailwindCSS integration
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 text-sm font-semibold text-white">
                  Customizable
                </h3>
                <p className="text-xs leading-relaxed text-white/70">
                  Full control over blur, tint and liquid effect
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 text-sm font-semibold text-white">
                  TypeScript
                </h3>
                <p className="text-xs leading-relaxed text-white/70">
                  Complete type safety out of the box
                </p>
              </div>
            </div>
          </LiquidGlass>
        </section>

        <section className="space-y-6">
          <h2 className="text-xs font-semibold tracking-wider text-white/60 uppercase">
            Shapes
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <LiquidGlass className="flex aspect-square items-center justify-center rounded-full p-6">
              <span className="text-center text-sm font-medium text-white">
                Circle
              </span>
            </LiquidGlass>

            <LiquidGlass className="flex aspect-square items-center justify-center rounded-2xl p-6">
              <span className="text-center text-sm font-medium text-white">
                Rounded
              </span>
            </LiquidGlass>

            <LiquidGlass className="flex aspect-square items-center justify-center p-6">
              <span className="text-center text-sm font-medium text-white">
                Square
              </span>
            </LiquidGlass>
          </div>
        </section>

        <footer className="pt-8 text-center">
          <LiquidGlass
            className="mx-auto inline-block rounded-lg px-4 py-2"
            tintColor="rgba(0, 0, 0, 0.3)"
          >
            <p className="text-xs text-white/90">
              Made by <span className="font-semibold">@creativoma</span>
            </p>
          </LiquidGlass>
        </footer>
      </div>
    </div>
  )
}

export default App
