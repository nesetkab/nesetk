<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Row from '$lib/components/Row.svelte';
	import Progress from '$lib/components/Progress.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import { inview } from '$lib/motion';

	let { data } = $props();
	let post = $derived(data.post);
	let body = $derived(data.body);
	let lightbox = $state<Lightbox>();

	function zoom(e: MouseEvent) {
		const shot = (e.target as HTMLElement).closest<HTMLElement>('.zoom')?.dataset.shot;
		if (shot !== undefined) lightbox?.show(Number(shot));
	}
</script>

<svelte:head>
	<title>{post.title} | neşet</title>
	<meta name="description" content={post.tldr || post.title} />
</svelte:head>

<main class="page" style:--accent={post.color}>
	<Hero color={post.color} back>
		<h1 class="rise" style:--d="300ms">{post.title}</h1>
	</Hero>

	{#if post.tldr}
		<Row rot={180} label="tl;dr" labelWidth={70} hover="wobble" delay={150}>
			<p class="tldr rise" style:--d="320ms">{post.tldr}</p>
		</Row>
	{/if}

	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
	<article class="body rise" style:--d="450ms" data-inview="false" use:inview onclick={zoom}>
		{@html body.html}
	</article>

	<Progress />

	{#if body.images.length}
		<Lightbox bind:this={lightbox} images={body.images} alts={body.alts} title={post.title} />
	{/if}
</main>

<style>
	h1 {
		font-size: calc(80 * var(--u));
		font-weight: 700;
		line-height: 0.95;
		letter-spacing: -0.04em;
		padding-bottom: calc(14 * var(--u));
		text-wrap: balance;
	}

	.tldr {
		font-size: calc(36 * var(--u));
		line-height: 1.25;
		max-width: calc(720 * var(--u));
	}

	.body {
		max-width: calc(760 * var(--u));
		font-size: calc(26 * var(--u));
		line-height: 1.35;
		margin-top: calc(10 * var(--u));
	}

	.body :global(> * + *) {
		margin-top: 1.1em;
	}

	.body :global(:is(h2, h3, h4, h5, h6)) {
		font-weight: 700;
		line-height: 1.1;
		margin-top: 1.6em;
	}

	.body :global(h2) {
		font-size: 1.5em;
	}

	.body :global(h4) {
		font-size: 0.9em;
	}

	.body :global(h5) {
		font-size: 0.8em;
	}

	.body :global(h6) {
		font-size: 0.8em;
		color: var(--muted);
	}

	.body :global(a) {
		background: linear-gradient(var(--accent), var(--accent)) 0 100% / 100% 0.12em no-repeat;
		transition: background-size 0.3s var(--out);
	}

	.body :global(a:hover) {
		background-size: 100% 100%;
	}

	.body :global(ul) {
		padding-left: 1.1em;
	}

	.body :global(ol) {
		padding-left: 1.4em;
	}

	.body :global(li > :is(ul, ol)) {
		margin-top: 0.2em;
	}

	.body :global(ol > li::marker) {
		font-variant-numeric: tabular-nums;
	}

	.body :global(li:has(> input[type='checkbox'])) {
		list-style: none;
	}

	.body :global(input[type='checkbox']) {
		appearance: none;
		width: 0.75em;
		height: 0.75em;
		margin: 0 0.45em 0 -1.1em;
		vertical-align: -0.05em;
		border: 0.09em solid var(--fg);
		border-radius: 0 0 100% 0;
	}

	.body :global(input[type='checkbox']:checked) {
		background: var(--accent);
		border-color: var(--accent);
	}

	.body :global(blockquote) {
		border-left: 0.2em solid var(--accent);
		padding-left: 0.8em;
		color: var(--muted);
	}

	.body :global(blockquote > * + *) {
		margin-top: 0.6em;
	}

	.body :global(code) {
		font-family: ui-monospace, 'SF Mono', Menlo, monospace;
		font-size: 0.85em;
		letter-spacing: 0;
		background: var(--faint);
		padding: 0.05em 0.3em;
		border-radius: 4px;
	}

	.body :global(pre) {
		background: var(--faint);
		padding: 1em;
		border-radius: 8px;
		overflow-x: auto;
		tab-size: 2;
	}

	.body :global(pre code) {
		background: none;
		padding: 0;
	}

	.body :global(table) {
		display: block;
		max-width: 100%;
		overflow-x: auto;
		border-collapse: collapse;
		font-size: 0.8em;
		font-variant-numeric: tabular-nums;
	}

	.body :global(:is(th, td)) {
		padding: 0.45em 1em 0.45em 0;
		border-bottom: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
	}

	.body :global(th) {
		font-weight: 700;
		border-bottom-color: var(--fg);
	}

	.body :global(th:not([align])) {
		text-align: left;
	}

	.body :global(hr) {
		border: 0;
		border-top: 1px solid color-mix(in srgb, var(--fg) 20%, transparent);
		margin: 2em 0;
	}

	.body :global(:is(del, s)) {
		color: var(--muted);
	}

	.body :global(u) {
		text-underline-offset: 0.15em;
	}

	.body :global(small) {
		font-size: 0.8em;
		color: var(--muted);
	}

	.body :global(:is(sub, sup)) {
		line-height: 0;
	}

	.body :global(kbd) {
		font-family: ui-monospace, 'SF Mono', Menlo, monospace;
		font-size: 0.75em;
		letter-spacing: 0;
		padding: 0.1em 0.4em;
		border: 1px solid color-mix(in srgb, var(--fg) 25%, transparent);
		border-bottom-width: 2px;
		border-radius: 4px;
		background: var(--faint);
	}

	.body :global(mark) {
		color: inherit;
		background: color-mix(in srgb, var(--accent) 35%, transparent);
		padding: 0 0.15em;
		border-radius: 2px;
	}

	.body :global(figure) {
		margin: 1.6em 0;
	}

	.body :global(.zoom) {
		display: block;
		width: fit-content;
		max-width: 100%;
		border-radius: 8px;
	}

	.body :global(p .zoom) {
		display: inline-block;
		vertical-align: middle;
	}

	.body :global(.zoom img) {
		max-width: 100%;
		height: auto;
	}

	@media (max-width: 760px) {
		h1 {
			font-size: 48px;
		}

		.tldr {
			font-size: 20px;
		}

		.body {
			font-size: 19px;
		}
	}
</style>
