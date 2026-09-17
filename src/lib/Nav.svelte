<script lang="ts">
  import { page } from '$app/state';

  const links = [
    { label: 'overview', href: '/' },
    { label: 'about', href: '/about' },
    { label: 'blog', href: '/blog' },
  ];
</script>

<nav class="fixed top-0 left-0 right-0 z-50 flex gap-8 px-6 sm:px-16 py-5 bg-background/80 backdrop-blur-sm">
  {#each links as link}
    <a
      href={link.href}
      class="text-lg no-underline transition-colors {page.url.pathname === link.href ? 'text-foreground' : 'text-foreground/40 hover:text-foreground/70'}"
    >
      {link.label}
    </a>
  {/each}
</nav>
