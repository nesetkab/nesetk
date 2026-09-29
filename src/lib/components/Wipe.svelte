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
	import { RESUME_COLOR } from '$lib/resume';

	let el: HTMLDivElement;

	function colorFor(path: string) {
		const [, kind, slug] = path.split('/');
		if (kind === 'projects') return projects.find((p) => p.slug === slug)?.color ?? HOME_COLOR;
		if (kind === 'blog') return posts.find((p) => p.slug === slug)?.color ?? HOME_COLOR;
		if (kind === 'resume') return RESUME_COLOR;
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

	// each navigation gets a number; a newer one takes over the overlay and the older one backs off
	let run = 0;
	let playing: Animation[] = [];

	function stop() {
		for (const a of playing) a.cancel();
		playing = [];
	}

	function hide() {
		stop();
		el.style.display = 'none';
		ui.wiping = false;
	}

	/** where the overlay is right now, mid-animation included */
	function overlayBox() {
		const r = el.getBoundingClientRect();
		return { x: r.left, y: r.top, s: r.width, fill: getComputedStyle(el).backgroundColor };
	}

	onNavigate((navigation) => {
		const id = ++run;
		const busy = el.style.display === 'block';

		if (reduced() || !navigation.to || navigation.to.url.pathname === navigation.from?.url.pathname) {
			// a navigation that skips the wipe still clears one left over from an interrupted navigation
			if (busy) hide();
			return;
		}

		const color = colorFor(navigation.to.url.pathname);
		// if an earlier wipe is still on screen, carry on from where it is instead of snapping back
		const from = busy ? overlayBox() : (heroBox() ?? { x: 0, y: 0, s: 0, fill: color });
		const full = fullBox();

		stop();
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
			playing.push(cover);

			cover.finished.then(
				async () => {
					resolve();
					try {
						await navigation.complete;
					} catch {
						// aborted: if nothing newer took over, take the overlay down
						if (id === run) hide();
						return;
					}
					if (id !== run) return;
					await tick();
					await new Promise(requestAnimationFrame);
					if (id !== run) return;

					const to = heroBox();
					const uncover = el.animate(
						to
							? [
									{ ...frame(full), backgroundColor: color },
									// end on the real hero color, for pages colorFor does not know (like a 404)
									{ ...frame(to), backgroundColor: to.fill || color }
								]
							: [
									{ ...frame(full), opacity: 1 },
									{ ...frame(full), opacity: 0 }
								],
						{ duration: 700, easing: 'cubic-bezier(0.65, 0, 0.2, 1)', fill: 'forwards' }
					);
					playing.push(uncover);
					try {
						await uncover.finished;
					} catch {
						return; // cancelled by a newer navigation, which owns the overlay now
					}
					if (id === run) hide();
				},
				// cancelled by a newer navigation: let this one go, the newer one owns the overlay
				() => resolve()
			);
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
