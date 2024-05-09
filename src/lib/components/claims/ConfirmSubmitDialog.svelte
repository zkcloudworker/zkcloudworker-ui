<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Alert, Button, Badge } from "flowbite-svelte";
  import Time from "svelte-time/Time.svelte";
  import { type Claim } from "$lib/types/claim";
	import type { Plan } from "$lib/types";

  const dispatch = createEventDispatcher();

  export let 
    action = "",
    title = "",
    description = "",
    plan: Plan,
    claim: Claim;

  let payedByCommunity = false;    
</script>

<div>
  <div class="px-4 text-base">
    <div class="text-lg font-bold text-black">
      {title}
    </div>
    <div class="text-sm  text-gray-500">
      {description}
    </div>
    <div class="text-gray-800 mt-10">
      {plan.description}
    </div>
    <div class="mt-8">
      Final submission date: <b>
        <Time format="MMM DD, YYYY" timestamp={plan.endsUTC} />
        (23:59 UTC)
      </b>
    </div>
    <div class="text-base mt-8">
      Fee <Badge rounded large 
        class={
          (payedByCommunity ? "line-through bg-gray-400" : "bg-gray-500")
          + " text-white px-4 ms-2"
        }>
        {plan.fee} MINA
      </Badge>
      {#if payedByCommunity}
        <span class="ms-2">will be paid by the community.</span>
      {/if}
      {#if !payedByCommunity}
        <span class="ms-2"> Prepare your wallet.</span>
      {/if}
    </div>  
  </div>
  
  <div class="text-end --border-t-2 px-8 py-6 absolute bottom-0 left-0 right-0 text-right">
    <Button color="light"  class="py-3" on:click={() => { 
        action = "cancel";
        dispatch(action);
      }}>
      I'll do it later
    </Button>
    &nbsp;
    <Button color="blue" class="py-3" on:click={() => { 
        action = "submit"; 
        dispatch(action);
      }}>
      Go ahead
    </Button>
  </div>
</div>
