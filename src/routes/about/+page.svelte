<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<main class="min-h-screen py-32 px-6 sm:px-16">
  <div class="flex flex-col gap-12">
    <h1
      class="text-4xl sm:text-6xl font-light font-instrument-sans"
      in:fly={{ y: 20, duration: 400 }}
    >
      about me
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="flex flex-col gap-12">
        <div
          class="flex flex-col gap-4"
          in:fly={{ y: 20, duration: 400, delay: 100 }}
        >
          <h2 class="text-2xl font-light font-instrument-sans">who i am</h2>
          <p class="text-lg text-foreground/70 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

        <div
          class="flex flex-col gap-4"
          in:fly={{ y: 20, duration: 400, delay: 200 }}
        >
          <h2 class="text-2xl font-light font-instrument-sans">what i do</h2>
          <p class="text-lg text-foreground/70 leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-12">
        <div
          class="flex flex-col gap-4"
          in:fly={{ y: 20, duration: 400, delay: 300 }}
        >
          <h2 class="text-2xl font-light font-instrument-sans">skills</h2>
          <div class="flex flex-wrap gap-2">
            {#each ["Figma", "TypeScript", "Fusion 360", "React", "Onshape", "Python", "Java", "Tailwind CSS", "Node.js", "Git"] as skill}
              <span
                class="text-sm text-foreground/50 border border-foreground/20 rounded-full px-3 py-1"
                >{skill}</span
              >
            {/each}
          </div>
        </div>

        <div
          class="flex flex-col gap-4"
          in:fly={{ y: 20, duration: 400, delay: 400 }}
        >
          <h2 class="text-2xl font-light font-instrument-sans">
            awards & accolades
          </h2>
          <div class="flex flex-col gap-6">
            <div>
              <p class="text-lg text-foreground">
                Dean's List Finalist
                <span class="text-sm text-foreground/50">2025</span>
              </p>
              <p class="text-base text-foreground/70 mt-1">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium.
              </p>
            </div>
            <div>
              <p class="text-lg text-foreground">
                Congressional Award Gold Medal
              </p>
              <p class="text-sm text-foreground/50">Intern — 2023</p>
              <p class="text-base text-foreground/70 mt-1">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
