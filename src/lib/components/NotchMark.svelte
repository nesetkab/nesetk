<script lang="ts">
	let { size = '1em' }: { size?: string } = $props();
</script>

<svg style:width={size} style:height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
	<path d="M0 26.58V0A64 64 0 0 1 64 64H37.42A37.42 37.42 0 0 0 0 26.58Z" fill="currentColor" />
	<circle class="dot" cx="15.5" cy="48.5" r="10.5" />
</svg>

<style>
	svg {
		display: inline-block;
		flex: none;
		overflow: visible;
	}

	.dot {
		fill: var(--accent);
		transform-box: fill-box;
		transform-origin: center;
		transition:
			fill 0.45s ease,
			scale 0.5s var(--spring);
	}

	:global(:hover) > svg .dot {
		scale: 1.2;
	}
</style>
