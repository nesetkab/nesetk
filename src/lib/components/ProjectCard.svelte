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
	let size = { w: 430, h: 172 };
	let placed = false;
	let frame = 0;

	function start() {
		if (!frame && card) frame = requestAnimationFrame(tick);
	}

	function tick() {
		frame = 0;
		const still = reduced();
		const k = still ? 1 : 0.16;
		const damp = still ? 0 : 0.72;
		let tx = target.x + 28;
		let ty = target.y + 28;
		if (tx + size.w > innerWidth - 16) tx = target.x - size.w - 28;
		if (ty + size.h > innerHeight - 16) ty = target.y - size.h - 28;
		vel.x = vel.x * damp + (tx - pos.x) * k;
		vel.y = vel.y * damp + (ty - pos.y) * k;
		pos.x += vel.x;
		pos.y += vel.y;
		const lean = Math.max(-12, Math.min(12, vel.x * 0.35));
		card.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${lean}deg)`;
		const settled =
			Math.abs(vel.x) + Math.abs(vel.y) < 0.05 && Math.abs(tx - pos.x) + Math.abs(ty - pos.y) < 0.5;
		if (!settled) frame = requestAnimationFrame(tick);
	}

	$effect(() => {
		if (project) start();
	});

	onMount(() => {
		const move = (e: PointerEvent) => {
			target = { x: e.clientX, y: e.clientY };
			if (!placed) {
				pos = { ...target };
				placed = true;
			}
			if (project) start();
		};
		const ro = new ResizeObserver(() => (size = { w: card.offsetWidth, h: card.offsetHeight }));
		ro.observe(card);
		addEventListener('pointermove', move, { passive: true });
		return () => {
			removeEventListener('pointermove', move);
			ro.disconnect();
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
		grid-template-columns: 238px 1fr;
		align-items: center;
		width: 430px;
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
		width: 220px;
		height: 220px;
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
