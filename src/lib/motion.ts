import type { Action } from 'svelte/action';

export const reduced = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const canHover = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;

export const inview: Action<HTMLElement, ((visible: boolean) => void) | undefined> = (node, cb) => {
	node.dataset.inview = 'false';
	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.dataset.inview = 'true';
			cb?.(true);
			io.disconnect();
		},
		{ rootMargin: '0px 0px -40px 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};
