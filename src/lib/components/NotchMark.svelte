<script lang="ts">
	let { size = '1em' }: { size?: string } = $props();
</script>

<svg style:width={size} style:height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
	<path d="M0 49V0A64 64 0 0 1 64 64H15A15 15 0 0 0 0 49Z" fill="currentColor" />
	<path class="dot" d="M0 55A9 9 0 0 1 9 64H0Z" />
</svg>

<style>
	svg {
		display: inline-block;
		flex: none;
		overflow: visible;
	}

	.dot {
		fill: var(--accent);
		transform-origin: 0 64px;
		transition:
			fill 0.45s ease,
			scale 0.5s var(--spring);
	}

	:global(:hover) > svg .dot {
		scale: 1.6;
	}
</style>
