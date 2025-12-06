# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
