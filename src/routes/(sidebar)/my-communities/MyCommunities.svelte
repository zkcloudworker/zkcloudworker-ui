<script lang="ts">
  import { P } from "flowbite-svelte";
  import H1 from "$lib/components/H1.svelte";
	import CommunitiesList from "./CommunitiesList.svelte";

  export let communities: any[] = [];
</script>

<div class="p-4">
  <H1>My Communities</H1>
  <P class="text-gray-400" size="base">
    I have joined these ones ...
  </P>
  <P class="pb-8"></P>
  <CommunitiesList 
    data={communities}
    joined={true} 
  />
</div>  
