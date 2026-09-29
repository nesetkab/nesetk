import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// Vercel serves this for any path that has no page, and the app renders +error.svelte in it
			fallback: '404.html'
		})
	}
};

export default config;
