<script lang="ts">
	import '../app.css';
	import Wipe from '$lib/components/Wipe.svelte';
	import Cursor from '$lib/components/Cursor.svelte';

	let { children } = $props();
</script>

{@render children()}

<Wipe />
<Cursor />
