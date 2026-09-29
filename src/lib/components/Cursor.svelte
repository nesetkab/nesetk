<!--
	A small quarter circle that chases the pointer. Its arc always faces the direction of travel,
	and it swells over anything clickable. Only on devices with a real mouse.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { canHover, reduced } from '$lib/motion';

	let el: HTMLDivElement;
	let active = $state(false);
	let big = $state(false);
	let down = $state(false);

	onMount(() => {
		if (!canHover() || reduced()) return;

		let x = -100,
			y = -100,
			px = -100,
			py = -100,
			angle = 0,
			frame = 0;

		const move = (e: PointerEvent) => {
			if (e.pointerType !== 'mouse') return;
			x = e.clientX;
			y = e.clientY;
			if (!active) {
				px = x;
				py = y;
				active = true;
			}
			const t = e.target as Element | null;
			big = !!t?.closest?.('a, button, [data-grow]');
			start();
		};
		const leave = () => (active = false);
		const press = () => (down = true);
		const release = () => (down = false);

		// the loop runs only while the follower is catching up, and pointer movement restarts it
		const start = () => {
			if (!frame) frame = requestAnimationFrame(tick);
		};
		const tick = () => {
			frame = 0;
			const dx = x - px;
			const dy = y - py;
			if (Math.hypot(dx, dy) < 0.1) {
				px = x;
				py = y;
				el.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${angle}deg)`;
				return;
			}
			px += dx * 0.22;
			py += dy * 0.22;
			if (Math.hypot(dx, dy) > 2) {
				// the arc of an unrotated quarter points down-right (45deg); aim it along the motion
				const want = (Math.atan2(dy, dx) * 180) / Math.PI - 45;
				let diff = ((want - angle + 540) % 360) - 180;
				angle += diff * 0.2;
			}
			el.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${angle}deg)`;
			frame = requestAnimationFrame(tick);
		};

		addEventListener('pointermove', move, { passive: true });
		document.documentElement.addEventListener('pointerleave', leave);
		addEventListener('pointerdown', press);
		addEventListener('pointerup', release);

		return () => {
			removeEventListener('pointermove', move);
			document.documentElement.removeEventListener('pointerleave', leave);
			removeEventListener('pointerdown', press);
			removeEventListener('pointerup', release);
			cancelAnimationFrame(frame);
		};
	});
</script>

<div class="cursor" class:active bind:this={el} aria-hidden="true">
	<div class="dot" class:big class:down></div>
</div>

<style>
	.cursor {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 70;
		pointer-events: none;
		transform-origin: 0 0;
		opacity: 0;
		mix-blend-mode: difference;
		transition: opacity 0.3s ease;
	}

	.cursor.active {
		opacity: 1;
	}

	/* the circle center sits exactly on the pointer */
	.dot {
		width: 16px;
		height: 16px;
		background: #fff;
		border-radius: 0 0 100% 0;
		transform-origin: 0 0;
		transition: scale 0.35s var(--spring);
	}

	.dot.big {
		scale: 2.6;
	}

	.dot.down {
		scale: 0.7;
	}

	.dot.big.down {
		scale: 2.1;
	}
</style>
