import { resolve } from 'node:path'
import { defineConfig } from 'vite-plus'

function resolveRelativePath(relative: string): string {
  return resolve(__dirname, relative)
}

export default defineConfig({
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    semi: false,
    singleQuote: true,
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: [],
  },
  build: {
    lib: {
      entry: resolveRelativePath('src/index.ts'),
      formats: ['es'],
      name: 'fews-wms-requests',
      fileName: 'fews-wms-requests',
    },
  },
})
