<script lang="ts">
  import { P } from 'flowbite-svelte';
  import H1 from "$lib/components/common/H1.svelte";
  import CommunityCard from "./CommunityCard.svelte";

  export let 
    data: any[] = [], 
    joined = false;
</script>

<div class="">
  <div class="w-full mt-0 mb-0">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {#each (data || []) as t}
          <div class=" transition-opacity duration-1000">
            <CommunityCard 
              uid={t.uid}
              state={t.state}
              title={t.name}      
              description={t.description}
              image={t.image}
              nClaims={t.countClaims}
              nCredentials={t.countCredentials}
              count={t.countMembers}
              joined={joined}
            />
          </div>
        {/each}
    </div>
  </div>
</div>