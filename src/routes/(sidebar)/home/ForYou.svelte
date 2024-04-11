<script lang="ts">
  import { onMount } from "svelte";
  import { P } from "flowbite-svelte";
  import { H1 } from "$lib/components";
  import InvitationCard from "./InvitationCard.svelte";
  import CommunitiesList from "../my-communities/CommunitiesList.svelte"
	import ErrorOnFetch from "$lib/components/ErrorOnFetch.svelte";
  import { useGetAllCommunities } from "$lib/hooks/communities";

  const communities =  useGetAllCommunities();

  onMount(async () => {
  })

</script>

<div>
  <H1>For you</H1>
  <P class="text-gray-400" size="base">
    Join new communities  
  </P>
  <InvitationCard />
  <br>

  {#if $communities.isLoading}
    <span>Loading...</span>
  {:else if $communities.isError}
    <ErrorOnFetch 
      description="All the communities"
      error={$communities.error} 
    />
  {:else}
    <ul>
      <CommunitiesList 
        data={$communities.data} 
        joined={false} 
      />
    </ul>
  {/if}
</div>
