import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './src/main.jsx',
        _redirects: './public/_redirects' // Adjust the path as needed
      },
    },
  },
})
