<script lang="ts">
	import { useGetMembers } from "$lib/hooks/members";
  // 
  import { Search } from 'flowbite-svelte';
  import MembersList from "$lib/components/members/MembersList.svelte";
  import { ErrorOnFetch } from "$lib/components";

  export let communityUid: string = "";

  let q: string = ""; // query 

  let members = useGetMembers(communityUid);

  function filterByName(data: any, name: string) {
    let uname = (name || "").toUpperCase();
    if (!uname) 
      return data;
    return (data || []).filter((t: any) => {
      return t.fullName.toUpperCase().includes(uname)
    })
  }
</script>

<div class="mx-auto">
  <div class="w-full flex items-center justify-between text-end py-4 mb-4">
    <div class="w-10/12">&nbsp;</div>
    <div class="w-5/12">
      <Search class="inline-block text-gray-800 text-md" autofocus placeholder="Search" size="md" bind:value={q} />
    </div>
  </div>

  <div class="border-t">
    {#if $members.isLoading}
      <span>Loading...</span>
    {:else if $members.isError}
      <ErrorOnFetch 
        description="My community"
        error={$members.error} 
      />
    {:else}
      <MembersList 
        data={filterByName($members.data, q)} 
      />
    {/if}
  </div>

</div>
