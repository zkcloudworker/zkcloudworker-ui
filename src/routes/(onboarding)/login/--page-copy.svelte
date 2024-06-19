<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getCurrentSession, removeActiveSession, saveActiveSession, type Session } from "$lib/store/sessions";
  import { Button, Label, Input, A  } from "flowbite-svelte";
  import { SubmitButton } from "$lib/components";
  import { MetaTag } from "$lib/components";
  import Onboarding from "../Onboarding.svelte";

  let session: Session | null = null ;
  let email: string = '';
  let alert: 'NO_WALLET' | 'NO_OTP' | 'DONE' | null = null;
  let working = "";
  let status = "WAIT";
  let isConnected = false;
  let accountId = '';
  let errorMessage = '';

  const STATUS_COLORS: any = {
    'NO_WALLET': 'WARNING',
    'NO_OTP': 'WARNING',
    'DONE': 'SUCCESS'
  }

  $: status = alert ? STATUS_COLORS[alert] : 'WAIT';

  onMount(async () => {
    session = removeActiveSession();
    isConnected = await isWalletConnected();
  });

  function isWalletAvailable() {
    return typeof window.mina !== 'undefined';
  }

  async function isWalletConnected() {
    if (isWalletAvailable()) {
      const accounts: any[] = (await window.mina?.getAccounts()) || [];
      if (accounts.length) {
        accountId = accounts[0];
        return true;
      }
    }
    return false;
  }

  async function getOTP() {
    working = "Sending ...   ";

    // success, ask for /otp
    alert = 'DONE'; // "Done ! Going to Home ..."
    /*
    setTimeout(() => { 
      session = session as Session;
      session.key = rsp.data?.session_key;
      saveActiveSession(session);
      goto(`/otp?sk=${rsp.data?.session_key}`); 
    }, 500)
    */
  } 
</script>

<MetaTag 
  path="/login" 
  title="Socialcap" 
  subtitle="Sign in" 
  description="Input your email" 
/>

<Onboarding
  title="Sign in" 
  subtitle="You need your Auro Wallet"
  alert={alert}
  status={status}
  >
  <svelte:fragment slot="alert">
    {#if alert === 'NO_WALLET'}
      Please connect your wallet
    {/if}
    {#if alert === 'NO_EMAIL'}
      Could not find your email. Correct it or  
      <A class="" href="/signup">sign up !</A>
    {/if}
    {#if alert === 'DONE'}
      Done ! Input the OTP we send you 
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="inputs">
    {#if !isConnected}
      <Label class="space-y-2 mt-6">
        <span class="text-sm font-semibold ps-1">Account</span>
        <Button 
          color="light" size="lg"  class="w-full" name="accountId" placeholder=""
          on:click={}>
          {accountId}
        </Button>
      </Label>
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="buttons">  
    <Button 
      class="w-full order-2 md:order-1 md:w-auto md:mb-0"
      color="light" 
      href="/signup" 
      size="lg"
      > 
      No account ? &nbsp; 
      <span class="text-blue-700">
        Sign up !
      </span>
    </Button>

    <SubmitButton
      on:click={() => getOTP()} 
      {working}
      disabled={!isConnected}
      class="w-full mb-2 order-1 md:order-2 md:w-auto md:mb-0 md:ms-2"
      size="lg"
      > 
      Login 
    </SubmitButton>
  </svelte:fragment>
</Onboarding>
