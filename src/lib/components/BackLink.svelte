<script lang="ts">
	import Arrow from './Arrow.svelte';
</script>

<a class="back rise" href="/" style:--d="500ms">
	<span class="arrow"><Arrow /></span>
	<span>go back</span>
</a>

<style>
	.back {
		display: flex;
		align-items: center;
		gap: calc(6 * var(--u));
		font-size: calc(28 * var(--u));
		line-height: 1;
	}

	.arrow {
		display: block;
		transition: translate 0.4s var(--spring);
	}

	.back:hover .arrow,
	.back:focus-visible .arrow {
		animation: nudge 0.9s var(--out) infinite;
	}

	@keyframes nudge {
		0%,
		100% {
			translate: 0;
		}
		40% {
			translate: calc(-10 * var(--u));
		}
	}

	@media (max-width: 760px) {
		.back {
			font-size: 18px;
		}
	}
</style>
