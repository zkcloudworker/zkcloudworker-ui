<script lang="ts">
  import { onMount } from "svelte";
  import { MetaTag } from "$lib/components";
	// import ClaimEditor from "./ClaimEditor.svelte";
  import ErrorOnFetch from '$lib/components/common/ErrorOnFetch.svelte';
  import ClaimHeader from "$lib/components/claims/ClaimHeader.svelte";
  import ClaimEditor from "$lib/components/claims/ClaimEditor.svelte";
  import Breadcrumbs from "$lib/components/common/Breadcrumbs.svelte";
	import type { User } from '$lib/types';
	import { getCurrentUser } from '$lib/store';
	import { useGetPlan } from "$lib/hooks/plans";

	export let data: any ;
  
  const plan = useGetPlan(data.planUid);

  let profile: User | null = getCurrentUser();
  $: isNew = (data.uid === 'new');

  $: refreshOn = data.uid;//+Math.random();
</script>

<MetaTag 
  path="community" 
  title="Socialcap" 
  subtitle={`Community`}
  description="" 
/>

<div class="px-8 max-w-screen-lg">

  <Breadcrumbs label={$plan.data?.name || '?'}/>

  {#key refreshOn}
      {#if $plan.isLoading}
      <span>Loading...</span>
    {:else if $plan.isError}
      <ErrorOnFetch 
        description="A new claim"
        error={$plan.error} 
      />
    {:else}
      <ClaimHeader 
        data={$plan.data} 
        isNew={data.uid === 'new'}
      />
      {#if isNew}
        <ClaimEditor 
          plan={$plan?.data}
          claim={null}
          {isNew}
        />
        <pre>
          {JSON.stringify($plan.data || { error: "NOT FOUND" }, null, 2)}
        </pre>
      {/if}
    {/if}
  {/key}
</div>
