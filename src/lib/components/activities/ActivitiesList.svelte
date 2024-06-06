<script lang="ts">
  import { onMount } from 'svelte';
  import { Heading, P, Badge  } from 'flowbite-svelte';
	import { Icon } from '$lib/components';
  import { type Activity } from "$lib/types";
  import ActivityItem from '$lib/components/activities/ActivityItem.svelte';
 
  import { activities } from '../../../routes/(home)/home/data';

  export let 
    limit: number = 6,
    filter: string = "";
    
  // show a max of N activities, if 0 show all 
  $: visibles =  (limit > 0) 
    ? filterText(activities.data || [], filter).slice(0, limit) 
    : filterText(activities.data || [], filter);

  function filterText(data: Activity[], q: string) {
    if (!q) return data;
    q = (q+"").toUpperCase();
    return (data || []).filter((t: any) => {
      return t.text.toUpperCase().includes(q);
    })
  }
</script>

<div class="w-full">
  {#if (visibles || []).length > 0}
    {#each (visibles) as activity}
      <ActivityItem {activity} />
    {/each}
    {#if limit > 0}
      <p class="ms-0 text-center">
        <a href="/activity" class="text-base text-primary-600 font-medium">
          View all ...
        </a>
      </p>
    {/if}
  {:else}
    <div class="text-center">
      <div class="mb-4">
        <Icon name="NoData" size="7" />
      </div>
      <h6 class="text-lg text-weight-500 mb-1 text-black dark:text-white">
        No recent events
      </h6>
      <p class="text-weight-400 mb-1 text-sm text-gray-600 dark:text-gray-400 sm:text-sm">
        All your history and pending events<br>will appear here
      </p>
    </div>
  {/if}
</div>  
