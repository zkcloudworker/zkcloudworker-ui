<script lang="ts">
  import { Heading, P, Badge  } from 'flowbite-svelte';
	import { ErrorOnFetch, H1, H1Subtitle } from '$lib/components';
  import ActivityItem from '$lib/components/activities/ActivityItem.svelte';
  import { activities } from './home/data';


  // let activities: APIResponse | null = null;
</script>

<div class="w-full rounded py-11 ps-5 p-5">
  <H1>
    Activity
  </H1>
  <P class="text-gray-400 mb-8" size="base">
    Your current activity  
  </P>
  {#if !activities?.error}
    {#each (activities?.data || []) as activity}
      <ActivityItem {activity} />
    {/each}
  {:else}
    <ErrorOnFetch
      description="Activities"
      error={activities.error}
    />
  {/if}
</div>  
