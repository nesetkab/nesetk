<script lang="ts">
  import { onMount } from "svelte";

  let containerEl: HTMLDivElement;
  let preEl: HTMLPreElement;
  let scale = $state(1);
  let revealed = $state(0);

  const totalLines = 22;

  function updateScale() {
    if (!containerEl || !preEl) return;
    const cw = containerEl.clientWidth;
    const ch = containerEl.clientHeight;
    const pw = preEl.scrollWidth;
    const ph = preEl.scrollHeight;
    scale = Math.min(cw / pw, ch / ph, 1);
  }

  onMount(() => {
    const interval = setInterval(() => {
      if (revealed < totalLines) {
        revealed++;
        updateScale();
      } else {
        clearInterval(interval);
      }
    }, 150);

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateScale);
    };
  });

  function vis(lineFromTop: number): boolean {
    return revealed >= (totalLines - lineFromTop);
  }
</script>

<div
  bind:this={containerEl}
  class="w-full h-full flex items-center justify-center"
>
  <pre
    bind:this={preEl}
    class="text-accent/80 hover:text-accent select-none font-mono whitespace-pre origin-center transition-colors"
    style="font-size: 25px; line-height: 1; letter-spacing: -0.2em; transform: scale({scale});"><span class:invisible={!vis(1)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣠⠀⡀⢠⣠⣀</span>
<span class:invisible={!vis(2)}>⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣶⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣄</span>
<span class:invisible={!vis(3)}>⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁</span>
<span class:invisible={!vis(4)}>⠀⠀⠀⠀⠀⠀⣠⣬⣷⣷⣿⢯⡟⠉⠉⠋⠉⠙⣯⢿⣷⣷⣯⣤⡀</span>
<span class:invisible={!vis(5)}>⠀⠀⠀⠀⠀⠀⣾⡽⣽⣾⣾⡝⠂⢠⣶⣷⣦⠀⠚⣽⣾⣾⡽⣽⡆</span>
<span class:invisible={!vis(6)}>⠀⠀⠀⠀⠀⠀⣾⢯⢿⣷⣿⢆⠀⠹⣿⣿⡿⠁⢀⢾⣷⣿⢯⢿⡆</span>
<span class:invisible={!vis(7)}>⠀⠀⠀⠀⠀⠀⠺⠿⣿⣞⣾⡿⣇⠀⠀⡁⠀⢀⡿⣿⣞⣾⡿⠿⠂</span>
<span class:invisible={!vis(8)}>⠀⠀⠀⠀⠀⠀⠀⠐⢹⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⠑</span>
<span class:invisible={!vis(9)}>⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁</span>
<span class:invisible={!vis(10)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⠻⢹⣿⠹⠻⠛⠁</span>
<span class:invisible={!vis(11)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿</span>
<span class:invisible={!vis(12)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿</span>
<span class:invisible={!vis(13)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿</span>
<span class:invisible={!vis(14)}>⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣦⣤⣴⣿⣿⣿⠁</span>
<span class:invisible={!vis(15)}>⠀⠀⠀⠀⠀⠀⢼⣿⣿⣿⣿⣿⣿⣿⢿⣿</span>
<span class:invisible={!vis(16)}>⠀⠀⠀⠀⠀⠀⠈⠛⢿⣿⣿⡿⠟⠋⢻⣿⣤⡀</span>
<span class:invisible={!vis(17)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⢻⣿⣿⣿⣿⣿⣷⣦</span>
<span class:invisible={!vis(18)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠹⣿⣿⣿⣿⣿⣿⡿⠁</span>
<span class:invisible={!vis(19)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠉⠹⣿⣯⡁</span>
<span class:invisible={!vis(20)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿</span>
<span class:invisible={!vis(21)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿</span>
<span class:invisible={!vis(22)}>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉</span></pre>
</div>
