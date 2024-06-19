<script lang="ts">
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
  import JobsList from "./JobsList.svelte";
</script>

<MetaTag 
  path = '/home' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'My Jobs'
/>

<main>
   <H1>My Jobs</H1>
   <JobsList />
</main>
