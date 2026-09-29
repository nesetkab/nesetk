<script lang="ts">
	import { onMount } from 'svelte';
	import { reduced } from '$lib/motion';

	let { color, seed = 1, label = '' }: { color: string; seed?: number; label?: string } = $props();

	type Tile = { r: number; bg: number; fg: number; delay: number };

	let box: HTMLButtonElement;
	let cols = $state(0);
	let rows = $state(0);
	let side = $state(0);
	let tiles = $state<Tile[]>([]);
	let visible = $state(false);

	function rng(s: number) {
		return () => {
			s = (s * 1664525 + 1013904223) % 4294967296;
			return s / 4294967296;
		};
	}

	const swatches = $derived([
		color,
		'var(--fg)',
		`color-mix(in srgb, ${color} 35%, var(--bg))`,
		'var(--bg)'
	]);

	function build(w: number, h: number) {
		const nr = Math.max(1, Math.round(h / 48));
		const nc = Math.max(1, Math.ceil(w / (h / nr)));
		side = h / nr;
		if (nr === rows && nc === cols) return;
		const rand = rng(seed * 7919 + 17);
		const next: Tile[] = [];
		for (let i = 0; i < nr * nc; i++) {
			const bg = Math.floor(rand() * 4);
			let fg = Math.floor(rand() * 4);
			if (fg === bg) fg = (bg + 1 + Math.floor(rand() * 3)) % 4;
			next.push({ r: Math.floor(rand() * 4), bg, fg, delay: 0 });
		}
		rows = nr;
		cols = nc;
		tiles = next;
	}

	function turn(i: number) {
		tiles[i].delay = 0;
		tiles[i].r += 1;
	}

	let over = -1;

	function hover(e: PointerEvent) {
		const i = Number((e.target as HTMLElement).closest<HTMLElement>('[data-i]')?.dataset.i ?? -1);
		if (i >= 0 && i !== over) turn(i);
		over = i;
	}

	function wave(e: MouseEvent) {
		const rect = box.getBoundingClientRect();
		const cx = ((e.clientX - rect.left) / rect.width) * cols;
		const cy = ((e.clientY - rect.top) / rect.height) * rows;
		tiles.forEach((t, i) => {
			const d = Math.hypot((i % cols) + 0.5 - cx, Math.floor(i / cols) + 0.5 - cy);
			t.delay = d * 45;
			t.r += 1;
		});
	}

	onMount(() => {
		const ro = new ResizeObserver(([e]) => build(e.contentRect.width, e.contentRect.height));
		ro.observe(box);
		const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
		io.observe(box);

		const rand = rng(seed * 31 + Date.now());
		const idle = setInterval(() => {
			if (!visible || reduced() || !tiles.length) return;
			turn(Math.floor(rand() * tiles.length));
		}, 650);

		return () => {
			ro.disconnect();
			io.disconnect();
			clearInterval(idle);
		};
	});
</script>

<button
	type="button"
	class="truchet"
	class:visible
	bind:this={box}
	style:--c={color}
	style:--cols={cols}
	style:--rows={rows}
	style:--t="{side}px"
	onclick={wave}
	onpointerover={hover}
	onpointerleave={() => (over = -1)}
	aria-label={label}
>
	{#each tiles as t, i}
		<div class="tile" data-i={i} style:background={swatches[t.bg]} style:--i={(i % cols) + Math.floor(i / cols)}>
			<div class="q" style:background={swatches[t.fg]} style:rotate="{t.r * 90}deg" style:transition-delay="{t.delay}ms"></div>
		</div>
	{/each}
</button>

<style>
	.truchet {
		display: grid;
		grid-template-columns: repeat(var(--cols), var(--t));
		grid-template-rows: repeat(var(--rows), var(--t));
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: color-mix(in srgb, var(--c) 35%, var(--bg));
		cursor: pointer;
	}

	.tile {
		position: relative;
		overflow: hidden;
		opacity: 0;
		scale: 0.4;
	}

	.visible .tile {
		animation: pop 0.6s calc(var(--i) * 28ms) var(--spring) both;
	}

	@keyframes pop {
		from {
			opacity: 0;
			scale: 0.4;
		}
		to {
			opacity: 1;
			scale: 1;
		}
	}

	.q {
		width: 100%;
		height: 100%;
		border-radius: 0 0 100% 0;
		transition: rotate 0.6s var(--spring);
	}
</style>
