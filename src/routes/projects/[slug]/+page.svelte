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
						class="view"
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

	.view {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
		cursor: zoom-in;
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

	.view:hover img,
	.view:focus-visible img {
		scale: 1.06;
	}

	.peek {
		position: absolute;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		width: 84px;
		aspect-ratio: 1;
		padding: 0 12px 10px 0;
		background: var(--accent);
		border-radius: 100% 0 0 0;
		-webkit-mask: radial-gradient(7.19% 7.19% at 100% 100%, #0000 97%, #000 100%);
		mask: radial-gradient(7.19% 7.19% at 100% 100%, #0000 97%, #000 100%);
		color: #000;
		font-size: 17px;
		transform-origin: 100% 100%;
		scale: 0;
		rotate: 45deg;
		transition:
			scale 0.5s var(--spring),
			rotate 0.5s var(--spring);
	}

	.peek span {
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.view:hover .peek,
	.view:focus-visible .peek {
		scale: 1;
		rotate: 0deg;
	}

	.view:hover .peek span,
	.view:focus-visible .peek span {
		opacity: 1;
		transition-delay: 0.15s;
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
