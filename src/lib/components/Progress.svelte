<!--
	Reading progress as a quarter-circle pie in the corner: a quarter circle is 90 degrees,
	so the slice sweeps from 0 to 90 degrees as you read.
-->
<script lang="ts">
	import { onMount } from 'svelte';

	let { color }: { color: string } = $props();

	let p = $state(0);
	let scrollable = $state(false);
	let done = $derived(p > 0.995);

	onMount(() => {
		const update = () => {
			const max = document.documentElement.scrollHeight - innerHeight;
			scrollable = max > 40;
			p = scrollable ? Math.min(1, Math.max(0, scrollY / max)) : 1;
		};
		update();
		addEventListener('scroll', update, { passive: true });
		addEventListener('resize', update);
		return () => {
			removeEventListener('scroll', update);
			removeEventListener('resize', update);
		};
	});
</script>

{#if scrollable}
<button
	class="progress"
	class:done
	style:--p={p}
	style:--c={color}
	onclick={() => scrollTo({ top: 0, behavior: 'smooth' })}
	aria-label="back to top, {Math.round(p * 100)} percent read"
>
	<span class="pie"></span>
</button>
{/if}

<style>
	.progress {
		position: fixed;
		right: 24px;
		bottom: 24px;
		width: 56px;
		height: 56px;
		z-index: 30;
		rotate: 180deg;
		animation: enter 0.8s 0.9s var(--spring) both;
	}

	@keyframes enter {
		from {
			scale: 0;
			rotate: 0deg;
		}
	}

	.pie {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 0 0 100% 0;
		background: conic-gradient(
			from 90deg at 0 0,
			var(--c) calc(var(--p) * 90deg),
			var(--faint) calc(var(--p) * 90deg) 90deg,
			transparent 90deg
		);
		-webkit-mask: radial-gradient(7.19% 7.19% at 0 0, #0000 97%, #000 100%);
		mask: radial-gradient(7.19% 7.19% at 0 0, #0000 97%, #000 100%);
		transition: scale 0.3s var(--spring);
	}

	.progress:hover .pie {
		scale: 1.1;
	}

	.done .pie {
		animation: cheer 0.7s var(--spring);
	}

	@keyframes cheer {
		40% {
			scale: 1.25;
			rotate: 90deg;
		}
	}
</style>
