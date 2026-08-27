# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.5.0] - 2026-08-27

### Fixed

- **SSR crash in CJS consumers (Next.js pages router, Jest, plain Node)**: `main` and `exports['.'].require` pointed to `dist/index.js`, a file the build never emitted (only `index.esm.js` and `index.umd.js` existed), so any `require('@creativoma/liquid-glass')` failed with `MODULE_NOT_FOUND` and took the server render down with it. The build now emits a real CJS bundle (`dist/index.cjs`) and the ESM bundle moved to `dist/index.js`; `main`, `module` and the `exports` map point at files that exist
- **React Server Components crash (Next.js App Router)**: all bundles are now prefixed with the `"use client"` directive, so importing the component from a server component tree works without a client wrapper
- **Hydration mismatch on Safari/iOS under SSR**: browser capability detection in `useBrowserDetection` moved from the `useState` initializer to a post-mount `useEffect`. Server and first client render now always emit the full filter markup (matching trees), and Safari/iOS swaps to the simplified filter right after mount
- **`require()` shim crash in native ESM (Node SSR)**: `react/jsx-runtime` (a CJS module) was being bundled into the output, injecting a rolldown `require()` interop shim that throws in environments without `require` — plain Node ESM and script-tag browsers alike. It is now declared external along with `react` and `react-dom`

### Removed

- The UMD bundle (`dist/index.umd.js`). It was non-functional in its intended use case: the bundled CJS `react/jsx-runtime` tried to `require('react')` at runtime, which cannot resolve in a script-tag browser environment, so no working consumer could exist. ESM and CJS bundles cover all real usage

### Added

- `contentClassName` prop for styling the internal content wrapper that directly contains `children`. Layout classes (`flex`, `grid`, alignment) belong there — on `className` they land on the outer wrapper and never reach the content, since children render inside an internal `z-index: 2` div that keeps them above the blur and tint layers
- SSR regression test (`src/components/LiquidGlass.ssr.test.tsx`) rendering with `renderToString` in a plain Node environment
- `publint` packaging validation (`pnpm lint:pkg`), also run in CI after the library build — it would have caught the broken `require` entry before publish
- `exports` now declares split `import`/`require` conditions with dedicated type declarations for each (`index.d.ts` / `index.d.cts`)

### Changed

- Demo site build output moved from `dist/` to `dist-demo/` so the library and demo builds no longer clobber each other (Vercel `outputDirectory` updated accordingly)
- Redesigned demo/landing site: sticky glass navbar, new hero, feature bento grid, live examples gallery with view-source toggles, full-props playground with presets, complete props reference, install tabs, and SEO/Open Graph meta tags
- README: new SSR / Next.js section, live demo link, npm downloads badge, updated package formats

## [1.4.0] - 2026-08-25

### Added

- `build` script as an alias for `build:lib`, so the conventional `pnpm build` works

### Changed

- Vite `^7.3` → `^8.2` switches the library build from rollup to rolldown. The public API, runtime behaviour and type declarations are unchanged (`dist/*.d.ts` is byte-identical to 1.3.1), but the emitted bundle has a different internal structure and is ~15% smaller (esm 14.6 kB → 12.5 kB). Released as a minor rather than a patch to signal the changed build artifact
- Bumped dev dependencies to latest versions: `@eslint/js` `^9.39` → `^10.0`, `eslint` `^9.39` → `^10.9`, `@vitejs/plugin-react` `^5.2` → `^6.1`, `vite` `^7.3` → `^8.2`, `vite-plugin-dts` `^4.5` → `^5.0`, `jsdom` `^28.1` → `^30.0`, `@testing-library/jest-dom` `^6.10` → `^7.0`, `prettier-plugin-tailwindcss` `^0.7` → `^0.8`, plus `@types/node`, `@types/react-dom`, `@vitest/coverage-v8`, `eslint-plugin-react-refresh`, `globals`, `postcss`, `typescript-eslint`, `vitest`
- `typescript` `^5.9` → `^6.0`. TypeScript 7 was held back deliberately: it removes the JavaScript Compiler API, which breaks both `vite-plugin-dts` (no `.d.ts` generation) and `typescript-eslint` (throws on any TS >= 7, peer range `<6.1.0`). Revisit once [typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940) lands TS 7 support

### Fixed

- `vite.config.lib.ts` now uses `import.meta.dirname` instead of `__dirname`, clearing a Vite 8 deprecation warning from the native config loader

## [1.3.1] - 2026-08-24

### Fixed

- Rounded corners now clip the blur layer: the internal backdrop and tint layers use `border-radius: inherit`, so a radius set on the component (`rounded-xl`, `rounded-full`, `style.borderRadius`) is followed by every layer. Previously the `backdrop-filter` layer kept square corners — `backdrop-filter` clips against its own border box and browsers don't apply an ancestor's rounded `overflow: hidden` to it — so the blur leaked past the radius as a hard right angle over high-contrast backdrops

### Documentation

- README: new "Styling" section noting that the radius goes on `className`/`style` and the internal layers follow it

## [1.3.0] - 2026-08-01

### Added

