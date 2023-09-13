import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://jsonplaceholder.typicode.com',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		},
	},
});
