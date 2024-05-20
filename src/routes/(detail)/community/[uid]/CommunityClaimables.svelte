<script lang="ts">
	import { useGetAllClaimables } from "$lib/hooks/plans";
  // 
  import CredentialsList from "$lib/components/credentials/CredentialsList.svelte";
  import { ErrorOnFetch } from "$lib/components";

  export let communityUid: string = "";
  let allClaimables = useGetAllClaimables({ joined: true });

  function filterClaimables(data: any, uid: string) {
    return (data || []).filter((t: any) => {
      return t.communityUid === uid;
    })
  }
</script>

<div class="max-w-screen-sm mx-auto">
  {#if $allClaimables.isLoading}
    <span>Loading...</span>
  {:else if $allClaimables.isError}
    <ErrorOnFetch 
      description="My community"
      error={$allClaimables.error} 
    />
  {:else}
    <CredentialsList 
      data={filterClaimables($allClaimables.data, communityUid)} 
      joined={false}
      isClaimable={true}
      grid="1" 
    />
  {/if}
</div>
