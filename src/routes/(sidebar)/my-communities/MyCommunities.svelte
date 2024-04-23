<script lang="ts">
  import { onMount } from "svelte";
  import { CACHE, type APIResponse } from "$lib/api";
  import { P } from "flowbite-svelte";
  import { H1, ErrorOnFetch } from "$lib/components";
	import CommunitiesList from "$lib/components/communities/CommunitiesList.svelte";
  import { useGetMyCommunities } from "$lib/hooks/communities";
	import NoData from "$lib/components/common/NoData.svelte";
  
  const communities = useGetMyCommunities();
</script>

<div class="p-4">
  <H1>My Communities</H1>
  <P class="text-gray-400" size="lg">
    You are a member of {($communities.data || []).length} communities
  </P>
  <P class="pb-8"></P>
  {#if $communities.isLoading}
    <span>Loading...</span>
  {:else if $communities.isError}
    <ErrorOnFetch 
      description="All the communities"
      error={$communities.error} 
    />
  {:else if !$communities.data || $communities.data.length === 0}
    <NoData text="You didn’t join any community yet" />
  {:else}
    <ul>
      <CommunitiesList 
        data={$communities.data} 
        joined={true} 
      />
    </ul>
  {/if}
</div>  
