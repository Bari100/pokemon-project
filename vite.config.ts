import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
    eslint({
      failOnError: false,
    }),
  ],
})
