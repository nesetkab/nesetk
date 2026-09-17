<script lang="ts">
  import Star from "$lib/Star.svelte";
  import Cat from "$lib/Cat.svelte";
  import Name from "$lib/Name.svelte";
  import projects from "$lib/projects.json";
  import links from "$lib/links.json";
</script>

<div class="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 w-1/2">
  <Cat />
</div>

<main class="flex min-h-screen flex-col justify-between py-32 px-6 sm:px-16 max-w-xl">
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-2">
      <h1 class="sr-only">hey, i'm neset</h1>
      <Name />
    </div>
    <div class="flex flex-col gap-10">
      <Star
        label="about me"
        description="i'm a robotics nerd, web developer, and a high school senior"
        delay={100}
        defaultOpen={true}
      />
      <Star label="projects" delay={250} defaultOpen={true}>
        <div class="flex flex-col gap-4">
          {#each projects as project}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors no-underline"
            >
              <img src={project.icon} alt="" width="24" height="24" />
              <div>
                <span class="text-xl">{project.title}</span>
                <p class="text-base text-foreground/50">
                  {project.description}
                </p>
              </div>
            </a>
          {/each}
        </div>
      </Star>
      <Star label="links" delay={400} defaultOpen={true}>
        <div class="flex flex-col gap-4">
          {#each links as link}
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors no-underline"
            >
              <img src={link.icon} alt="" width="24" height="24" />
              <span class="text-xl">{link.title}</span>
            </a>
          {/each}
        </div>
      </Star>
    </div>
  </div>
</main>
