<script lang="ts">
  import { onMount } from "svelte";
  import { CACHE, type APIResponse } from "$lib/api";  
  import { getAllCommunities } from "$lib/api/queries";
  import { P } from "flowbite-svelte";
  import { H1 } from "$lib/components";
  import InvitationCard from "./InvitationCard.svelte";
  import CommunitiesList from "../my-communities/CommunitiesList.svelte"
	import ErrorOnFetch from "$lib/components/ErrorOnFetch.svelte";

  const STORE_KEY = 'all_communities';
  let communities: APIResponse;

  onMount(() => {
    // communities = getAllCommunities({ notJoined: true });
    communities = CACHE.get(STORE_KEY) || [];
    getAllCommunities({ notJoined: true })
      .then((response: APIResponse) => {
        communities = response;
        CACHE.set(STORE_KEY, response);
      })
  })
</script>

<div>
  <H1>For you</H1>
  <P class="text-gray-400" size="base">
    Join new communities  
  </P>
  <InvitationCard />
  <br>
  {#if !communities?.error}
    <CommunitiesList 
      data={communities?.data || []} 
      joined={false} 
    />
  {:else}
    <ErrorOnFetch 
      description="All the communities"
      error={communities.error} 
    />
  {/if}
</div>
