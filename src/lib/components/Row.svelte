<script lang="ts">
	import type { Snippet } from 'svelte';
	import Quarter from './Quarter.svelte';
	import { inview } from '$lib/motion';

	let {
		rot = 180,
		size = 95,
		color = 'var(--fg)',
		turn = 0,
		label,
		labelWidth = 148,
		center = false,
		hover = 'spin',
		delay = 0,
		quarter = $bindable(),
		children
	}: {
		rot?: number;
		size?: number;
		color?: string;
		turn?: number;
		label?: string;
		labelWidth?: number;
		center?: boolean;
		hover?: 'spin' | 'wobble' | 'none';
		delay?: number;
		quarter?: Quarter;
		children: Snippet;
	} = $props();

	function enter() {
		if (hover === 'spin') quarter?.spin();
		if (hover === 'wobble') quarter?.wobble();
	}
</script>

<section
	class="row"
	class:center
	class:small={size < 60}
	style:--lw={labelWidth}
	style:--d="{delay}ms"
	data-inview="false"
	use:inview
	onpointerenter={enter}
>
	<div class="slot">
		<Quarter bind:this={quarter} {size} {rot} {color} {turn} {delay} />
	</div>
	{#if label}
		<h2 class="label rise" style:--d="{delay + 120}ms">{label}</h2>
	{/if}
	<div class="content">
		{@render children()}
	</div>
</section>

<style>
	.row {
		display: flex;
		align-items: flex-start;
		gap: calc(18 * var(--u));
	}

	.center {
		align-items: center;
	}

	.slot {
		flex: none;
		width: calc(95 * var(--u));
	}

	.label {
		flex: none;
		width: calc(var(--lw) * var(--u));
		font-size: calc(36 * var(--u));
		font-weight: 700;
		line-height: 1.25;
		letter-spacing: -0.04em;
	}

	.small .label {
		font-size: calc(28 * var(--u));
	}

	.content {
		flex: 1;
		min-width: 0;
		align-self: stretch;
	}

	.center .content {
		align-self: center;
	}

	@media (max-width: 760px) {
		.row {
			flex-wrap: wrap;
			align-items: center;
			gap: 16px;
			--size: 56px;
		}

		.row.small {
			--size: 36px;
		}

		.slot {
			width: 56px;
		}

		.label,
		.small .label {
			width: auto;
			font-size: 28px;
		}

		.content {
			flex-basis: 100%;
		}

		.row:not(:has(.label)) .content {
			flex-basis: 0;
		}
	}
</style>
