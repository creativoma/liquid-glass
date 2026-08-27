import pkg from '../../package.json'

export const VERSION = pkg.version

export const LINKS = {
  github: 'https://github.com/creativoma/liquid-glass',
  npm: 'https://www.npmjs.com/package/@creativoma/liquid-glass',
  sponsor: 'https://github.com/sponsors/creativoma',
  author: 'https://marianoalvarez.dev',
  changelog:
    'https://github.com/creativoma/liquid-glass/blob/main/CHANGELOG.md',
  license: 'https://github.com/creativoma/liquid-glass/blob/main/LICENSE',
}

export const INSTALL_COMMANDS = {
  npm: 'npm install @creativoma/liquid-glass',
  pnpm: 'pnpm add @creativoma/liquid-glass',
  yarn: 'yarn add @creativoma/liquid-glass',
} as const

export type PackageManager = keyof typeof INSTALL_COMMANDS
