<script lang="ts">
	let { width = 30 }: { width?: number } = $props();
</script>

<svg
	style:width="calc({width} * var(--u))"
	viewBox="0 0 32 17"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	<path
		d="M14 6.29488C14 6.57103 14.2239 6.79488 14.5 6.79488H30.1152C30.6675 6.79488 31.1152 7.2426 31.1152 7.79488V8.79488C31.1152 9.34717 30.6675 9.79488 30.1152 9.79488H14.5C14.2239 9.79488 14 10.0187 14 10.2949V16.089C14 16.4739 13.5833 16.7145 13.25 16.522L0.500022 9.16091C-0.16665 8.77601 -0.166651 7.81375 0.500021 7.42886L13.25 0.0677344C13.5833 -0.124714 14 0.115849 14 0.500748V6.29488Z"
		fill="currentColor"
	/>
</svg>

<style>
	svg {
		display: block;
		height: auto;
		flex: none;
	}
</style>
