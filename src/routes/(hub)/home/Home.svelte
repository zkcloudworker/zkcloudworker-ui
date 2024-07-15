<script lang="ts">
  import { onMount } from "svelte";
  import { Card, Button } from "flowbite-svelte";
  import StatusCard from "./StatusCard.svelte";
  import TopupPanel from "../billing/TopupPanel.svelte";
  import { getMyBalance } from "$lib/api/queries";
	import { getCurrentUser } from "$lib/store";

  let balance = 0;
  let openTopup = false;
  let tnew = 1;
  let user = getCurrentUser();

  function topUp() {
    tnew = tnew +1;
    openTopup = true;
  }

  onMount(async () => {
    const response = await getMyBalance({
      id: user?.accountId as string
    })
    balance = response.success ? response.data.balance.toFixed(2) : null;
  })
</script>

{#key tnew}
  {#if openTopup}
    <TopupPanel tnew={tnew} />
  {/if}  
{/key}

<div class="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">

  <StatusCard 
    title="Active workers"
    items={[
      { label: "Run", value: "2", unit: "this month", color: "gray"},
      { label: "Deployed", value: "4", unit: "", color: "gray"},
    ]}>
  </StatusCard>    

  <StatusCard 
    title="Jobs"
    items={[
      { label: "Running", value: "12", unit: "now", color: "gray"},
      { label: "Finished", value: "60", unit: "this month", color: "gray"},
    ]}>
  </StatusCard>    

  <StatusCard 
    title="Your current balance"
    items={[
      { label: "Total", value: (balance || '...'), unit: "$MINA", color: "red"},
      { label: "Used", value: "...", unit: "$MINA / month", color: "green"},
    ]}>
    <div slot="buttons" class="mt-8">
      <Button class="no-w-full"  
        on:click={() => topUp()}>
        Top up
      </Button>
    </div>
  </StatusCard>    

  <StatusCard 
    title="Your usage"
    items={[
      { label: "Memory", value: "12", unit: "Gb/month", color: "gray"},
      { label: "Elapsed time", value: "120", unit: "mins/month", color: "gray"},
    ]}>
  </StatusCard>    
</div>
