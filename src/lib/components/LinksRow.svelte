<script lang="ts">
	import Row from './Row.svelte';
	import type { Link } from '$lib/data';

	let { links, labelWidth = 179, delay = 0 }: { links: Link[]; labelWidth?: number; delay?: number } = $props();

	let turn = $state(0);
</script>

<Row rot={0} size={47} label="links" {labelWidth} center hover="none" {turn} {delay}>
	<ul>
		{#each links as link, i}
			<li class="rise" style:--d="{delay + 200 + i * 70}ms">
				{#if link.href}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						onpointerenter={() => (turn = (i + 1) * 90)}
						onpointerleave={() => (turn = 0)}
						onfocus={() => (turn = (i + 1) * 90)}
						onblur={() => (turn = 0)}>{link.title}</a
					>
				{:else}
					<span class="soon" title="coming soon">{link.title}</span>
				{/if}
			</li>
		{/each}
	</ul>
</Row>

<style>
	ul {
		list-style: none;
		display: flex;
		justify-content: space-between;
		font-size: calc(28 * var(--u));
		line-height: 1.2;
	}

	a,
	.soon {
		display: inline-block;
		background: linear-gradient(currentColor, currentColor) 0 100% / 0 calc(2 * var(--u)) no-repeat;
		transition: background-size 0.45s var(--out);
	}

	a:hover,
	a:focus-visible {
		background-size: 100% calc(2 * var(--u));
	}

	.soon {
		color: var(--muted);
		cursor: default;
	}

	@media (max-width: 760px) {
		ul {
			flex-wrap: wrap;
			justify-content: flex-start;
			gap: 12px 28px;
			font-size: 22px;
		}

		a:hover,
		a:focus-visible {
			background-size: 100% 2px;
		}
	}
</style>