- `disabled` prop on `LiquidGlass` to fully bypass the SVG filter and backdrop layers, rendering plain children for low-power devices, perf-sensitive lists, or manual opt-out
- `useBrowserDetection` now also detects the OS-level `prefers-reduced-motion` setting and exposes it as `prefersReducedMotion`; when set, the component automatically falls back to the lighter Safari/iOS filter instead of the full turbulence + displacement pipeline
- GitHub Actions CI workflow (`.github/workflows/ci.yml`) running lint, tests, and library build on Node 22 and 24, plus a dedicated job that installs React 18 peer dependencies to verify compatibility with the `>=18.0.0` range, and a bundle size report step

### Changed

- Memoized the wrapper's inline style object with `useMemo` to avoid recreating it on every render
- Bumped dev dependencies to latest versions: `@eslint/js`, `@tailwindcss/postcss`, `@testing-library/jest-dom`, `@types/node`, `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `@vitest/coverage-v8`, `autoprefixer`, `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `postcss`, `prettier`, `prettier-plugin-tailwindcss`, `react`, `react-dom`, `tailwindcss`, `typescript-eslint`, `vite`, `vitest`

## [1.2.0] - 2026-03-07

### Added

- Full test suite with Vitest and jsdom:
  - `src/components/LiquidGlass.test.tsx` — 27 tests covering rendering, wrapper styles, props, default values, Safari simplified filter, and layer structure
  - `src/hooks/useBrowserDetection.test.ts` — 8 tests covering Chrome, Firefox, Edge, Safari macOS, iPhone, iPad, iPod, and render stability
  - `src/test/setup.ts` — global test setup with `@testing-library/jest-dom`
  - `vitest.config.ts` — Vitest configuration with jsdom environment and v8 coverage
- Static HTML demo pages:
  - `demo/component.html` — standalone showcase of component variants
  - `demo/filters.html` — interactive SVG filter debugger

### Changed

- Interactive demo app (`src/App.tsx`): added live sliders to control `backdropBlur` and `tintColor` opacity in real time, with a code preview that updates dynamically

## [1.1.3] - 2026-03-06

### Security

- Updated `ajv` to `>=8.18.0` via pnpm overrides to fix vulnerability
- Updated `minimatch` to `>=9.0.7` and `>=10.2.3` via pnpm overrides to fix vulnerability
- Updated `rollup` to `>=4.59.0` via pnpm overrides to fix vulnerability
- Bumped dev dependencies: `tailwindcss` `^4.1` → `^4.2`, `@tailwindcss/postcss` `^4.1` → `^4.2`, `globals`, `postcss`, `eslint-plugin-react-refresh`, `typescript-eslint`, `@types/node`

### Fixed

- Reverted `eslint` to `^9.x` for compatibility with `eslint-plugin-react-hooks@7`

## [1.1.2] - 2026-03-06

### Yanked

- Published with eslint@10 which breaks peer dependency with eslint-plugin-react-hooks

## [1.1.1] - 2026-02-14

### Performance

- Removed demo CSS from library bundle, reducing package size by 13.5% (69.4 kB → 60 kB unpacked)
- Library now ships without CSS as component uses only inline styles
- Demo styles remain available in development mode

## [1.1.0] - 2026-02-14

### Added

- Exported `useBrowserDetection` hook for public use, allowing consumers to detect Safari/iOS browsers
- Performance optimizations: RegExp patterns hoisted to module level in browser detection
- Claude Code development files to `.gitignore` (`.claude/`, `.agents/`)

### Changed

- Updated package.json exports field: moved `types` condition first for better TypeScript compatibility
- Updated package.json paths to use relative `./` prefix for improved module resolution
- Updated major dependencies:
  - `eslint-plugin-react-hooks` `^5.2.0` → `^7.0.1`
  - `@vitejs/plugin-react` `^4.7.0` → `^5.1.4`
- Updated minor dependencies:
  - `@types/node` `^20.19.25` → `^25.2.3`
  - `@types/react` `^19.2.7` → `^19.2.14`
  - `typescript-eslint` `^8.48.1` → `^8.55.0`
  - React `^19.2.1` → `^19.2.4`
  - Vite `^7.2.6` → `^7.3.1`
  - And other dev dependencies to latest versions

### Documentation

- Improved README.md with professional formatting
- Removed emoji decorators from section headers
- Added comprehensive feature list and additional badges
- Enhanced API reference structure

## [1.0.3] - 2025-12-06

### Fixed

- Fixed liquid glass effect not working on iOS Safari and Safari browsers
- Implemented browser detection to identify Safari/iOS devices
- Added simplified SVG filter fallback for Safari/iOS that uses only well-supported primitives (`feTurbulence`, `feGaussianBlur`, `feColorMatrix`, `feBlend`)
- Maintained full-featured filter with `feDisplacementMap` for non-Safari browsers

### Added

- Browser detection function with SSR support using `useEffect`
- Hardware acceleration hints for Safari/iOS (`transform: translateZ(0)`, `willChange: transform`)
- Dual filter system that automatically selects appropriate filter based on browser capabilities

## [1.0.2] - 2025-12-06

### Changed

- Updated dependencies to latest versions

## [1.0.1] - 2025-10-22

### Fixed

- Updated SVG structure and styling for improved favicon appearance

### Documentation

- Added screenshot to README for better visual reference

## [1.0.0] - 2025-10-22

### Added

- Initial release of Liquid Glass component
- React wrapper component with liquid frosted glass effect
- Full TypeScript support
- TailwindCSS integration
- Customizable backdrop blur, tint color, and displacement scale
- SVG filter effects for liquid glass appearance
- Support for polymorphic component API (`as` prop)
