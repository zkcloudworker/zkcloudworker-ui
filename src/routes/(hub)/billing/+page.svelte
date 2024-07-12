<script lang="ts">
  import { onMount } from "svelte";
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
	import { Button, Modal } from "flowbite-svelte";
  import BillingList from "./BillingList.svelte";
  import { type User } from "$lib/types";
  import { getCurrentUser } from "$lib/store";
  import TopupPanel from "./TopupPanel.svelte";

  const user: User = getCurrentUser() as User;
  const query = ``;
  const filters = `id:${user.accountId}`;
  let openTopup = false;
  let tnew = 1;

  function topUp() {
    tnew = tnew +1;
    openTopup = true;
  }
</script>

<MetaTag 
  path = '/home' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'Billing'
/>

{#key tnew}
  {#if openTopup}
    <TopupPanel tnew={tnew} />
  {/if}  
{/key}

<main>
  <div class="flex items-center justify-between">
    <div>
      <H1>Billing</H1>
      <H1Subtitle>Usage and costs</H1Subtitle>
    </div>
    <div class="w-48 text-end">
      <Button class="no-w-full" 
        on:click={() => topUp()}>
        Top up
      </Button>
    </div>  
  </div>

  <BillingList {query} {filters}/>
</main>
