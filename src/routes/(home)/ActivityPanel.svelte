<script lang="ts">
  import { Heading, P, Badge  } from 'flowbite-svelte';
	import { ErrorOnFetch, H1, H1Subtitle } from '$lib/components';
  import ActivityItem from '$lib/components/activities/ActivityItem.svelte';
  import ActivitiesList from '$lib/components/activities/ActivitiesList.svelte';
</script>

<div class="w-full rounded py-11 ps-5 p-5">
  <H1>
    Activity
  </H1>
  <P class="text-gray-400 mb-8" size="base">
    Your current activity  
  </P>
  <ActivitiesList limit={6} />  
</div>  
