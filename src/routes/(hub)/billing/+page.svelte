<script lang="ts">
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
  import BillingList from "./BillingList.svelte";
</script>

<MetaTag 
  path = '/home' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'Billing'
/>

<main>
  <H1>Billing</H1>
  <H1Subtitle>Usage and costs</H1Subtitle>

  <BillingList />
</main>
