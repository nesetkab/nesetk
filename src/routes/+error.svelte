<!--
	The error page. For a 404 the circle has fallen apart: click the four quarters to turn them
	until they make a whole circle again.
-->
<script lang="ts">
	import { page } from '$app/state';
	import Hero from '$lib/components/Hero.svelte';
	import Row from '$lib/components/Row.svelte';
	import Quarter from '$lib/components/Quarter.svelte';
	import { burst } from '$lib/confetti';
	import { palette } from '$lib/data';

	const COLOR = '#ff4d4d';

	// the quarter turn each piece needs: top-left, top-right, bottom-left, bottom-right,
	// so every arc faces out and the four notches meet in the middle
	const target = [2, 3, 1, 0];

	function scramble() {
		let t: number[];
		do t = target.map(() => Math.floor(Math.random() * 4));
		while (t.filter((v, i) => v !== target[i]).length < 3);
		return t;
	}

	// turns only ever go up, so every click spins forward
	let turns = $state(scramble());
	let moves = $state(0);
	let grid: HTMLDivElement;

	let solved = $derived(turns.every((t, i) => t % 4 === target[i]));

	function turn(i: number) {
		if (solved) return;
		turns[i] += 1;
		moves += 1;
		if (turns.every((t, j) => t % 4 === target[j])) {
			// wait for the last piece to land, then celebrate
			setTimeout(() => {
				const r = grid.getBoundingClientRect();
				burst(r.left + r.width / 2, r.top + r.height / 2, palette, 48);
			}, 450);
		}
	}

	function again() {
		// keep the pieces spinning forward into a new scramble
		const next = scramble();
		turns = turns.map((t, i) => t + ((next[i] - (t % 4) + 4) % 4 || 4));
		moves = 0;
	}

	let lost = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{page.status} | neşet</title>
</svelte:head>

<main class="page">
	<Hero color={COLOR} back>
		<p class="tags rise" style:--d="250ms">{lost ? 'page not found' : (page.error?.message ?? 'something broke')}</p>
		<h1 class="rise" style:--d="330ms">{page.status}</h1>
	</Hero>

	<Row rot={180} hover="wobble" delay={150}>
		<p class="msg rise" style:--d="300ms">
			{lost ? 'this page rolled away.' : 'something went wrong here.'} put the circle back together, or
			<a class="home" href="/">head home</a>.
		</p>
	</Row>

	<Row rot={90} label="fix it" delay={250} hover="none">
		<div class="puzzle">
			<div class="grid" class:solved bind:this={grid}>
				{#each turns as t, i}
					<button
						class="piece"
						onclick={() => turn(i)}
						disabled={solved}
						aria-label="turn piece {i + 1}"
					>
						<Quarter size={110} rot={t * 90} color={solved ? COLOR : 'var(--fg)'} intro="drop" delay={400 + i * 110} />
					</button>
				{/each}
			</div>

			<div class="status rise" style:--d="700ms" aria-live="polite">
				{#if solved}
					<p class="big">fixed in {moves} {moves === 1 ? 'move' : 'moves'}.</p>
					<p><a class="home" href="/">go home</a> or <button class="again" onclick={again}>break it again</button></p>
				{:else}
					<p class="big">moves: {moves}</p>
					<p class="hint">click a piece to turn it.</p>
				{/if}
			</div>
		</div>
	</Row>
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

	.msg {
		font-size: calc(36 * var(--u));
		line-height: 1.25;
		max-width: calc(760 * var(--u));
	}

	.home,
	.again {
		background: linear-gradient(var(--accent), var(--accent)) 0 100% / 100% 0.1em no-repeat;
		transition: background-size 0.35s var(--out);
	}

	.home:hover,
	.home:focus-visible,
	.again:hover,
	.again:focus-visible {
		background-size: 100% 100%;
	}

	.puzzle {
		display: flex;
		align-items: center;
		gap: calc(56 * var(--u));
		padding-top: calc(8 * var(--u));
	}

	/* the pieces sit apart while broken and snap together once solved */
	.grid {
		display: grid;
		grid-template-columns: repeat(2, auto);
		gap: calc(14 * var(--u));
		transition: gap 0.5s var(--spring) 0.3s;
	}

	.grid.solved {
		gap: 0;
		animation: whole 1.1s var(--spring) 0.55s;
	}

	@keyframes whole {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 360deg;
		}
	}

	.piece {
		display: block;
		-webkit-tap-highlight-color: transparent;
		transition: scale 0.25s var(--spring);
	}

	.piece:not(:disabled):hover {
		scale: 1.05;
	}

	.piece:not(:disabled):active {
		scale: 0.94;
	}

	.piece:disabled {
		cursor: default;
	}

	.status {
		display: flex;
		flex-direction: column;
		gap: calc(8 * var(--u));
		font-size: calc(24 * var(--u));
		line-height: 1.25;
	}

	.big {
		font-size: calc(36 * var(--u));
		line-height: 1.1;
	}

	.hint {
		color: var(--muted);
	}

	@media (max-width: 760px) {
		.tags {
			font-size: 18px;
		}

		h1 {
			font-size: 72px;
		}

		.msg {
			font-size: 22px;
		}

		.puzzle {
			flex-direction: column;
			align-items: flex-start;
			gap: 24px;
		}

		.grid {
			--size: 88px;
			gap: 10px;
		}

		.status {
			font-size: 18px;
		}

		.big {
			font-size: 26px;
		}
	}
</style>
