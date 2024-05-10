<script lang="ts">
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { Button, Badge, Spinner } from "flowbite-svelte";
  import Time from "svelte-time/Time.svelte";
  import { type Claim } from "$lib/types/claim";
	import { type Plan } from "$lib/types";
	import { createDepositFeeTransaction, TXNFEE } from "$lib/transactions/payments";
	import { getCurrentBlockchain } from "$lib/store";

  const dispatch = createEventDispatcher();

  export let 
    plan: Plan,
    claim: Claim;

  let isWorking = false, isError = false, isConnected = false;
  let payer = "";
  let errorMessage = "";

  onMount(async () => {
    isConnected = await isWalletConnected();
  })

  function isWalletAvailable() {
    return (typeof window.mina !== 'undefined');
  }

  async function isWalletConnected() {
    if (isWalletAvailable()) {
      const accounts: any[] = await window.mina?.getAccounts() || [];
      if (accounts.length) {
        payer = accounts[0];
        return true;
      }
    }
    return false;
  }

  async function confirmPayment() {
    isWorking = true;
    try {
      if (!plan.fee) throw Error("Plan must have a min fee");
      if (!payer) throw Error("There is no account to paying the fee");
      if (!isConnected) throw Error("Need a wallet to pay");

      const t0 = Date.now();
      const serializedTxn = await createDepositFeeTransaction(
        claim.uid,
        payer,
        plan.fee!, 
        plan.fee!
      );
      console.log("serializedTxn: ", serializedTxn);
      const dt = Number((Date.now() - t0)/1000);

      let response = await window.mina?.sendTransaction({
        transaction: serializedTxn, // serializedTxn,
        feePayer: {
            fee: TXNFEE,
            memo: `Pay claim ${claim.uid}`.substring(0, 32)
        },
      });      

      let txnHash = response.hash;
      dispatch("done", { hash: txnHash, success: true });
    }
    catch (err) {
      isError = true;
      errorMessage = `${err}`;
    }
    isWorking = false;
  }
</script>

<div>
  <div class="text-base mt-20 text-center">
    {#if !isConnected}
      <div class="text-sm mt-7 text-gray-900">
        You need to install or open 
        <a href="https://www.aurowallet.com/" class="underline">Auro Wallet</a>
        to continue.
      </div>
    {/if}

    {#if isConnected && !isWorking}
      <div class="border-2 p-3 text-start">
        <h6 class="text-2xl font-semibold text-black">Payment details</h6>
        <p class="text-sm text-gray-500">Your receipt</p>     
        <div class="text-base mt-4 flex items-start justify-between">
          <div class="w-1/2">&nbsp;</div>
          <div class="w-1/4 text-start">
            <p class="text-sm font-bold text-gray-800">Fee</p>
            <p class="text-gray-700">{plan.fee} MINA</p>
          </div>
          <div class="w-1/4 text-start">
            <p class="text-sm font-bold text-gray-800">Expire</p>
            <p class="text-gray-700">
              <Time format="MMM DD, YYYY" timestamp={plan.endsUTC} />
            </p>
          </div>
        </div>   
      </div>
    {/if}

    {#if isConnected && isWorking }
      <div class="">
        <Spinner />
      </div>  
      <div class="text-sm mt-7 text-gray-900">
        Check your Auro Wallet for transaction confirmation...
      </div>
    {/if}

    {#if isError}
      <div class="">
        SOMETHING HAPPENED !
      </div>  
      <div class="text-sm mt-7 text-gray-900">
        {errorMessage}
      </div>
    {/if}
  </div>

  <div class="text-end --border-t-2 px-8 py-6 absolute bottom-0 left-0 right-0 text-right">
    <Button color="light"  class="py-3" 
      on:click={() => dispatch("cancel")}>
      I'll do it later
    </Button>
    &nbsp;
    <Button color="blue" class="py-3" 
      disabled={!isConnected || isWorking}
      on:click={() => confirmPayment()}>
      Confirm
    </Button>
  </div>
</div>
