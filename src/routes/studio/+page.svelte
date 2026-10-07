<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Row from '$lib/components/Row.svelte';
	import LinksRow from '$lib/components/LinksRow.svelte';
	import NotchMark from '$lib/components/NotchMark.svelte';
	import '@fontsource/fraunces/latin-800.css';
	import { burst } from '$lib/confetti';
	import { palette } from '$lib/data';
	import { inview } from '$lib/motion';
	import {
		STUDIO_COLOR,
		INQUIRY_EMAIL,
		INQUIRY_ENDPOINT,
		work,
		services,
		steps,
		faqs,
		needs,
		budgets,
		timelines
	} from '$lib/studio';

	const links = [
		{ title: 'email', href: `mailto:${INQUIRY_EMAIL}` },
		{ title: 'github', href: 'https://github.com/nesetkab' },
		{ title: 'resume', href: '/resume' },
		{ title: 'neşet', href: '/' }
	];

	let form: HTMLFormElement;
	let sendButton: HTMLButtonElement;
	let need = $state('not sure');
	let budget = $state('not sure');
	let timeline = $state('no rush');
	let status = $state<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');

	const external = (href: string) => /^https?:/.test(href);

	function pick(id: string) {
		need = id;
		document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function celebrate() {
		const r = sendButton.getBoundingClientRect();
		burst(r.left + r.width / 3, r.top + r.height / 3, palette, 44);
	}

	async function send(e: SubmitEvent) {
		e.preventDefault();
		if (!form.reportValidity()) return;
		const data = new FormData(form);
		if (data.get('website')) {
			status = 'sent';
			return;
		}

		if (!INQUIRY_ENDPOINT) {
			const body = [
				`name: ${data.get('name')}`,
				`email: ${data.get('email')}`,
				`for: ${data.get('org') || '-'}`,
				`need: ${need}`,
				`budget: ${budget}`,
				`timeline: ${timeline}`,
				'',
				`${data.get('message')}`
			].join('\n');
			const subject = `website inquiry from ${data.get('name')}`;
			location.href = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
			status = 'mailto';
			return;
		}

		status = 'sending';
		try {
			const res = await fetch(INQUIRY_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
			if (!res.ok) throw new Error(String(res.status));
			status = 'sent';
			for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('.field input, .field textarea')) el.value = '';
			need = 'not sure';
			budget = 'not sure';
			timeline = 'no rush';
			celebrate();
		} catch {
			status = 'error';
		}
	}
</script>

<svelte:head>
	<title>notch studio | websites by neşet</title>
	<meta
		name="description"
		content="notch studio: websites and web apps for teams, clubs, and small businesses, designed and built by neşet kablan."
	/>
	<link rel="icon" href="/notch/mark.svg" type="image/svg+xml" />
</svelte:head>

<main class="page" style:--accent={STUDIO_COLOR}>
	<Hero color={STUDIO_COLOR} back>
		<p class="tags rise" style:--d="250ms">a web design studio by neşet</p>
		<h1 class="rise" style:--d="330ms"><NotchMark size="1.58em" /><span>notch<br />studio</span></h1>
	</Hero>

	<Row rot={180} hover="wobble" delay={150}>
		<div class="intro">
			<p class="about rise" style:--d="300ms">
				websites for teams, clubs, and small businesses. designed and built by one person, start to finish.
			</p>
			<p class="cta rise" style:--d="420ms">
				<a class="fill" href="#inquire">get a quote</a>
				<a class="fill" href="#work">see the work</a>
			</p>
		</div>
	</Row>

	<div id="work" class="anchor">
		<Row rot={90} label="work" labelWidth={190} delay={200}>
			<div class="work">
				{#each work as item, i}
					<article class="piece rise" class:wide={i === 0} style:--d="{300 + i * 100}ms">
						<a
							class="shot peek-host"
							href={item.live}
							target={external(item.live) ? '_blank' : undefined}
							rel={external(item.live) ? 'noopener noreferrer' : undefined}
							aria-label="visit {item.title}"
						>
							<img src={item.image} alt="{item.title} home page" loading="lazy" />
							<span class="peek" aria-hidden="true"><span>visit</span></span>
						</a>
						<div class="meta">
							<h3>{item.title}</h3>
							<p class="kind">{item.kind} <span class="stack">/ {item.stack}</span></p>
							{#if item.more}
								<a class="fill more" href={item.more}>more about it</a>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</Row>
	</div>

	<Row rot={270} label="services" labelWidth={190} delay={200}>
		<div class="services">
			{#each services as s, i}
				<div class="service rise" style:--d="{300 + i * 100}ms">
					<h3>{s.name}</h3>
					<p class="line">{s.line}</p>
					<ul class="ticks">
						{#each s.points as point, j}
							<li style:--j={j}>{point}</li>
						{/each}
					</ul>
					<button type="button" class="fill ask" onclick={() => pick(s.id)}>ask about this</button>
				</div>
			{/each}
		</div>
	</Row>

	<Row rot={180} label="process" labelWidth={190} delay={200}>
		<ol class="steps">
			{#each steps as step, i}
				<li class="step rise" style:--d="{300 + i * 100}ms" style:--r="{i * 90}deg">
					<span class="mark" aria-hidden="true"></span>
					<h3><span class="num">{i + 1}</span> {step.name}</h3>
					<p>{step.text}</p>
				</li>
			{/each}
		</ol>
	</Row>

	<Row rot={90} label="faq" labelWidth={190} delay={200}>
		<div class="faqs">
			{#each faqs as f, i}
				<details class="faq rise" style:--d="{300 + i * 70}ms">
					<summary><span class="toggle" aria-hidden="true"></span>{f.q}</summary>
					<p>{f.a}</p>
				</details>
			{/each}
		</div>
	</Row>

	<div id="inquire" class="anchor">
		<Row rot={270} label="inquire" labelWidth={190} delay={200}>
			<form class="inquiry rise" style:--d="300ms" bind:this={form} onsubmit={send}>
				<p class="lead">tell me about your project and i will get back to you with a price.</p>

				<div class="pair">
					<label class="field">
						<span>name</span>
						<input name="name" autocomplete="name" required />
					</label>
					<label class="field">
						<span>email</span>
						<input name="email" type="email" autocomplete="email" required />
					</label>
				</div>

				<label class="field">
					<span>who is it for <em>optional</em></span>
					<input name="org" autocomplete="organization" placeholder="a team, a club, a business" />
				</label>

				<fieldset>
					<legend>what do you need</legend>
					<div class="chips">
						{#each needs as option}
							<label class="chip">
								<input type="radio" name="need" value={option} bind:group={need} />
								<span><i aria-hidden="true"></i>{option}</span>
							</label>
						{/each}
					</div>
				</fieldset>

				<fieldset>
					<legend>budget</legend>
					<div class="chips">
						{#each budgets as option}
							<label class="chip">
								<input type="radio" name="budget" value={option} bind:group={budget} />
								<span><i aria-hidden="true"></i>{option}</span>
							</label>
						{/each}
					</div>
				</fieldset>

				<fieldset>
					<legend>timeline</legend>
					<div class="chips">
						{#each timelines as option}
							<label class="chip">
								<input type="radio" name="timeline" value={option} bind:group={timeline} />
								<span><i aria-hidden="true"></i>{option}</span>
							</label>
						{/each}
					</div>
				</fieldset>

				<label class="field">
					<span>tell me about it</span>
					<textarea name="message" rows="4" required placeholder="what it is, what it should do, any sites you like"></textarea>
				</label>

				<label class="trap" aria-hidden="true">
					<span>website</span>
					<input name="website" tabindex="-1" autocomplete="off" />
				</label>

				<div class="submit">
					<button class="send" class:busy={status === 'sending'} bind:this={sendButton} disabled={status === 'sending'}>
						<span>{status === 'sending' ? 'sending' : 'send'}</span>
					</button>
					<p class="status" aria-live="polite">
						{#if status === 'sent'}
							got it, thanks. i will get back to you soon.
						{:else if status === 'mailto'}
							your email app should open with everything filled in. hit send there.
						{:else if status === 'error'}
							that did not go through. email me at <a class="fill" href="mailto:{INQUIRY_EMAIL}">{INQUIRY_EMAIL}</a>.
						{:else}
							or email <a class="fill" href="mailto:{INQUIRY_EMAIL}">{INQUIRY_EMAIL}</a>
						{/if}
					</p>
				</div>
			</form>
		</Row>
	</div>

	<LinksRow {links} labelWidth={190} delay={300} />
</main>

<style>
	.tags {
		font-size: calc(28 * var(--u));
		line-height: 1;
		margin-bottom: calc(10 * var(--u));
		padding-left: calc(2 * var(--u));
	}

	h1 {
		display: flex;
		align-items: flex-end;
		gap: 0.24em;
		font-family: 'Fraunces', var(--font);
		font-size: calc(64 * var(--u));
		font-weight: 800;
		line-height: 0.82;
		letter-spacing: -0.03em;
		padding-bottom: calc(4 * var(--u));
	}

	h1 :global(svg) {
		margin-bottom: 0.055em;
	}

	.anchor {
		scroll-margin-top: calc(40 * var(--u));
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: calc(14 * var(--u));
	}

	.about {
		font-size: calc(36 * var(--u));
		line-height: 1.25;
		max-width: calc(760 * var(--u));
	}

	.cta {
		display: flex;
		gap: calc(32 * var(--u));
		font-size: calc(24 * var(--u));
	}

	h3 {
		font-weight: 400;
		line-height: 1.1;
	}

	.work {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: calc(36 * var(--u)) calc(20 * var(--u));
		padding-top: calc(8 * var(--u));
	}

	.piece.wide {
		grid-column: span 2;
	}

	.shot {
		position: relative;
		display: block;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--fg) 12%, transparent);
	}

	.wide .shot {
		aspect-ratio: 9 / 4;
	}

	.shot img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
		transition: scale 0.6s var(--spring);
	}

	.shot:hover img,
	.shot:focus-visible img {
		scale: 1.04;
	}

	.meta {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: calc(4 * var(--u)) calc(16 * var(--u));
		margin-top: calc(14 * var(--u));
	}

	.meta h3 {
		font-size: calc(28 * var(--u));
	}

	.kind {
		font-size: calc(17 * var(--u));
	}

	.stack {
		color: var(--muted);
	}

	.more {
		margin-left: auto;
		font-size: calc(17 * var(--u));
	}

	.services {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: calc(24 * var(--u));
		padding-top: calc(8 * var(--u));
	}

	.service {
		display: flex;
		flex-direction: column;
		gap: calc(10 * var(--u));
		padding-top: calc(14 * var(--u));
		border-top: 1.5px solid var(--fg);
	}

	.service h3 {
		font-size: calc(28 * var(--u));
	}

	.line {
		font-size: calc(17 * var(--u));
		color: var(--muted);
		line-height: 1.3;
	}

	.ticks {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: calc(6 * var(--u));
		margin-top: calc(4 * var(--u));
	}

	.ticks li {
		position: relative;
		padding-left: 1.3em;
		font-size: calc(18 * var(--u));
		line-height: 1.3;
	}

	.ticks li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.32em;
		width: 0.62em;
		height: 0.62em;
		background: var(--accent);
		border-radius: 0 0 100% 0;
		transition: rotate 0.6s var(--spring) calc(var(--j) * 70ms);
	}

	.service:hover .ticks li::before {
		rotate: 180deg;
	}

	.ask {
		align-self: flex-start;
		margin-top: auto;
		padding-top: calc(10 * var(--u));
		font-size: calc(18 * var(--u));
		background-position: 0 100%;
	}

	.steps {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: calc(24 * var(--u));
		padding-top: calc(8 * var(--u));
	}

	.step {
		display: flex;
		flex-direction: column;
		gap: calc(10 * var(--u));
	}

	.mark {
		display: block;
		width: calc(34 * var(--u));
		height: calc(34 * var(--u));
		background: var(--accent);
		border-radius: 0 0 100% 0;
		rotate: var(--r);
		transition: rotate 0.7s var(--spring);
	}

	.step:hover .mark {
		rotate: calc(var(--r) + 90deg);
	}

	.step h3 {
		font-size: calc(26 * var(--u));
	}

	.num {
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}

	.step p {
		font-size: calc(17 * var(--u));
		line-height: 1.35;
	}

	.faqs {
		display: flex;
		flex-direction: column;
		padding-top: calc(6 * var(--u));
		max-width: calc(720 * var(--u));
	}

	.faq {
		border-bottom: 1px solid color-mix(in srgb, var(--fg) 14%, transparent);
	}

	.faq summary {
		display: flex;
		align-items: center;
		gap: calc(14 * var(--u));
		padding: calc(14 * var(--u)) 0;
		font-size: calc(24 * var(--u));
		cursor: pointer;
		list-style: none;
	}

	.faq summary::-webkit-details-marker {
		display: none;
	}

	.toggle {
		flex: none;
		width: calc(16 * var(--u));
		height: calc(16 * var(--u));
		background: var(--fg);
		border-radius: 0 0 100% 0;
		rotate: -90deg;
		transition:
			rotate 0.5s var(--spring),
			background-color 0.3s ease;
	}

	.faq[open] .toggle {
		rotate: 90deg;
		background: var(--accent);
	}

	.faq summary:hover .toggle {
		background: var(--accent);
	}

	.faq p {
		padding: 0 0 calc(16 * var(--u)) calc(30 * var(--u));
		font-size: calc(19 * var(--u));
		line-height: 1.4;
		color: var(--muted);
	}

	.inquiry {
		display: flex;
		flex-direction: column;
		gap: calc(26 * var(--u));
		max-width: calc(720 * var(--u));
		padding-top: calc(8 * var(--u));
	}

	.lead {
		font-size: calc(24 * var(--u));
		line-height: 1.3;
	}

	.pair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: calc(24 * var(--u));
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: calc(8 * var(--u));
	}

	.field > span,
	legend {
		font-size: calc(16 * var(--u));
		color: color-mix(in srgb, var(--fg) 70%, transparent);
	}

	em {
		font-style: normal;
		opacity: 0.7;
	}

	.field input,
	.field textarea {
		width: 100%;
		padding: calc(12 * var(--u)) calc(14 * var(--u));
		font: inherit;
		font-size: calc(20 * var(--u));
		letter-spacing: inherit;
		color: var(--fg);
		background: var(--faint);
		border: 1.5px solid transparent;
		border-radius: 8px;
		outline: none;
		resize: vertical;
		transition:
			border-color 0.25s ease,
			background-color 0.25s ease;
	}

	.field input::placeholder,
	.field textarea::placeholder {
		color: color-mix(in srgb, var(--fg) 30%, transparent);
	}

	.field input:focus,
	.field textarea:focus {
		border-color: var(--accent);
		background: var(--bg);
	}

	.field input:user-invalid,
	.field textarea:user-invalid {
		border-color: #ff4d4d;
	}

	fieldset {
		border: 0;
	}

	legend {
		margin-bottom: calc(8 * var(--u));
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: calc(10 * var(--u));
	}

	.chip {
		position: relative;
	}

	.chip input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.chip span {
		display: inline-flex;
		align-items: center;
		padding: 0.35em 0.9em;
		font-size: calc(18 * var(--u));
		border: 1.5px solid color-mix(in srgb, var(--fg) 30%, transparent);
		border-radius: 999px;
		cursor: pointer;
		transition:
			background-color 0.25s ease,
			border-color 0.25s ease,
			color 0.25s ease;
	}

	.chip i {
		width: 0;
		height: 0.6em;
		margin-right: 0;
		background: currentColor;
		border-radius: 0 0 100% 0;
		scale: 0;
		rotate: -180deg;
		transition:
			width 0.3s var(--out),
			margin-right 0.3s var(--out),
			scale 0.45s var(--spring),
			rotate 0.45s var(--spring);
	}

	.chip span:hover {
		border-color: var(--fg);
	}

	.chip input:checked + span {
		background: var(--accent);
		border-color: var(--accent);
		color: #000;
	}

	.chip input:checked + span i {
		width: 0.6em;
		margin-right: 0.45em;
		scale: 1;
		rotate: 0deg;
	}

	.chip input:focus-visible + span {
		outline: 2px solid var(--accent);
		outline-offset: 3px;
	}

	.trap {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.submit {
		display: flex;
		align-items: flex-end;
		gap: calc(24 * var(--u));
		margin-top: calc(8 * var(--u));
	}

	.send {
		flex: none;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		width: calc(130 * var(--u));
		height: calc(130 * var(--u));
		padding: calc(16 * var(--u)) 0 0 calc(18 * var(--u));
		background: var(--accent);
		border-radius: 0 0 100% 0;
		color: #000;
		font-size: calc(26 * var(--u));
		transition:
			rotate 0.6s var(--spring),
			scale 0.3s var(--spring),
			background-color 0.45s ease;
	}

	.send:hover {
		scale: 1.06;
	}

	.send:active {
		scale: 0.95;
	}

	.send.busy {
		animation: turn 0.9s var(--spring) infinite;
	}

	@keyframes turn {
		to {
			rotate: 90deg;
		}
	}

	.status {
		font-size: calc(18 * var(--u));
		line-height: 1.35;
		color: var(--muted);
		padding-bottom: calc(6 * var(--u));
	}

	@media (max-width: 760px) {
		.tags {
			font-size: 18px;
		}

		h1 {
			font-size: 44px;
		}

		.about {
			font-size: 22px;
		}

		.cta {
			font-size: 18px;
		}

		.work,
		.services,
		.pair {
			grid-template-columns: 1fr;
		}

		.piece.wide {
			grid-column: auto;
		}

		.wide .shot {
			aspect-ratio: 16 / 10;
		}

		.meta h3,
		.service h3 {
			font-size: 24px;
		}

		.kind,
		.more,
		.line {
			font-size: 15px;
		}

		.ticks li,
		.ask {
			font-size: 16px;
		}

		.steps {
			grid-template-columns: 1fr 1fr;
			gap: 24px 16px;
		}

		.mark {
			width: 28px;
			height: 28px;
		}

		.step h3 {
			font-size: 20px;
		}

		.step p {
			font-size: 15px;
		}

		.faq summary {
			font-size: 18px;
			gap: 12px;
		}

		.toggle {
			width: 12px;
			height: 12px;
		}

		.faq p {
			font-size: 16px;
			padding-left: 24px;
		}

		.lead {
			font-size: 19px;
		}

		.inquiry {
			gap: 22px;
		}

		.field > span,
		legend {
			font-size: 14px;
		}

		.field input,
		.field textarea {
			font-size: 17px;
			padding: 11px 12px;
		}

		.chips {
			gap: 8px;
		}

		.chip span {
			font-size: 15px;
			padding: 0.4em 0.85em;
		}

		.send {
			width: 104px;
			height: 104px;
			font-size: 20px;
			padding: 12px 0 0 14px;
		}

		.status {
			font-size: 15px;
		}
	}
</style>
