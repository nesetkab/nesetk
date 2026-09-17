<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';

	let { children } = $props();
</script>

<div class="relative min-h-screen bg-background font-sans overflow-hidden">
	<Nav />
	<div class="relative z-10">
		{@render children()}
	</div>
</div>
