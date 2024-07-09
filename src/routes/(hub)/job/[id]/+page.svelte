<script lang="ts">
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
  import { sliced } from "$lib/utils";
  import JobInfo from "./JobInfo.svelte";
  import TransactionInfo from "./TransactionInfo.svelte";

  export let data: any = {};
</script>

<MetaTag 
  path = '/job' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'Account'
/>

<main>
  <H1>Job</H1>
  <H1Subtitle>Detail info for this job</H1Subtitle>
  <div class="mt-8 w-full">
    <JobInfo jobId={data?.id} />
    <TransactionInfo jobId={data?.id} />
  </div>  
</main>
