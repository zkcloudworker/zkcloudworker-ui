<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Alert, Button } from "flowbite-svelte";
  import Time from "svelte-time/Time.svelte";
  import { type Claim } from "$lib/types/claim";
	import type { Plan } from "$lib/types";

  const dispatch = createEventDispatcher();

  export let 
    action = "",
    plan: Plan,
    claim: Claim;

  let payedByCommunity = true;    
</script>

<div>
  <div>
    {#if payedByCommunity}
      <div>
        <Alert class="text-md bg-green-200 text-black -mx-2 px-8">
          This claim has a fee of <b>{plan.fee} $MINA</b>. But do not worry, <b>it will be paid by the community!</b>
        </Alert>
      </div>
      <div class="p-2 leading-loose">
        Are you ready to submit it? 
        <ul class="list-disc ps-8">
          <li>Please connect your wallet</li>
          <li>We will ask you to sign the submission. This has no cost.</li>
          <li>After this your draft will be submitted</li>
          <li>Please confirm because you will not be able to resubmit.</li>
          <li>
            Final submission date is <b>
              <Time format="MMM DD, YYYY" timestamp={plan.endsUTC} />
              (23:59 UTC)
            </b>
          </li>
        </ul>
      </div>
    {:else}  
      <div>
        <Alert class="text-md bg-yellow-200 text-black -mx-2 px-8">
          This claim has a fee of <b>{plan.fee} $MINA</b>. Please ready your Auro wallet.
        </Alert>
      </div>
      <div class="p-2 leading-loose">
        Are you ready to submit it? 
        <ul class="list-disc ps-8">
          <li>Please connect your wallet</li>
          <li>We will ask you to deposit a fee of <b>{plan.fee} $MINA</b></li>
          <li>After this your draft will be submitted</li>
          <li>Please confirm because you will not be able to resubmit.</li>
          <li>
            Final submission date is <b>
              <Time format="MMM DD, YYYY" timestamp={plan.endsUTC} />
              (23:59 UTC)
            </b>
          </li>
        </ul>
      </div>
    {/if}

  </div>
  
  <div class="text-end --border-t-2 mt-4 pt-4 px-4">
    <Button color="light" on:click={() => { 
        action = "cancel";
        dispatch(action);
      }}>
      No, not ready
    </Button>
    &nbsp;
    <Button color="primary" on:click={() => { 
        action = "submit"; 
        dispatch(action);
      }}>
      Yes, submit it !
    </Button>
  </div>
</div>
