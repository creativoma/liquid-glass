import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      compilerOptions: { declarationMap: false },
      exclude: [
        '**/*.test.*',
        '**/*.spec.*',
        'src/main.tsx',
        'src/demo/**',
        'src/test/**',
        '/public/**/*',
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'LiquidGlass',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      // react/jsx-runtime must stay external: bundling it (a CJS module)
      // injects a require() interop shim that throws in native ESM (Node SSR)
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Next.js App Router: the component uses hooks, so consumers must
        // get it as a Client Component without wrapping it themselves
        banner: '"use client";',
      },
    },
    target: 'es2020',
    minify: true,
    copyPublicDir: false,
  },
})
