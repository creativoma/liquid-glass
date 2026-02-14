# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
