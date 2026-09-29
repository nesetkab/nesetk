<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Row from '$lib/components/Row.svelte';
	import LinksRow from '$lib/components/LinksRow.svelte';
	import Truchet from '$lib/components/Truchet.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import { inview } from '$lib/motion';

	let { data } = $props();
	let project = $derived(data.project);
	let seed = $derived([...project.slug].reduce((a, c) => a + c.charCodeAt(0), 0));
	let lightbox = $state<Lightbox>();

	function pan(e: PointerEvent) {
		const el = e.currentTarget as HTMLElement;
		const r = el.getBoundingClientRect();
		el.style.setProperty('--px', `${((e.clientX - r.left) / r.width) * 100}%`);
		el.style.setProperty('--py', `${((e.clientY - r.top) / r.height) * 100}%`);
	}

	function unpan(e: PointerEvent) {
		const el = e.currentTarget as HTMLElement;
		el.style.removeProperty('--px');
		el.style.removeProperty('--py');
	}
</script>

<svelte:head>
	<title>{project.title} | neşet</title>
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
					<button
						type="button"
						class="zoom"
						data-shot={i}
						onclick={() => lightbox?.show(i)}
						onpointermove={pan}
						onpointerleave={unpan}
						aria-label="view {project.title} screenshot {i + 1}"
					>
						<img src={project.images[i]} alt="" loading="lazy" />
						<span class="peek" aria-hidden="true"><span>view</span></span>
					</button>
				{:else}
					<Truchet color={project.color} seed={seed + i} label="shuffle the {project.title} pattern" />
				{/if}
			</figure>
		{/each}
	</section>

	{#if project.points?.length}
		<Row rot={90} label="details" labelWidth={148} delay={300}>
			<div class="details">
				{#if project.when}
					<p class="when rise" style:--d="400ms">{project.when}</p>
				{/if}
				<ul>
					{#each project.points as point, j}
						<li class="rise" style:--d="{450 + j * 70}ms" style:--j={j}>{point}</li>
					{/each}
				</ul>
			</div>
		</Row>
	{/if}

	{#if project.links.length}
		<LinksRow links={project.links} labelWidth={248} delay={500} />
	{/if}

	{#if project.images.length}
		<Lightbox bind:this={lightbox} images={project.images} title={project.title} />
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

	.zoom {
		display: block;
		width: 100%;
		height: 100%;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: var(--px, 50%) var(--py, 0%);
		clip-path: circle(0 at 0 0);
		transition:
			clip-path 1.1s var(--out) var(--d),
			object-position 0.7s var(--out),
			scale 0.6s var(--spring);
	}

	.details {
		padding-top: calc(8 * var(--u));
	}

	.when {
		font-size: calc(18 * var(--u));
		color: var(--muted);
		margin-bottom: calc(12 * var(--u));
	}

	.details ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: calc(10 * var(--u));
		max-width: calc(760 * var(--u));
	}

	.details li {
		position: relative;
		padding-left: calc(28 * var(--u));
		font-size: calc(22 * var(--u));
		line-height: 1.35;
		letter-spacing: -0.02em;
	}

	.details li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.38em;
		width: 0.62em;
		height: 0.62em;
		background: var(--accent);
		border-radius: 0 0 100% 0;
		transition: rotate 0.6s var(--spring) calc(var(--j) * 70ms);
	}

	.details:hover li::before {
		rotate: 180deg;
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

		.when {
			font-size: 14px;
		}

		.details li {
			padding-left: 22px;
			font-size: 17px;
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
