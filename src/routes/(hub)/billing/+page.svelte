<script lang="ts">
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
	import { Button } from "flowbite-svelte";
  import BillingList from "./BillingList.svelte";
</script>

<MetaTag 
  path = '/home' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'Billing'
/>

<main>
  <div class="flex items-center justify-between">
    <div>
      <H1>Billing</H1>
      <H1Subtitle>Usage and costs</H1Subtitle>
    </div>
    <div class="w-48 text-end">
      <Button class="no-w-full">Top up</Button>
    </div>  
  </div>

  <BillingList />
</main>
