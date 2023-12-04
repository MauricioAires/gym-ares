import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'
/**
 * Fazer com que o vitest entenda as importações
 * com caminhos relativos
 */
export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    dir: '.',
    coverage: {
      exclude: ['**/env/**'],
    },
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
