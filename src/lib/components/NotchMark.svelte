<script lang="ts">
	let { size = '1em' }: { size?: string } = $props();
</script>

<svg style:width={size} style:height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
	<path d="M0 33.82V0A64 64 0 0 1 64 64H30.18A30.18 30.18 0 0 0 0 33.82Z" fill="currentColor" />
	<circle class="dot" cx="12.5" cy="51.5" r="9" />
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
