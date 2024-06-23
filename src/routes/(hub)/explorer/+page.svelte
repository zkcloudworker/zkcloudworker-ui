<script lang="ts">
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
  import JobsList from "../my-jobs/JobsList.svelte";
</script>

<MetaTag 
  path = '/home' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'Explorer'
/>

<main>
   <H1>Explorer</H1>
   <H1Subtitle>
    All jobs from all repos ...
  </H1Subtitle>  

  <JobsList filterBy='' />
</main>
