import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
    plugins: [
        vue(),
        viteCompression({
            algorithm: 'gzip',
        }),
        viteCompression({
            algorithm: 'brotliCompress',
            ext: 'br',
        }),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8787',
            },
        },
    },
})
