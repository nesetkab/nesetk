<!--
	Light / dark switch. The choice is saved, and the new theme sweeps in as a circle from the button.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { reduced } from '$lib/motion';

	let dark = $state(false);
	let button: HTMLButtonElement;

	const system = () => matchMedia('(prefers-color-scheme: dark)').matches;

	onMount(() => {
		const set = document.documentElement.dataset.theme;
		dark = set ? set === 'dark' : system();
		const mq = matchMedia('(prefers-color-scheme: dark)');
		const follow = () => {
			if (!document.documentElement.dataset.theme) dark = mq.matches;
		};
		mq.addEventListener('change', follow);
		return () => mq.removeEventListener('change', follow);
	});

	function apply(next: boolean) {
		dark = next;
		document.documentElement.dataset.theme = next ? 'dark' : 'light';
		// the browser bar (theme-color) follows the chosen theme, not the system one
		for (const m of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
			m.content = next ? '#0b0b0c' : '#ffffff';
		}
		try {
			localStorage.setItem('theme', next ? 'dark' : 'light');
		} catch {}
	}

	async function toggle() {
		const next = !dark;
		if (!document.startViewTransition || reduced()) return apply(next);

		const r = button.getBoundingClientRect();
		const x = r.left + r.height / 2;
		const y = r.top + r.height / 2;
		const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

		const t = document.startViewTransition(() => apply(next));
		await t.ready;
		document.documentElement.animate(
			{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
			{ duration: 750, easing: 'cubic-bezier(0.7, 0, 0.25, 1)', pseudoElement: '::view-transition-new(root)' }
		);
	}
</script>

<button
	class="toggle rise"
	bind:this={button}
	onclick={toggle}
	style:--d="450ms"
	aria-label="switch to {dark ? 'light' : 'dark'} mode"
	aria-pressed={dark}
>
	<span class="icon" class:dark aria-hidden="true">
		<span class="half"></span>
	</span>
	<span class="word">{dark ? 'light' : 'dark'}</span>
</button>

<style>
	.toggle {
		display: flex;
		align-items: center;
		gap: calc(8 * var(--u));
		font-size: calc(28 * var(--u));
		line-height: 1;
	}

	/* a circle split into a solid half and an outlined half; it rolls over half a turn on each switch */
	.icon {
		position: relative;
		display: block;
		width: calc(22 * var(--u));
		height: calc(22 * var(--u));
		border: calc(2 * var(--u)) solid currentColor;
		border-radius: 50%;
		overflow: hidden;
		transition:
			rotate 0.7s var(--spring),
			scale 0.3s var(--spring);
	}

	.icon.dark {
		rotate: 180deg;
	}

	.half {
		position: absolute;
		inset: 0 50% 0 0;
		background: currentColor;
	}

	.toggle:hover .icon {
		scale: 1.12;
	}

	@media (max-width: 760px) {
		.toggle {
			font-size: 18px;
			gap: 6px;
		}

		.icon {
			width: 16px;
			height: 16px;
			border-width: 1.5px;
		}
	}
</style>
