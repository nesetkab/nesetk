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

	const name = [...'neşet'];

	/** splits items into rows of n, padding the last row with nulls so it spaces out like the full ones */
	function rows<T>(items: T[], n: number) {
		const out: (T | null)[][] = [];
		for (let i = 0; i < items.length; i += n) {
			const row: (T | null)[] = items.slice(i, i + n);
			while (row.length < n) row.push(null);
			out.push(row);
		}
		return out;
	}
</script>

<svelte:head>
	<title>neşet</title>
	<meta
		name="description"
		content="neşet: a Northeastern freshman studying EECE, interested in ML, semiconductors, and design."
	/>
</svelte:head>

<main class="page">
	<Hero color={HOME_COLOR}>
		<h1>
			<span class="hi rise" style:--d="250ms">hi, i’m</span>
			<span class="name" aria-label="neşet">
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
		<div class="posts" class:dim={!!hoveredPost}>
			{#each rows(posts, 3) as row, r}
				<ul class="brow">
					{#each row as p, c}
						{@const i = r * 3 + c}
						{#if p}
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
						{:else}
							<li class="spacer" aria-hidden="true"></li>
						{/if}
					{/each}
				</ul>
			{/each}
		</div>
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
	/* extra room at the bottom keeps the cedilla on the ş inside the mask */
	.mask {
		display: block;
		overflow: hidden;
		padding: 0.08em 0.02em 0.24em;
		margin: -0.08em -0.02em -0.24em;
	}

	.letter {
		display: block;
		animation: up 0.9s calc(380ms + var(--i) * 60ms) var(--out) both;
	}

	/* far enough down to start fully below the taller mask */
	@keyframes up {
		from {
			translate: 0 140%;
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

	/*
		projects zig-zag: even items sit on the bottom edge with tags above, odd ones on the top edge with tags below.
		Titles never break; when a line is full the next project wraps onto a new band.
	*/
	.projects {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: calc(30 * var(--u)) calc(28 * var(--u));
	}

	.projects li {
		height: calc(95 * var(--u));
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
		white-space: nowrap;
		font-size: calc(13 * var(--u));
		line-height: 1.2;
		padding-left: calc(1 * var(--u));
	}

	.ptitle {
		white-space: nowrap;
		font-size: calc(36 * var(--u));
		line-height: 1.05;
		transition: color 0.3s ease;
	}

	.dim li:not(.active) {
		opacity: 0.25;
	}

	.posts {
		display: flex;
		flex-direction: column;
		gap: calc(28 * var(--u));
		padding-top: calc(8 * var(--u));
	}

	.brow {
		display: flex;
		justify-content: space-between;
		gap: calc(40 * var(--u));
	}

	.spacer {
		width: 0;
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

		.spacer {
			display: none;
		}

		.projects li,
		.projects li.up {
			height: auto;
			align-items: flex-start;
		}

		.ptitle,
		.tags {
			white-space: normal;
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

		.posts,
		.brow {
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
