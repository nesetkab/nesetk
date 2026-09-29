<script lang="ts">
	import type { Snippet } from 'svelte';
	import Quarter from './Quarter.svelte';
	import BackLink from './BackLink.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { burst } from '$lib/confetti';
	import { palette } from '$lib/data';

	let {
		color,
		offset = 14,
		back = false,
		children
	}: {
		color: string;
		offset?: number;
		back?: boolean;
		children: Snippet;
	} = $props();

	let quarter: Quarter;
	let clicks = $state(0);
	let current = $derived(
		clicks === 0 ? color : palette.filter((c) => c !== color)[(clicks - 1) % (palette.length - 1)]
	);

	function play(e: MouseEvent) {
		clicks++;
		quarter.spin();
		const box = quarter.element().getBoundingClientRect();
		const x = e.clientX || box.left + box.width / 3;
		const y = e.clientY || box.top + box.height / 3;
		burst(x, y, palette);
	}
</script>

<header class="hero">
	<button class="hit" onclick={play} aria-label="spin the quarter circle">
		<Quarter bind:this={quarter} size={190} color={current} intro="grow" hero />
	</button>
	<div class="text" style:--off={offset}>
		{@render children()}
	</div>
	<div class="corner">
		<ThemeToggle />
		{#if back}<BackLink />{/if}
	</div>
</header>

<style>
	.hero {
		position: relative;
		display: flex;
		align-items: flex-end;
		min-height: calc(190 * var(--u));
	}

	.hit {
		display: block;
		flex: none;
		align-self: flex-start;
		border-radius: 0 0 100% 0;
		-webkit-tap-highlight-color: transparent;
		transition: scale 0.3s var(--spring);
	}

	.hit:hover {
		scale: 1.015;
	}

	.hit:active {
		scale: 0.97;
	}

	.text {
		margin-left: calc(var(--off) * var(--u));
		min-width: 0;
	}

	.corner {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		align-items: center;
		gap: calc(40 * var(--u));
	}

	@media (max-width: 760px) {
		.hero {
			flex-direction: column;
			align-items: flex-start;
			min-height: 0;
			gap: 20px;
			--size: 120px;
		}

		.text {
			margin-left: 0;
		}

		.corner {
			position: static;
			order: -1;
			align-self: stretch;
			justify-content: space-between;
			margin-bottom: 4px;
		}

		.corner > :global(:only-child) {
			margin-left: auto;
		}
	}
</style>
