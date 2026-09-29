<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Row from '$lib/components/Row.svelte';
	import Progress from '$lib/components/Progress.svelte';
	import { render } from '$lib/markdown';
	import { inview } from '$lib/motion';

	let { data } = $props();
	let post = $derived(data.post);
	let html = $derived(render(post.body));
</script>

<svelte:head>
	<title>{post.title} | neset</title>
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

	<article class="body rise" style:--d="450ms" data-inview="false" use:inview>
		{@html html}
	</article>

	<Progress />
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

	.body :global(h2),
	.body :global(h3),
	.body :global(h4) {
		font-weight: 700;
		line-height: 1.1;
		margin-top: 1.6em;
	}

	.body :global(h2) {
		font-size: 1.5em;
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

	.body :global(blockquote) {
		border-left: 0.2em solid var(--accent);
		padding-left: 0.8em;
		color: var(--muted);
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
	}

	.body :global(pre code) {
		background: none;
		padding: 0;
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
