<script lang="ts">
  import { onMount } from "svelte";
  import { P, A, Tabs, TabItem } from "flowbite-svelte";
  import { H1 } from "$lib/components";
  import CommunitiesList from "../my-communities/CommunitiesList.svelte"
	import ErrorOnFetch from "$lib/components/ErrorOnFetch.svelte";
  import { useGetAllCommunities } from "$lib/hooks/communities";

  const communities =  useGetAllCommunities();

  onMount(async () => {
  })

</script>

<div>
  <br/>
  <H1>For you</H1>

  <Tabs style="underline">
    <TabItem open class="">
      <span slot="title" class="--font-bold">Claim & Earn</span>
      <div>
        Credential offerings go here ...
      </div>
    </TabItem>

    <TabItem>
      <span slot="title" class="--font-bold">Join communities</span>
      <div>
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
    </TabItem>
  </Tabs>
</div>
