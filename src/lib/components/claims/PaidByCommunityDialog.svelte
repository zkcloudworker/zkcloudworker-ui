<script lang="ts">
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { Button } from "flowbite-svelte";
  import { type Claim } from "$lib/types/claim";
	import { type Plan } from "$lib/types";

  const dispatch = createEventDispatcher();

  export let 
    chain: any;
</script>

<div>
  <div class="text-base mt-20 text-center">
      <img src="/icons/Ok.svg" class="h-12 inline-block" />
      <p class="text-lg mt-4 text-black">
        Your claim is on the way!
      </p>
      <p class="text-lg mt-2 text-black">
        The claim has been paid by the community
      </p>
  </div>

  <div class="text-end --border-t-2 px-8 py-6 absolute bottom-0 left-0 right-0 text-right">
    <Button color="blue" class="py-3" 
      on:click={() => dispatch("done")}>
      Done !
    </Button>
  </div>
</div>
