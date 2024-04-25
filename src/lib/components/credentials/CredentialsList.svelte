<script lang="ts">
  import CredentialCard from "./CredentialCard.svelte";

  export let 
    data: any[] = [];
</script>

<div class="">
  <div class="w-full max-w-screen-lg mt-0 mb-0">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {#each (data || []) as t}
          <div class="transition-opacity duration-1000">
            <CredentialCard 
              data={t}
            />
          </div>
        {/each}
    </div>
  </div>
</div>