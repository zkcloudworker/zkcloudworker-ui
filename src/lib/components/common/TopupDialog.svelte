<script lang="ts">
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { Button, Badge,Label, Helper, Alert, NumberInput, Input } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import { isWalletConnected } from "$lib/store/wallet";

  const dispatch = createEventDispatcher();

  let isError = false, isConnected = '', accountId = '';
  let errorMessage = "";
  let amount = 2;
  let memo = 'zkCloudWorker topup';
  const minAmount = import.meta.env.VITE_ZKCW_TOPUP_MIN;

  $: isError = amount < minAmount;

  onMount(async () => {
    isConnected = await isWalletConnected();
    accountId = isConnected;
  })
</script>

<div>
  <div class="text-base mt-4 px-6 max-w-md text-start">

    {#if isConnected}
      <div class="mt-2 ms-2 text-sm text-gray-900">
        Connected with account <Badge large rounded color="green" class="ms-2 px-3 py-1">
          {accountId.slice(0,6)}...{accountId.slice(-6)}
        </Badge>
      </div>

      <div class="text-start py-2">
        <Label class="mt-6 block space-y-2">
          <span class="ms-2 text-sm text-black">Amount to transfer (MINA)</span>
          <NumberInput class="text-lg" label="amount" id="amount" name="amount" 
            required placeholder="" 
            bind:value={amount}/>
          {#if isError}  
            <Helper class="ms-2 text-sm" color="red">
              Minimum deposit is {minAmount} MINA
            </Helper>
          {/if}
        </Label>

        <Label class="mt-6 block space-y-2">
          <span class="ms-2 text-sm text-black">Memo</span>
          <Input class="text-lg" label="memo" id="memo" name="memo" 
            required placeholder="" 
            bind:value={memo}/>
        </Label>
      </div>

      <Alert no-border color="yellow">
        <InfoCircleSolid slot="icon" class="w-6 h-6" />
        Note that changes in balance may take some minutes before 
        they are available.
      </Alert>
    {/if}

    <div class="mt-4 px-0 py-6 w-full flex items-center justify-center">
      {#if isConnected}
        <Button color="light" class="py-3 me-4" 
          on:click={() => dispatch("cancel")}>
          Will do it latter
        </Button>
        <Button color="primary" class="py-3" 
          disabled={isError}
          on:click={() => {
            dispatch("continue", {
              amount: amount,
              memo: memo
            })
          }}>
          Pay now !
        </Button>
      {/if}
    </div>
  </div>
</div>
