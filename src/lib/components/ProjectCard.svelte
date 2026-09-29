<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import type { Project } from '$lib/data';
	import { reduced } from '$lib/motion';

	let { project }: { project: Project | null } = $props();

	let shown = $state.raw<Project | null>(null);
	let showing = $state(0);
	let last: Project | null = null;
	$effect(() => {
		const p = project;
		if (p && p !== last) {
			shown = p;
			untrack(() => showing++);
		}
		last = p;
	});

	let card: HTMLDivElement;
	let target = { x: 0, y: 0 };
	let pos = { x: 0, y: 0 };
	let vel = { x: 0, y: 0 };
	let placed = false;

	onMount(() => {
		let frame = 0;
		const move = (e: PointerEvent) => {
			target = { x: e.clientX, y: e.clientY };
			if (!placed) {
				pos = { ...target };
				placed = true;
			}
		};
		const tick = () => {
			const still = reduced();
			const k = still ? 1 : 0.16;
			const damp = still ? 0 : 0.72;
			const w = card.offsetWidth;
			const h = card.offsetHeight;
			let tx = target.x + 28;
			let ty = target.y + 28;
			if (tx + w > innerWidth - 16) tx = target.x - w - 28;
			if (ty + h > innerHeight - 16) ty = target.y - h - 28;
			vel.x = vel.x * damp + (tx - pos.x) * k;
			vel.y = vel.y * damp + (ty - pos.y) * k;
			pos.x += vel.x;
			pos.y += vel.y;
			const lean = Math.max(-12, Math.min(12, vel.x * 0.35));
			card.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${lean}deg)`;
			frame = requestAnimationFrame(tick);
		};
		addEventListener('pointermove', move, { passive: true });
		frame = requestAnimationFrame(tick);
		return () => {
			removeEventListener('pointermove', move);
			cancelAnimationFrame(frame);
		};
	});
</script>

<div class="anchor" bind:this={card} aria-hidden="true">
	<div class="card" class:on={!!project} style:--c={shown?.color ?? 'transparent'}>
		{#key showing}
			<div class="blob"></div>
			<div class="head">
				<span class="tags">{shown?.tags}</span>
				<span class="title">{shown?.title}</span>
			</div>
			<p class="desc">{shown?.description}</p>
		{/key}
	</div>
</div>

<style>
	.anchor {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 40;
		pointer-events: none;
		will-change: transform;
	}

	.card {
		position: relative;
		display: grid;
		grid-template-columns: 213px 1fr;
		align-items: center;
		width: 405px;
		min-height: 172px;
		padding: 16px 18px 16px 0;
		overflow: hidden;
		background: var(--bg);
		border: 1.5px solid var(--fg);
		border-radius: 8px;
		opacity: 0;
		scale: 0.85;
		transform-origin: 0 0;
		transition:
			opacity 0.25s ease,
			scale 0.45s var(--spring);
	}

	.card.on {
		opacity: 1;
		scale: 1;
	}

	.blob {
		position: absolute;
		left: 0;
		top: 0;
		width: 228px;
		height: 228px;
		border-radius: 0 0 100% 0;
		background: color-mix(in srgb, var(--c) 62%, #fff);
		transform-origin: 0 0;
		animation: grow 0.7s var(--spring) both;
	}

	@keyframes grow {
		from {
			scale: 0;
			rotate: -30deg;
		}
	}

	.head {
		position: relative;
		align-self: start;
		display: flex;
		flex-direction: column;
		padding-left: 14px;
		color: #000;
	}

	.tags {
		font-size: 13px;
		padding-left: 3px;
		line-height: 1.2;
	}

	.title {
		font-size: 36px;
		line-height: 1;
	}

	.desc {
		position: relative;
		grid-column: 2;
		font-size: 24px;
		line-height: 1.12;
		animation: slide 0.5s var(--out) 0.1s both;
	}

	.head {
		animation: slide 0.45s var(--out) both;
	}

	@keyframes slide {
		from {
			translate: 12px 0;
			opacity: 0;
		}
	}

	.head,
	.desc {
		grid-row: 1;
	}
</style>
