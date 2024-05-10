<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Alert, Button, Badge, StepIndicator } from "flowbite-svelte";
  import Time from "svelte-time/Time.svelte";
  import { type Claim } from "$lib/types/claim";
	import { type Plan, PayedBy } from "$lib/types";
	import PaymentDialog from "./PaymentDialog.svelte";

  const dispatch = createEventDispatcher();

  export let 
    plan: Plan,
    claim: Claim;

  $: payedByCommunity = (plan.payedBy === PayedBy.community);    
</script>

<div>
  <div class="text-base">
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
        dispatch("cancel");
      }}>
      I'll do it later
    </Button>
    &nbsp;
    <Button color="blue" class="py-3" on:click={() => { 
        dispatch("submit");
      }}>
      Go ahead
    </Button>
  </div>
</div>
