/// <reference types="vitest" />
import { defineConfig } from 'vite'
import tsconfigPatch from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPatch()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
