import { defineConfig } from 'vite'

export default defineConfig({
    base: '/L0k1-game/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                loading: 'loading.html',
                game: 'game.html',
            }
        }
    }
})
