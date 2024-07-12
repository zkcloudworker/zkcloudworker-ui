<script lang="ts">
	import { Modal } from "flowbite-svelte";
  import { isWalletConnected, sendPayment } from "$lib/store/wallet";
  import ConnectWalletDialog from "$lib/components/common/ConnectWalletDialog.svelte";
  import TopupDialog from "$lib/components/common/TopupDialog.svelte";
	import { onMount } from "svelte";

  export let tnew: number;
  
  let hasAccount = '';
  let openWallet = false, openPayment = false;
  let told = tnew; 

  $: if (told !== tnew) {
    connectWallet();  
  }

  onMount(async () => {
    console.log("Start payment");
    told = tnew;
    tnew  = 0;
    await connectWallet();
  })

  async function connectWallet() {
    hasAccount = await isWalletConnected();
    if (!hasAccount) { openWallet = true; return; }
    openPayment = true;
  }

  async function topUp(detail: any) {
    open = false;
    let rsp = await sendPayment({
      amount: detail.amount, 
      memo: detail.memo
    });
  }
</script>

<div>
  {#if openWallet}
    <Modal title="Top up your account" bind:open={openWallet}>
      <ConnectWalletDialog 
      on:continue={() => { openWallet = false; openPayment = true; }}
      />
    </Modal> 
  {/if} 
  
  {#if openPayment}
    <Modal title="Top up your account" bind:open={openPayment} size="sm">
      <TopupDialog
      on:continue={(ev) => { openPayment = false; topUp(ev.detail); }} 
      on:cancel={() => { openPayment = false; }}
      />
    </Modal>  
  {/if}
</div>
