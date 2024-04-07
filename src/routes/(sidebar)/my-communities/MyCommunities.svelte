<script lang="ts">
  import { P } from 'flowbite-svelte';
  import H1 from "$lib/components/H1.svelte";
  import CommunityCard from "./CommunityCard.svelte";

  export let data: any[];
</script>

<div class="">
  <H1>My Communities</H1>
  <P class="text-gray-400" size="base">
    I have joined these ones ...
  </P>
  <br>

  <div class="w-full max-w-screen-lg mt-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
        {#each (data || []) as t}
          <div class=" transition duration-500">
            <CommunityCard 
              uid={t.uid}
              state={t.state}
              title={t.name}      
              description={t.description}
              count={"10"}
            />
          </div>
        {/each}
    </div>
  </div>
</div>