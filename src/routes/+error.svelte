<script lang="ts">
	import { page } from '$app/state';
	import Hero from '$lib/components/Hero.svelte';
	import Row from '$lib/components/Row.svelte';
	import Quarter from '$lib/components/Quarter.svelte';
</script>

<svelte:head>
	<title>{page.status} | neset</title>
</svelte:head>

<main class="page">
	<Hero color="#ff4d4d" back>
		<h1 class="rise" style:--d="300ms">{page.status}</h1>
	</Hero>

	<Row rot={180} hover="spin" delay={150}>
		<p class="msg rise" style:--d="300ms">this page rolled away. try the way back home.</p>
	</Row>

	<!-- four quarters tumbling after each other -->
	<div class="tumble" aria-hidden="true">
		{#each [0, 90, 180, 270] as rot, i}
			<div class="t" style:--i={i}><Quarter size={60} {rot} intro="drop" delay={400 + i * 90} /></div>
		{/each}
	</div>
</main>

<style>
	h1 {
		font-size: calc(96 * var(--u));
		font-weight: 700;
		line-height: 0.95;
		padding-bottom: calc(6 * var(--u));
	}

	.msg {
		font-size: calc(36 * var(--u));
		line-height: 1.25;
	}

	.tumble {
		display: flex;
		gap: calc(12 * var(--u));
	}

	.t {
		animation: roll 3.2s calc(1.4s + var(--i) * 0.2s) var(--spring) infinite;
	}

	@keyframes roll {
		0%,
		60%,
		100% {
			rotate: 0deg;
		}
		30% {
			rotate: 90deg;
		}
	}

	@media (max-width: 760px) {
		h1 {
			font-size: 72px;
		}

		.msg {
			font-size: 22px;
		}

		.tumble {
			--size: 48px;
		}
	}
</style>
