<script lang="ts">
  import { P } from 'flowbite-svelte';
  import H1 from "$lib/components/H1.svelte";
  import CommunityCard from "./CommunityCard.svelte";

  export let 
    data: any[] = [], 
    joined = false;
</script>

<div class="">
  <div class="w-full max-w-screen-lg mt-0 mb-0">
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
        {#each (data || []) as t}
          <div class=" transition-opacity duration-1000">
            <CommunityCard 
              uid={t.uid}
              state={t.state}
              title={t.name}      
              description={t.description}
              count={"10"}
              joined={joined}
            />
          </div>
        {/each}
    </div>
  </div>
</div>