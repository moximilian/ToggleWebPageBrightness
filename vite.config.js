import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            input: {
                popup: 'src/main.js',
                content: 'src/content/content.js',
                background: 'src/background/background.js',
            },
            output: {
                entryFileNames: chunk => {
                    if (chunk.name === 'content') return 'content/content.js'
                    if (chunk.name === 'background') return 'background/background.js'
                    return '[name].js'
                },
            },
        },
    },
})
