<!--
	The quarter circle. Its circle center sits at the corner with the small notch.
	rot turns the whole shape: 0 = center top-left, 90 = top-right, 180 = bottom-right, 270 = bottom-left.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { reduced } from '$lib/motion';
	import { ui } from '$lib/state.svelte';

	type Intro = 'grow' | 'spin' | 'drop' | 'none';

	let {
		size = 95,
		rot = 0,
		turn = 0,
		color = 'var(--fg)',
		paint,
		notch = true,
		intro = 'spin',
		delay = 0,
		hero = false
	}: {
		size?: number;
		rot?: number;
		/** extra rotation on top of rot, eased with a spring */
		turn?: number;
		color?: string;
		/** any css background, used in place of color */
		paint?: string;
		notch?: boolean;
		intro?: Intro;
		delay?: number;
		hero?: boolean;
	} = $props();

	let outer: HTMLDivElement;
	let inner: HTMLDivElement;
	let pending = $state(true);

	const intros: Record<Exclude<Intro, 'none'>, { frames: Keyframe[]; duration: number }> = {
		grow: {
			frames: [
				{ transform: 'scale(0) rotate(-40deg)', transformOrigin: '0 0' },
				{ transform: 'scale(1) rotate(0deg)', transformOrigin: '0 0' }
			],
			duration: 1100
		},
		spin: {
			frames: [
				{ transform: 'rotate(-270deg) scale(0.2)', opacity: 0 },
				{ opacity: 1, offset: 0.3 },
				{ transform: 'rotate(0deg) scale(1)', opacity: 1 }
			],
			duration: 1000
		},
		drop: {
			frames: [
				{ transform: 'translateY(-120%) rotate(-90deg)', opacity: 0 },
				{ transform: 'translateY(0) rotate(0deg)', opacity: 1 }
			],
			duration: 900
		}
	};

	/** a full turn around the box center, overshooting a little */
	export function spin(turns = 1) {
		if (reduced()) return;
		inner.animate([{ transform: 'rotate(0deg)' }, { transform: `rotate(${360 * turns}deg)` }], {
			duration: 700 + 250 * turns,
			easing: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
			composite: 'add'
		});
	}

	/** a jelly squish */
	export function wobble() {
		if (reduced()) return;
		inner.animate(
			[
				{ transform: 'scale(1, 1)' },
				{ transform: 'scale(1.18, 0.86)' },
				{ transform: 'scale(0.9, 1.12)' },
				{ transform: 'scale(1.06, 0.95)' },
				{ transform: 'scale(0.98, 1.02)' },
				{ transform: 'scale(1, 1)' }
			],
			{ duration: 750, easing: 'ease-out', composite: 'add' }
		);
	}

	/** a quick bump, used when something else changes the color */
	export function pop() {
		if (reduced()) return;
		inner.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], {
			duration: 380,
			easing: 'ease-out',
			composite: 'add'
		});
	}

	export function element() {
		return outer;
	}

	function play() {
		if (intro === 'none' || reduced() || (hero && ui.wiping)) {
			pending = false;
			return;
		}
		const { frames, duration } = intros[intro];
		inner.animate(frames, { duration, delay, easing: 'cubic-bezier(0.3, 1.35, 0.5, 1)', fill: 'backwards' });
		pending = false;
	}

	onMount(() => {
		const io = new IntersectionObserver(([e]) => {
			if (!e.isIntersecting) return;
			io.disconnect();
			play();
		});
		io.observe(outer);
		return () => io.disconnect();
	});
</script>

<div
	bind:this={outer}
	class="q"
	class:pending={pending && intro !== 'none'}
	data-hero={hero || undefined}
	style:--s={size}
	style:--r="{rot}deg"
	style:--turn="{turn}deg"
	aria-hidden="true"
>
	<div bind:this={inner} class="qi" class:notch style:background={paint ?? color}></div>
</div>

<style>
	.q {
		flex: none;
		width: var(--size, calc(var(--s) * var(--u)));
		aspect-ratio: 1;
		rotate: calc(var(--r) + var(--turn));
		transition: rotate 0.8s var(--spring);
	}

	.qi {
		width: 100%;
		height: 100%;
		border-radius: 0 0 100% 0;
		transition: background-color 0.45s ease;
	}

	/* the notch is a small circle bitten out of the center corner, 13.66 / 190 of the size */
	.notch {
		-webkit-mask: radial-gradient(7.19% 7.19% at 0 0, #0000 97%, #000 100%);
		mask: radial-gradient(7.19% 7.19% at 0 0, #0000 97%, #000 100%);
	}

	:global(.js) .pending .qi {
		opacity: 0;
	}
</style>
