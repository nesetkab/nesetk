<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Row from '$lib/components/Row.svelte';
	import LinksRow from '$lib/components/LinksRow.svelte';
	import Truchet from '$lib/components/Truchet.svelte';
	import { inview } from '$lib/motion';

	let { data } = $props();
	let project = $derived(data.project);
	let seed = $derived([...project.slug].reduce((a, c) => a + c.charCodeAt(0), 0));
</script>

<svelte:head>
	<title>{project.title} | neset</title>
	<meta name="description" content="{project.title}: {project.description}" />
</svelte:head>

<main class="page" style:--accent={project.color}>
	<Hero color={project.color} back>
		<p class="tags rise" style:--d="250ms">{project.tags}</p>
		<h1 class="rise" style:--d="330ms">{project.title}</h1>
	</Hero>

	<Row rot={180} hover="wobble" delay={150}>
		<p class="about rise" style:--d="300ms">{project.description}</p>
	</Row>

	<section class="gallery" data-inview="false" use:inview>
		{#each [0, 1, 2] as i}
			<figure class="shot rise" class:main={i === 0} style:--d="{450 + i * 120}ms">
				{#if project.images[i]}
					<img src={project.images[i]} alt="{project.title} screenshot {i + 1}" loading="lazy" />
				{:else}
					<Truchet color={project.color} seed={seed + i} label="{project.title} pattern" />
				{/if}
			</figure>
		{/each}
	</section>

	{#if project.links.length}
		<LinksRow links={project.links} labelWidth={248} delay={500} />
	{/if}
</main>

<style>
	.tags {
		font-size: calc(28 * var(--u));
		line-height: 1;
		margin-bottom: calc(10 * var(--u));
		padding-left: calc(2 * var(--u));
	}

	h1 {
		font-size: calc(96 * var(--u));
		font-weight: 700;
		line-height: 0.95;
		letter-spacing: -0.04em;
		padding-bottom: calc(6 * var(--u));
	}

	.about {
		font-size: calc(36 * var(--u));
		line-height: 1.25;
		max-width: calc(700 * var(--u));
	}

	.gallery {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: calc(110 * var(--u)) calc(110 * var(--u));
		gap: calc(20 * var(--u));
	}

	.shot {
		overflow: hidden;
		min-width: 0;
	}

	.shot.main {
		grid-row: span 2;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		clip-path: circle(0 at 0 0);
		transition: clip-path 1.1s var(--out) var(--d);
	}

	.gallery:global([data-inview='true']) img {
		clip-path: circle(150% at 0 0);
	}

	@media (max-width: 760px) {
		.tags {
			font-size: 18px;
		}

		h1 {
			font-size: 64px;
		}

		.about {
			font-size: 22px;
		}

		.gallery {
			grid-template-columns: 1fr;
			grid-template-rows: 200px 110px 110px;
			gap: 12px;
		}

		.shot.main {
			grid-row: auto;
		}
	}
</style>
