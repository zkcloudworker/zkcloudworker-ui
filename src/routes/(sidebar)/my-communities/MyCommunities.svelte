<script lang="ts">
  import { Heading } from "flowbite-svelte";
  import H1 from "$lib/components/H1.svelte";
  import CommunityCard from "./CommunityCard.svelte";

  export let promised: Promise<any[]>;
</script>

<div class="">
  <H1>My Communities page</H1>
  <br>

  <div class="w-full max-w-screen-lg">
    {#await promised}
      <p class="text-lg text-yellow-500">Loading all communities ...</p>  
    {:then data} 
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
        {#each (data || []) as t}
          <CommunityCard 
            uid={t.uid}
            state={t.state}
            title={t.name}      
            description={t.description}
            count={"10"}
          />
        {/each}
      </div>
    {:catch error}
  	  <p class="text-lg text-red-500">{error.message}</p>  
    {/await}
  </div>
</div>