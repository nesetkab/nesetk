<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Row from '$lib/components/Row.svelte';
	import LinksRow from '$lib/components/LinksRow.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type Quarter from '$lib/components/Quarter.svelte';
	import { HOME_COLOR, links, projects, type Project } from '$lib/data';
	import { posts, type Post } from '$lib/posts';
	import { canHover } from '$lib/motion';

	let hoveredProject = $state.raw<Project | null>(null);
	let hoveredPost = $state.raw<Post | null>(null);
	let projectsQuarter = $state<Quarter>();
	let blogsQuarter = $state<Quarter>();

	function enterProject(p: Project) {
		if (!canHover()) return;
		if (hoveredProject !== p) projectsQuarter?.pop();
		hoveredProject = p;
	}

	function enterPost(p: Post) {
		if (hoveredPost !== p) blogsQuarter?.pop();
		hoveredPost = p;
	}

	const name = 'neset'.split('');
</script>

<svelte:head>
	<title>neset</title>
	<meta
		name="description"
		content="neset: a Northeastern freshman studying EECE, interested in ML, semiconductors, and design."
	/>
</svelte:head>

<main class="page">
	<Hero color={HOME_COLOR} offset={-3}>
		<h1>
			<span class="hi rise" style:--d="250ms">hi, i’m</span>
			<span class="name" aria-label="neset">
				{#each name as letter, i}
					<span class="mask"><span class="letter" style:--i={i}>{letter}</span></span>
				{/each}
			</span>
		</h1>
	</Hero>

	<Row rot={180} hover="wobble" delay={150}>
		<p class="about rise" style:--d="300ms">
			a Northeastern freshman studying EECE, interested in ML, semiconductors, and design.
		</p>
	</Row>

	<Row
		rot={90}
		label="projects"
		labelWidth={148}
		delay={250}
		hover="none"
		color={hoveredProject?.color ?? 'var(--fg)'}
		bind:quarter={projectsQuarter}
	>
		<ul class="projects" class:dim={!!hoveredProject}>
			{#each projects as p, i}
				<li class:up={i % 2 === 1} class:active={hoveredProject === p}>
					<a
						class="project rise"
						href="/projects/{p.slug}"
						style:--d="{400 + i * 80}ms"
						style:--c={p.color}
						onpointerenter={() => enterProject(p)}
						onpointerleave={() => (hoveredProject = null)}
					>
						<span class="tags">{p.tags}</span>
						<span class="ptitle">{p.title}</span>
					</a>
				</li>
			{/each}
		</ul>
	</Row>

	<Row
		rot={270}
		label="blogs"
		labelWidth={161}
		delay={350}
		color={hoveredPost?.color ?? 'var(--fg)'}
		bind:quarter={blogsQuarter}
	>
		<ul class="posts" class:dim={!!hoveredPost}>
			{#each posts as p, i}
				<li class:active={hoveredPost === p}>
					<a
						class="post rise"
						href="/blog/{p.slug}"
						style:--d="{520 + i * 90}ms"
						style:--c={p.color}
						onpointerenter={() => enterPost(p)}
						onpointerleave={() => (hoveredPost = null)}
					>
						<span class="pip" aria-hidden="true"></span>
						{#each p.lines as line}<span class="line">{line}</span>{/each}
					</a>
				</li>
			{/each}
		</ul>
	</Row>

	<LinksRow {links} labelWidth={179} delay={450} />
</main>

<ProjectCard project={hoveredProject} />

<style>
	h1 {
		display: flex;
		flex-direction: column;
		font-weight: 400;
		padding-bottom: calc(2 * var(--u));
	}

	.hi {
		font-size: calc(58 * var(--u));
		line-height: 1;
		letter-spacing: -0.04em;
		margin-bottom: calc(-4 * var(--u));
	}

	.name {
		display: flex;
		font-size: calc(96 * var(--u));
		font-weight: 700;
		line-height: 0.92;
		letter-spacing: -0.04em;
		cursor: default;
	}

	/* each letter slides up out of a mask on load, then hops in a wave on hover */
	.mask {
		display: block;
		overflow: hidden;
		padding: 0.08em 0.02em 0.06em;
		margin: -0.08em -0.02em -0.06em;
	}

	.letter {
		display: block;
		animation: up 0.9s calc(380ms + var(--i) * 60ms) var(--out) both;
	}

	@keyframes up {
		from {
			translate: 0 110%;
		}
	}

	.name:hover .mask {
		animation: hop 0.55s calc(var(--i) * 55ms) var(--spring) both;
	}

	@keyframes hop {
		0%,
		100% {
			translate: 0 0;
		}
		40% {
			translate: 0 -0.16em;
		}
	}

	.about {
		font-size: calc(36 * var(--u));
		line-height: 1.25;
		max-width: calc(760 * var(--u));
	}

	ul {
		list-style: none;
	}

	/* projects zig-zag: even items sit on the bottom edge with tags above, odd ones on the top edge with tags below */
	.projects {
		display: flex;
		justify-content: space-between;
		height: 100%;
	}

	.projects li {
		display: flex;
		align-items: flex-end;
		transition: opacity 0.3s ease;
	}

	.projects li.up {
		align-items: flex-start;
	}

	.project {
		display: flex;
		flex-direction: column;
	}

	.up .project {
		flex-direction: column-reverse;
		padding-top: calc(3 * var(--u));
	}

	.tags {
		font-size: calc(13 * var(--u));
		line-height: 1.2;
		padding-left: calc(1 * var(--u));
	}

	.ptitle {
		font-size: calc(36 * var(--u));
		line-height: 1.05;
		transition: color 0.3s ease;
	}

	.dim li:not(.active) {
		opacity: 0.25;
	}

	.posts {
		display: flex;
		justify-content: space-between;
		padding-top: calc(8 * var(--u));
	}

	.posts li {
		transition: opacity 0.3s ease;
	}

	.post {
		position: relative;
		display: flex;
		flex-direction: column;
		font-size: calc(36 * var(--u));
		line-height: 1.15;
		transition: translate 0.45s var(--spring);
	}

	.active .post {
		translate: calc(10 * var(--u)) 0;
	}

	/* a tiny quarter in the post color flips in beside the title */
	.pip {
		position: absolute;
		left: calc(-22 * var(--u));
		top: calc(9 * var(--u));
		width: calc(14 * var(--u));
		height: calc(14 * var(--u));
		background: var(--c);
		border-radius: 0 0 100% 0;
		scale: 0;
		rotate: -180deg;
		transition:
			scale 0.4s var(--spring),
			rotate 0.5s var(--spring);
	}

	.active .pip {
		scale: 1;
		rotate: 0deg;
	}

	@media (max-width: 760px) {
		.hi {
			font-size: 40px;
		}

		.name {
			font-size: 72px;
		}

		.about {
			font-size: 22px;
		}

		.projects {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 20px 16px;
		}

		.projects li,
		.projects li.up {
			align-items: flex-start;
		}

		.up .project {
			flex-direction: column;
			padding-top: 0;
		}

		.tags {
			font-size: 13px;
		}

		.ptitle {
			font-size: 28px;
		}

		.posts {
			flex-direction: column;
			gap: 18px;
			padding: 0;
		}

		.post {
			font-size: 26px;
			flex-direction: row;
			flex-wrap: wrap;
			column-gap: 0.25em;
		}

		.pip {
			display: none;
		}
	}
</style>
