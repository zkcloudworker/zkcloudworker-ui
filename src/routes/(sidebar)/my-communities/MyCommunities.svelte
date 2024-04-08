<script lang="ts">
  import { onMount } from "svelte";
  import { CACHE, type APIResponse } from "$lib/api";
  import { getMyCommunities } from '$lib/api/queries';
  import { P } from "flowbite-svelte";
  import { H1, ErrorOnFetch } from "$lib/components";
	import CommunitiesList from "./CommunitiesList.svelte";

  const STORE_KEY = 'my_communities';
  export let communities: APIResponse | null = null;

  onMount(() => {
    console.log("onMount myCommunities communities=", communities);
    communities = CACHE.get(STORE_KEY) || null;
    getMyCommunities({})
      .then((response: APIResponse) => {
        communities = response;
        CACHE.set(STORE_KEY, response);
      })
  })
</script>

<div class="p-4">
  <H1>My Communities</H1>
  <P class="text-gray-400" size="base">
    I have joined these ones ...
  </P>
  <P class="pb-8"></P>
  {#if !communities?.error}
    <CommunitiesList 
      data={communities?.data || []} 
      joined={true} 
    />
  {:else}
    <ErrorOnFetch 
      description="My communities"
      error={communities.error} 
    />
  {/if}
</div>  
