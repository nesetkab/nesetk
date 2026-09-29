<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Row from '$lib/components/Row.svelte';
	import LinksRow from '$lib/components/LinksRow.svelte';
	import { RESUME_COLOR, education, experience, skills, work, type Entry } from '$lib/resume';

	const links = [
		{ title: 'pdf', href: '/resume.pdf' },
		{ title: 'email', href: 'mailto:neset.kab@gmail.com' },
		{ title: 'linkedin', href: 'https://www.linkedin.com/in/neset-kablan' },
		{ title: 'github', href: 'https://github.com/nesetkab' }
	];

	const sections: { label: string; rot: number; entries: Entry[] }[] = [
		{ label: 'education', rot: 90, entries: education },
		{ label: 'projects', rot: 270, entries: work },
		{ label: 'experience', rot: 180, entries: experience }
	];
</script>

<svelte:head>
	<title>resume | neset</title>
	<meta name="description" content="Neşet Kablan's resume: electrical and computer engineering at Northeastern." />
</svelte:head>

<main class="page" style:--accent={RESUME_COLOR}>
	<Hero color={RESUME_COLOR} back>
		<p class="tags rise" style:--d="250ms">Neşet Kablan</p>
		<h1 class="rise" style:--d="330ms">resume</h1>
	</Hero>

	<Row rot={180} hover="wobble" delay={150}>
		<p class="about rise" style:--d="300ms">
			see everything here or<br />
			<a class="download" href="/resume.pdf" target="_blank" rel="noopener">open the pdf</a>
		</p>
	</Row>

	{#each sections as section, s}
		<Row rot={section.rot} label={section.label} labelWidth={190} delay={200 + s * 60}>
			<div class="entries">
				{#each section.entries as entry, i}
					<article class="entry rise" style:--d="{300 + i * 90}ms">
						<header>
							<h3>{entry.title}</h3>
							<span class="when">{entry.when}</span>
						</header>
						{#if entry.tags || entry.where}
							<p class="meta">
								{entry.tags}{#if entry.tags && entry.where}<span class="sep">/</span>{/if}{entry.where ?? ''}
							</p>
						{/if}
						{#if entry.points.length}
							<ul>
								{#each entry.points as point, j}
									<li style:--j={j}>{point}</li>
								{/each}
							</ul>
						{/if}
					</article>
				{/each}
			</div>
		</Row>
	{/each}

	<Row rot={90} label="skills" labelWidth={190} delay={380}>
		<dl class="skills">
			{#each skills as skill, i}
				<div class="skill rise" style:--d="{300 + i * 80}ms">
					<dt>{skill.label}</dt>
					<dd>{skill.value}</dd>
				</div>
			{/each}
		</dl>
	</Row>

	<LinksRow {links} labelWidth={190} delay={450} />
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
	}

	.download {
		background: linear-gradient(var(--accent), var(--accent)) 0 100% / 100% 0.1em no-repeat;
		transition: background-size 0.35s var(--out);
	}

	.download:hover,
	.download:focus-visible {
		background-size: 100% 100%;
	}

	.entries {
		display: flex;
		flex-direction: column;
		gap: calc(30 * var(--u));
		padding-top: calc(6 * var(--u));
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: calc(20 * var(--u));
	}

	h3 {
		font-size: calc(28 * var(--u));
		font-weight: 400;
		line-height: 1.15;
	}

	.when {
		flex: none;
		font-size: calc(16 * var(--u));
		color: var(--muted);
	}

	.meta {
		font-size: calc(16 * var(--u));
		margin-top: calc(4 * var(--u));
		color: var(--muted);
	}

	.sep {
		margin: 0 0.4em;
	}

	ul {
		list-style: none;
		margin-top: calc(10 * var(--u));
		display: flex;
		flex-direction: column;
		gap: calc(6 * var(--u));
	}

	li {
		position: relative;
		padding-left: calc(24 * var(--u));
		font-size: calc(19 * var(--u));
		line-height: 1.35;
		letter-spacing: -0.02em;
	}

	li::before {
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

	.entry:hover li::before {
		rotate: 180deg;
	}

	.skills {
		display: flex;
		flex-direction: column;
		gap: calc(10 * var(--u));
		padding-top: calc(8 * var(--u));
	}

	.skill {
		display: grid;
		grid-template-columns: calc(130 * var(--u)) 1fr;
		gap: calc(16 * var(--u));
		font-size: calc(19 * var(--u));
		line-height: 1.35;
	}

	dt {
		font-weight: 700;
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

		header {
			flex-direction: column;
			gap: 2px;
		}

		h3 {
			font-size: 22px;
		}

		.when,
		.meta {
			font-size: 14px;
		}

		li,
		.skill {
			font-size: 16px;
		}

		li {
			padding-left: 20px;
		}

		.skill {
			grid-template-columns: 1fr;
			gap: 0;
		}
	}
</style>
