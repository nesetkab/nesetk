<script lang="ts">
	import { tick } from 'svelte';
	import { reduced } from '$lib/motion';

	let { images, title }: { images: string[]; title: string } = $props();

	let dialog: HTMLDialogElement;
	let img: HTMLImageElement;
	let closer: HTMLButtonElement;
	let index = $state(0);
	let closing = false;

	const thumb = () => document.querySelector<HTMLElement>(`[data-shot="${index}"]`);

	const easing = 'cubic-bezier(0.2, 0.9, 0.25, 1)';

	function frames(from: DOMRect) {
		const to = img.getBoundingClientRect();
		const s = Math.max(from.width / to.width, from.height / to.height);
		const x = from.left + from.width / 2 - (to.left + to.width / 2);
		const y = from.top - to.top;
		const side = (to.width * s - from.width) / 2 / s;
		const bottom = (to.height * s - from.height) / s;
		return [
			{ transform: `translate(${x}px, ${y}px) scale(${s})`, clipPath: `inset(0 ${side}px ${bottom}px ${side}px)` },
			{ transform: 'none', clipPath: 'inset(0 0 0 0)' }
		];
	}

	export async function show(i: number) {
		index = i;
		closing = false;
		dialog.showModal();
		closer.focus();
		await tick();
		await img.decode().catch(() => {});
		const from = thumb();
		if (reduced() || !from) return;
		img.animate(frames(from.getBoundingClientRect()), { duration: 520, easing });
	}

	async function close() {
		if (closing || !dialog.open) return;
		closing = true;
		dialog.classList.add('leaving');
		const to = thumb();
		if (!reduced() && to) {
			await img
				.animate(frames(to.getBoundingClientRect()).reverse(), { duration: 380, easing, fill: 'forwards' })
				.finished.catch(() => {});
		}
		dialog.close();
		dialog.classList.remove('leaving');
		img.getAnimations().forEach((a) => a.cancel());
	}

	async function go(step: number) {
		if (images.length < 2) return;
		index = (index + step + images.length) % images.length;
		await tick();
		if (!reduced()) {
			img.animate(
				[
					{ opacity: 0, transform: `translateX(${step * 40}px)` },
					{ opacity: 1, transform: 'none' }
				],
				{ duration: 360, easing }
			);
		}
	}

	function key(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') go(1);
		if (e.key === 'ArrowLeft') go(-1);
	}

	function cancel(e: Event) {
		e.preventDefault();
		close();
	}
</script>

<dialog class="lightbox" bind:this={dialog} oncancel={cancel} onkeydown={key} aria-label="{title} screenshots">
	<button type="button" class="stage" onclick={close} tabindex="-1" aria-label="close">
		<img bind:this={img} src={images[index]} alt="{title} screenshot {index + 1}" />
	</button>
	<div class="bar">
		{#if images.length > 1}
			<button type="button" class="fill" onclick={() => go(-1)}>prev</button>
			<span class="count">{index + 1} / {images.length}</span>
			<button type="button" class="fill" onclick={() => go(1)}>next</button>
		{/if}
		<button type="button" class="fill close" bind:this={closer} onclick={close}>close</button>
	</div>
</dialog>

<style>
	.lightbox {
		width: 100vw;
		height: 100dvh;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--fg);
		overflow: hidden;
	}

	.lightbox[open] {
		display: flex;
		flex-direction: column;
	}

	.lightbox::backdrop {
		background: color-mix(in srgb, var(--bg) 98%, transparent);
		animation: fade 0.35s ease both;
	}

	.lightbox:global(.leaving)::backdrop {
		animation: fade 0.3s ease reverse both;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	.stage {
		flex: 1;
		min-height: 0;
		display: grid;
		place-items: center;
		padding: 5vh 4vw 0;
		cursor: zoom-out;
	}

	img {
		max-width: 100%;
		max-height: calc(100dvh - 5vh - 96px);
		object-fit: contain;
		border-radius: 8px;
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--fg) 14%, transparent);
		transform-origin: top center;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 32px;
		padding: 22px 16px 28px;
		font-size: 22px;
		animation: fade 0.4s 0.15s ease both;
	}

	.lightbox:global(.leaving) .bar {
		opacity: 0;
		transition: opacity 0.15s;
	}

	.count {
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}

	.close {
		margin-left: 16px;
	}

	:global(html:has(.lightbox[open])) {
		overflow: hidden;
	}

	@media (max-width: 760px) {
		.bar {
			gap: 20px;
			font-size: 18px;
		}
	}
</style>
