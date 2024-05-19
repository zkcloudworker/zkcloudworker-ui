<script lang="ts">
  import { NoData } from "$lib/components";
  import CredentialCard from "./CredentialCard.svelte";

  export let 
    data: any[] = [][Symbol],
    joined: boolean = false,
    isClaimable: boolean = false,
    grid = "1";

  let gridClass = "grid grid-cols-1 gap-4 lg:grid-cols-"+grid;  
</script>

<div class="">
  <div class="w-full --max-w-screen-lg mt-0 mb-0">
    {#if !data || !(data || []).length}
      <NoData
        title='No credentials available'
        text='There are no credentials you can claim at this moment.\nCome back soon !'
        buttons={false}
      />        
    {:else}
      <div class={gridClass}>
        {#each (data || []) as t}
          <div class="transition-opacity duration-1000">
            <CredentialCard 
              data={t}
              {joined}
              {isClaimable}
            />
          </div>
        {/each}
      </div>
    {/if}  
  </div>
</div>