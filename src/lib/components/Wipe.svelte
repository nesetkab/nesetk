<!--
	The page transition. On navigation the hero quarter swells until it covers the screen,
	takes the color of the next page, then shrinks back down into that page's hero quarter.
-->
<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { tick } from 'svelte';
	import { reduced } from '$lib/motion';
	import { ui } from '$lib/state.svelte';
	import { HOME_COLOR, projects } from '$lib/data';
	import { posts } from '$lib/posts';

	let el: HTMLDivElement;

	function colorFor(path: string) {
		const [, kind, slug] = path.split('/');
		if (kind === 'projects') return projects.find((p) => p.slug === slug)?.color ?? HOME_COLOR;
		if (kind === 'blog') return posts.find((p) => p.slug === slug)?.color ?? HOME_COLOR;
		return HOME_COLOR;
	}

	function heroBox() {
		const hero = document.querySelector<HTMLElement>('[data-hero]');
		if (!hero) return null;
		const r = hero.getBoundingClientRect();
		const fill = hero.firstElementChild ? getComputedStyle(hero.firstElementChild).backgroundColor : '';
		return { x: r.left, y: r.top, s: r.width, fill };
	}

	/** a quarter this big, pushed up and left so its notch is off screen, covers the whole viewport */
	function fullBox() {
		const s = Math.hypot(innerWidth, innerHeight) * 1.25;
		return { x: -0.08 * s, y: -0.08 * s, s };
	}

	const frame = (b: { x: number; y: number; s: number }) => ({
		transform: `translate(${b.x}px, ${b.y}px)`,
		width: `${b.s}px`,
		height: `${b.s}px`
	});

	onNavigate((navigation) => {
		if (reduced() || !navigation.to || navigation.to.url.pathname === navigation.from?.url.pathname) return;

		const color = colorFor(navigation.to.url.pathname);
		const from = heroBox() ?? { x: 0, y: 0, s: 0, fill: color };
		const full = fullBox();

		ui.wiping = true;
		el.style.display = 'block';

		return new Promise<void>((resolve) => {
			const cover = el.animate(
				[
					{ ...frame(from), backgroundColor: from.fill || color },
					{ ...frame(full), backgroundColor: color }
				],
				{ duration: 620, easing: 'cubic-bezier(0.7, 0, 0.3, 1)', fill: 'forwards' }
			);

			cover.finished.then(async () => {
				resolve();
				await navigation.complete;
				await tick();
				await new Promise(requestAnimationFrame);

				const to = heroBox();
				const uncover = el.animate(
					to
						? [
								{ ...frame(full), backgroundColor: color },
								{ ...frame(to), backgroundColor: color }
							]
						: [
								{ ...frame(full), opacity: 1 },
								{ ...frame(full), opacity: 0 }
							],
					{ duration: 700, easing: 'cubic-bezier(0.65, 0, 0.2, 1)', fill: 'forwards' }
				);
				await uncover.finished;
				el.style.display = 'none';
				cover.cancel();
				uncover.cancel();
				ui.wiping = false;
			});
		});
	});
</script>

<div class="wipe" bind:this={el} aria-hidden="true"></div>

<style>
	.wipe {
		display: none;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 50;
		border-radius: 0 0 100% 0;
		pointer-events: none;
		-webkit-mask: radial-gradient(7.19% 7.19% at 0 0, #0000 97%, #000 100%);
		mask: radial-gradient(7.19% 7.19% at 0 0, #0000 97%, #000 100%);
	}
</style>
