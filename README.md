# @creativoma/liquid-glass

A modern React component with liquid frosted glass effect using TailwindCSS. Perfect for creating elegant interfaces with glassmorphism effect.

[![npm version](https://img.shields.io/npm/v/@creativoma/liquid-glass.svg)](https://www.npmjs.com/package/@creativoma/liquid-glass)

## 🚀 Installation

```bash
npm install @creativoma/liquid-glass
```

```bash
yarn add @creativoma/liquid-glass
```

```bash
pnpm add @creativoma/liquid-glass
```

## 📖 Basic Usage

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

## ⚙️ Props

| Prop                      | Type              | Default                     | Description                                           |
| ------------------------- | ----------------- | --------------------------- | ----------------------------------------------------- |
| `children`                | `React.ReactNode` | -                           | Content to display inside the container               |
| `className`               | `string`          | `''`                        | Additional TailwindCSS CSS classes                    |
| `backdropBlur`            | `number`          | `2`                         | Blur level for the backdrop filter (in px)            |
| `tintColor`               | `string`          | `'rgba(255, 255, 255, .2)'` | Tint overlay color (rgba)                             |
| `displacementScale`       | `number`          | `150`                       | Displacement map scale (liquid effect intensity)      |
| `turbulenceBaseFrequency` | `string`          | `'0.008 0.008'`             | Turbulence base frequency (controls noise size)       |
| `turbulenceSeed`          | `number`          | `1.5`                       | Turbulence seed (for different noise patterns)        |
| `as`                      | `ElementType`     | `'div'`                     | HTML component to render (div, button, section, etc.) |
| `style`                   | `CSSProperties`   | -                           | Additional inline styles                              |

## 💡 Advanced Examples

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

## 🛠️ Development

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

## 🧪 Project Structure

```
liquid-glass/
├── src/
│   ├── components/
│   │   ├── LiquidGlass.tsx
│   │   └── types.ts
│   ├── App.tsx                 # Demo application
│   ├── main.tsx               # Demo entry point
│   ├── index.ts               # Library entry point
│   └── index.css
├── dist/                      # Compiled files
├── public/                    # Demo assets
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts            # Demo build config
├── vite.config.lib.ts        # Library build config
└── tailwind.config.js
```

## 📋 Requirements

- React >= 18.0.0
- React DOM >= 18.0.0
- TailwindCSS (component uses Tailwind classes)

## 🏗️ Technologies

- **React** - Component library
- **TypeScript** - Static typing
- **Vite** - Build tool and bundler
- **Tailwind CSS** - CSS framework for glassmorphism effect
- **SVG Filters** - Advanced visual effects with feTurbulence and feDisplacementMap

## 📦 Available Formats

This package includes multiple formats for maximum compatibility:

- **ESM** (`dist/index.esm.js`) - For modern applications
- **UMD** (`dist/index.umd.js`) - For universal compatibility
- **TypeScript** (`dist/index.d.ts`) - Type definitions

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [creativoma](https://github.com/creativoma)

## 🏷️ Changelog

### 1.0.0

- First version of LiquidGlass component
- Frosted glass effect with backdrop-filter
- Animated liquid effect with SVG filters (feTurbulence + feDisplacementMap)
- Full customization of liquid effect (displacement scale, turbulence frequency, seed)
- Support for polymorphic component with `as` prop
- Full integration with TailwindCSS
- Optimized build with tree-shaking
- Full TypeScript support
