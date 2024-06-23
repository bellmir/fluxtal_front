import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader';
import { createRequire } from 'node:module';
import { compression } from 'vite-plugin-compression2';

const require = createRequire(import.meta.url);

export default defineConfig({
	plugins: [
		vue(),
		svgLoader({
			defaultImport: 'url', // or 'raw'
		}),
		compression({
			include: [/\.(js|css)$/],
			threshold: 1024, // 파일 크기가 1kb 이상인 경우만 압축
		}),
	],

	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
	},
});
