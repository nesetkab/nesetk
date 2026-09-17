<script lang="ts">
  import { fly } from "svelte/transition";
  import posts from "$lib/posts.json";
</script>

<main class="min-h-screen py-32 px-6 sm:px-16">
  <div class="flex flex-col gap-8">
    <h1
      class="text-4xl sm:text-6xl font-light font-instrument-sans"
      in:fly={{ y: 20, duration: 400 }}
    >
      blog
    </h1>
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
      in:fly={{ y: 20, duration: 400, delay: 200 }}
    >
      {#each posts as post, i}
        <a
          href="/blog/{post.slug}"
          class="flex flex-col gap-1 no-underline group"
          in:fly={{ y: 20, duration: 400, delay: 100 + i * 100 }}
        >
          <span
            class="text-xl text-foreground group-hover:text-accent transition-colors"
            >{post.title}</span
          >
          <span class="text-sm text-foreground/40">{post.date}</span>
          <span class="text-base text-foreground/60">{post.description}</span>
        </a>
      {/each}
    </div>
  </div>
</main>
