import { defineConfig } from 'vite'

export default defineConfig({
    base: '/L0k1-game/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                game: 'game.html',
            }
        }
    }
})
