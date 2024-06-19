<script lang="ts">
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { Button, Badge, Spinner } from "flowbite-svelte";
  import { isWalletConnected } from "$lib/store/wallet";

  const dispatch = createEventDispatcher();

  let isConnecting = false, isError = false, isConnected = '';
  let accountId = "";
  let errorMessage = "";

  onMount(async () => {
    isConnected = await isWalletConnected();
  })

  async function connectWallet() {
    isConnecting = true;
    try {
      const accounts: any[] = await window.mina?.requestAccounts() || [];
      accountId = accounts[0];
      isConnecting = false;
      isConnected = accountId;
      await tick();
      dispatch("continue", { accountId: accountId })
    }
    catch (err) {
      isError = true;
      isConnecting = false;
      isConnected = '';
      errorMessage = `${err}`;
    }
  }
</script>

<div>
  <div class="text-base mt-20 text-center">
    {#if !isConnected && !isConnecting}
      <img alt="auro-wallet-logo" class="inline-block" src="/images/auro-wallet.svg" />
      <div class="text-sm mt-7 text-gray-900">
        You need to install or open 
        <a href="https://www.aurowallet.com/" class="underline">Auro Wallet</a>
        to continue.
      </div>
    {/if}

    {#if isConnected}
      <img  alt="icon"  class="inline-block h-10" src="/icons/Activity.svg"/>
      <div class="mt-5 text-gray-900">
        Connected with account <Badge large rounded color="green" class="py-1">
          {accountId.slice(0,6)}...{accountId.slice(-6)}
        </Badge>
      </div>
    {/if}

    {#if isConnecting}
      <div class="">
        <Spinner />
      </div>  
      <div class="text-sm mt-7 text-gray-900">
        Check your Auro Wallet for confirmation...
      </div>
    {/if}

    <div class="mt-12 px-0 py-6 w-full flex items-center justify-center">
      <!-- <Button color="light"  class="py-3" 
        on:click={() => dispatch("cancel")}>
        I'll do it later
      </Button>
      &nbsp; -->
      {#if !isConnected}
        <Button color="primary" class="py-3" 
          on:click={() => connectWallet()}>
          Connect
        </Button>
      {/if}  
      {#if isConnected}
        <Button color="primary" class="py-3" 
          on:click={() => dispatch("continue")}>
          Continue
        </Button>
      {/if}
    </div>
  </div>

</div>
