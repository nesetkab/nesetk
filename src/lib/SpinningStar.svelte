<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { slide, fly } from "svelte/transition";

  interface Props {
    label: string;
    description?: string;
    children?: Snippet;
    delay?: number;
    defaultOpen?: boolean;
  }

  let { label, description, children, delay = 0, defaultOpen = false }: Props = $props();

  let open = $state(defaultOpen);
  let visible = $state(false);

  onMount(() => {
    setTimeout(() => { visible = true; }, delay);
  });
</script>

{#if visible}
  <div class="flex flex-col gap-2" in:fly={{ y: 20, duration: 400 }}>
    <button onclick={() => open = !open} class="flex items-center gap-4 cursor-pointer bg-transparent border-none p-0 text-foreground hover:text-accent transition-colors text-3xl">
      <img src="/star.svg" alt="" width="48" height="48" />
      <span>{label}</span>
    </button>

    {#if open}
      <div transition:slide={{ duration: 200 }} class="pl-16">
        {#if children}
          {@render children()}
        {:else if description}
          <p class="text-foreground/70 text-xl">{description}</p>
        {/if}
      </div>
    {/if}
  </div>
{:else}
  <div class="h-12"></div>
{/if}
