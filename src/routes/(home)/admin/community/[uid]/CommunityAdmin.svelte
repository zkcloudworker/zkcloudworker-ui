<script lang="ts">
  import { onMount } from "svelte";
  import { Breadcrumb, BreadcrumbItem, P } from 'flowbite-svelte';
  import { H1, ErrorOnFetch } from "$lib/components";
  import { useGetCommunity } from "$lib/hooks/communities";
  import type { Community } from "$lib/types";
  import { getCommunity } from "$lib/api/queries";

  export let uid: string | null = null;
  let community = useGetCommunity(uid!);
 
  $: name = $community.data?.name;
</script>

<div class="p-4">
  <Breadcrumb class="mb-5">
    <BreadcrumbItem home href="/home">Home</BreadcrumbItem>
    <BreadcrumbItem>Admin communities</BreadcrumbItem>
    <BreadcrumbItem>{$community.data?.name || '?'}</BreadcrumbItem>
  </Breadcrumb>

  <div>
    <H1>{$community.data?.name}</H1>
    {#if $community.isLoading}
      <span>Loading...</span>
    {:else if $community.isError}
      <ErrorOnFetch 
        description="All the communities"
        error={$community.error} 
      />
    {:else}
      <pre>
        {JSON.stringify($community.data || { error: "NOT FOUND" }, null, 2)}
      </pre>
    {/if}
  </div>
</div>
