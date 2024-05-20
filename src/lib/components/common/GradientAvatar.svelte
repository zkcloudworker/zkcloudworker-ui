<script lang="ts">
  /**
   * Credits:
   * - Based on: https://github.com/coffee-cup/gradient-avatars
   * - Some ideas: https://github.com/brandonsueur/react-gradient-avatar
  */
  import { onMount } from "svelte";

  export let initials = "";
  export let gradient = ""; // the avatar default size
</script>

<span class={"relative h-11 w-11 inline-block"}>
  <div class="absolute h-11 w-11 top-0">
    {@html gradient}
  </div>
  <div class="absolute w-11 inline-block mt-[10px] text-center text-white">
    {initials}
  </div>
</span>
