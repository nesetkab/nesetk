<script>
  let { children } = $props();
</script>

<div class="min-h-screen bg-background font-sans px-6 sm:px-16 pt-20 pb-32">
  <article class="prose max-w-2xl">
    {@render children()}
  </article>
</div>

<style>
  .prose :global(h1) {
    font-size: 2.5rem;
    font-weight: 300;
    color: var(--foreground);
    margin-bottom: 0.5rem;
  }
  .prose :global(h2) {
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--foreground);
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }
  .prose :global(p) {
    font-size: 1.125rem;
    line-height: 1.75;
    color: color-mix(in srgb, var(--foreground) 70%, transparent);
    margin-bottom: 1rem;
  }
  .prose :global(strong) {
    color: var(--foreground);
  }
  .prose :global(code) {
    background: color-mix(in srgb, var(--foreground) 10%, transparent);
    padding: 0.15em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.9em;
  }
  .prose :global(pre) {
    background: color-mix(in srgb, var(--foreground) 8%, transparent);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1rem;
  }
  .prose :global(pre code) {
    background: none;
    padding: 0;
  }
</style>
