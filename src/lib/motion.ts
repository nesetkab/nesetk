import type { Action } from 'svelte/action';

export const reduced = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const canHover = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;

/** sets data-inview on the node once it scrolls into view, so paused .rise animations start */
export const inview: Action<HTMLElement, ((visible: boolean) => void) | undefined> = (node, cb) => {
	node.dataset.inview = 'false';
	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.dataset.inview = 'true';
			cb?.(true);
			io.disconnect();
		},
		// a fixed margin, not a percentage: on a tall window a percentage can be bigger than the space under
		// the last row, so that row could never count as visible, even when scrolled to the bottom
		{ rootMargin: '0px 0px -40px 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};
