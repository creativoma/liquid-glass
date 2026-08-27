# @creativoma/liquid-glass

[![npm version](https://img.shields.io/npm/v/@creativoma/liquid-glass.svg)](https://www.npmjs.com/package/@creativoma/liquid-glass)
[![npm downloads](https://img.shields.io/npm/dw/@creativoma/liquid-glass.svg)](https://www.npmjs.com/package/@creativoma/liquid-glass)
[![CI](https://github.com/creativoma/liquid-glass/actions/workflows/ci.yml/badge.svg)](https://github.com/creativoma/liquid-glass/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)

A modern React component library featuring liquid frosted glass effect using TailwindCSS and SVG filters. Create elegant glassmorphism interfaces with advanced visual effects.

**[Live demo →](https://liquid-glass-tan.vercel.app)**

## Features

- Liquid frosted glass effect with customizable displacement mapping
- SSR-ready: works out of the box in Next.js (App Router and pages router), Remix, and any server-rendered app
- Full TypeScript support with comprehensive type definitions
- TailwindCSS integration for seamless styling
- Polymorphic component API (render as any HTML element)
- Cross-browser compatible with Safari/iOS fallback support
- Respects `prefers-reduced-motion` by automatically using the lighter filter
- `disabled` prop to fully bypass the effect for low-power devices or long lists
- Customizable blur, tint, and turbulence parameters
- Zero dependencies (peer dependencies only)
- ESM and CJS formats for maximum compatibility

## Installation

```bash
npm install @creativoma/liquid-glass
```

```bash
yarn add @creativoma/liquid-glass
```

```bash
pnpm add @creativoma/liquid-glass
```

## Quick Start

```jsx
import { LiquidGlass } from '@creativoma/liquid-glass'

function App() {
  return (
    <LiquidGlass backdropBlur={3} tintColor="rgba(255, 255, 255, 0.25)">
      <div className="p-8">
        <h1>Your content here</h1>
        <p>The frosted glass effect is applied to this container</p>
      </div>
    </LiquidGlass>
  )
}
```

## API Reference

### Props

| Prop                      | Type              | Default                     | Description                                                 |
| ------------------------- | ----------------- | --------------------------- | ----------------------------------------------------------- |
| `children`                | `React.ReactNode` | -                           | Content to display inside the container                     |
| `className`               | `string`          | `''`                        | Additional TailwindCSS CSS classes                          |
| `contentClassName`        | `string`          | -                           | Classes for the internal content wrapper (layout goes here) |
| `backdropBlur`            | `number`          | `2`                         | Blur level for the backdrop filter (in px)                  |
| `tintColor`               | `string`          | `'rgba(255, 255, 255, .2)'` | Tint overlay color (rgba)                                   |
| `displacementScale`       | `number`          | `150`                       | Displacement map scale (liquid effect intensity)            |
| `turbulenceBaseFrequency` | `string`          | `'0.008 0.008'`             | Turbulence base frequency (controls noise size)             |
| `turbulenceSeed`          | `number`          | `1.5`                       | Turbulence seed (for different noise patterns)              |
| `as`                      | `ElementType`     | `'div'`                     | HTML component to render (div, button, section, etc.)       |
| `style`                   | `CSSProperties`   | -                           | Additional inline styles                                    |
| `disabled`                | `boolean`         | `false`                     | Fully bypasses the glass effect, rendering plain children   |

## SSR / Next.js

The component is SSR-safe and ships with the `"use client"` directive baked into every bundle, so it works in Next.js without any wrapper:

```jsx
// app/page.tsx — App Router, works directly in a Server Component tree
import { LiquidGlass } from '@creativoma/liquid-glass'

export default function Page() {
  return (
    <LiquidGlass backdropBlur={4} className="rounded-2xl p-8">
      <h1>Server-rendered glass</h1>
    </LiquidGlass>
  )
}
```

- No `window`, `document`, or layout effects during render — `renderToString` works in plain Node (covered by a regression test).
- Browser capability detection (Safari/iOS fallback, `prefers-reduced-motion`) runs after mount, so server and client markup always match and there are no hydration warnings.
- Both `import` (ESM) and `require` (CJS) entry points are published, so it also works with the pages router and older toolchains.

## Styling

Rounded corners go on `className` (or `style`) of the component itself — the internal backdrop and
tint layers use `border-radius: inherit`, so they follow whatever radius you set:

```jsx
<LiquidGlass backdropBlur={8} className="rounded-3xl p-6">
  <p className="text-white">The blur is clipped to the same radius</p>
</LiquidGlass>
```

Layout classes (flex/grid) go on `contentClassName` instead: children render inside an
internal wrapper (it keeps them above the blur and tint layers), so `display: flex` on
`className` would lay out that wrapper, not your content:

```jsx
<LiquidGlass
  as="nav"
  className="rounded-full px-6 py-3"
  contentClassName="flex items-center gap-6"
>
  <span>Logo</span>
  <a href="#docs">Docs</a>
</LiquidGlass>
```

## Accessibility

`LiquidGlass` automatically detects the OS-level `prefers-reduced-motion` setting (via `useBrowserDetection`) and falls back to the lighter Safari/iOS filter when it's set, since the full turbulence + displacement pipeline is the most GPU-intensive path. If you need to opt out entirely — for a reduced-motion mode, a low-power device, or a long list of glass cards — pass `disabled` to render plain children with no filter or backdrop blur:

```jsx
<LiquidGlass disabled={isLowPowerMode}>
  <div className="p-8">Falls back to plain content</div>
</LiquidGlass>
```

## Usage Examples

### Card with glass effect

```jsx
<LiquidGlass
  backdropBlur={5}
  tintColor="rgba(255, 255, 255, 0.3)"
  className="max-w-md rounded-xl p-6"
>
  <h2 className="mb-4 text-2xl font-bold text-white">Card Title</h2>
  <p className="text-white/90">
    Card content with elegant frosted glass effect.
  </p>
</LiquidGlass>
```

### Button with liquid glass effect

```jsx
<LiquidGlass
  as="button"
  backdropBlur={3}
  tintColor="rgba(0, 0, 0, 0.2)"
  className="rounded-full px-8 py-4 font-semibold text-white transition-transform hover:scale-110"
>
  Click Me!
</LiquidGlass>
```

### Modal with glassmorphism

```jsx
<div className="fixed inset-0 flex items-center justify-center bg-black/50">
  <LiquidGlass
    backdropBlur={10}
    tintColor="rgba(255, 255, 255, 0.15)"
    className="max-w-lg rounded-2xl p-8 shadow-2xl"
  >
    <h3 className="mb-4 text-xl font-semibold text-white">
      Modal with Liquid Glass
    </h3>
    <p className="mb-6 text-white/90">
      This is an example of a modal with glassmorphism effect
    </p>
    <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
      Close
    </button>
  </LiquidGlass>
</div>
```

### Navbar with glass effect

```jsx
<LiquidGlass
  backdropBlur={4}
  tintColor="rgba(255, 255, 255, 0.1)"
  className="fixed top-0 right-0 left-0 z-50 border-b border-white/20"
>
  <nav className="container mx-auto flex items-center justify-between px-6 py-4">
    <div className="text-xl font-bold text-white">My App</div>
    <div className="flex gap-6 text-white">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>
</LiquidGlass>
```

### Advanced liquid effect customization

```jsx
<LiquidGlass
  backdropBlur={3}
  tintColor="rgba(100, 200, 255, 0.2)"
  displacementScale={200}
  turbulenceBaseFrequency="0.01 0.01"
  turbulenceSeed={5}
  className="rounded-3xl p-12"
>
  <p className="text-white">Custom liquid effect</p>
</LiquidGlass>
```

## Development

```bash
# Clone the repository
git clone https://github.com/creativoma/liquid-glass.git
cd liquid-glass

# Install dependencies
pnpm install

# Development mode
pnpm run dev

# Linting and formatting
pnpm run lint
pnpm run format

# Build library
pnpm run build:lib

# Build demo
pnpm run build:demo

# Preview
pnpm run preview

# Publish (requires permissions)
npm publish
```

## Project Structure

```
liquid-glass/
├── src/
│   ├── components/
│   │   ├── LiquidGlass.tsx
│   │   └── types.ts
│   ├── hooks/
│   │   └── useBrowserDetection.ts
│   ├── demo/                  # Demo/landing application
│   ├── main.tsx               # Demo entry point
│   ├── index.ts               # Library entry point
│   └── index.css
├── dist/                      # Compiled library
├── dist-demo/                 # Compiled demo site
├── public/                    # Demo assets
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts            # Demo build config
├── vite.config.lib.ts        # Library build config
└── tailwind.config.js
```

## Requirements

- React >= 18.0.0
- React DOM >= 18.0.0
- TailwindCSS (component uses Tailwind classes)

CI verifies compatibility with both React 18 and React 19 on every push (see [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)).

## Technologies

- **React** - Component library
- **TypeScript** - Static typing
- **Vite** - Build tool and bundler
- **Tailwind CSS** - CSS framework for glassmorphism effect
- **SVG Filters** - Advanced visual effects with feTurbulence and feDisplacementMap

## Package Formats

This package includes multiple formats for maximum compatibility:

- **ESM** (`dist/index.js`) - For modern applications
- **CJS** (`dist/index.cjs`) - For `require()` consumers (Next.js pages router, Jest, plain Node)
- **TypeScript** (`dist/index.d.ts` / `dist/index.d.cts`) - Type definitions for both entry points

All bundles are prefixed with the `"use client"` directive for React Server Components compatibility.

## Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Mariano Álvarez](https://github.com/creativoma)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed list of changes.
