<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Button, Badge, A  } from "flowbite-svelte";
  import { SubmitButton } from "$lib/components";
  import { MetaTag } from "$lib/components";
  import Onboarding from "../Onboarding.svelte";
  import ConnectWalletDialog from "$lib/components/common/ConnectWalletDialog.svelte";
  import { isWalletConnected, signWithWallet  } from "$lib/store/wallet";
	import { saveActiveUser } from "$lib/store";
  import { signUp } from "$lib/api/mutations";
  import { type Session } from "$lib/types";
  import { removeActiveSession, saveActiveSession } from "$lib/store/sessions";

  let session: Session | null = null ;
  let hasAccount = ''; // the connected account !

  let warns: 'NO_WALLET' | 'NOT_SIGNED' | 'DONE' | 'ERROR' | null = null;
  let working = "";
  let status = "WAIT";
  let warnsMessage = '';

  const STATUS_COLORS: any = {
    'NO_WALLET': 'WARNING',
    'NOT_SIGNED': 'WARNING',
    'ERROR': 'ERROR',
    'DONE': 'SUCCESS'
  }

  $: status = warns ? STATUS_COLORS[warns] : 'WAIT';

  const warnsMessages: any = {
    'NOT_SIGNED': 'You need to sign with your wallet !',
    'ERROR': 'ERROR' // to be filled latter
  }

  onMount(async () => {
    session = removeActiveSession();
    hasAccount = await isWalletConnected();
  });

  async function signUpNow() {
    working = "Connecting ...";
    warns = null;

    // must sign with wallet here !
    let walletResponse = await signWithWallet({ id: hasAccount })
    if (walletResponse.isError) {
      warns = 'NOT_SIGNED';
      working = "";
      return;
    }

    // now we try to create the new account 
    let rsp = await signUp({
      id: hasAccount,
      chain: walletResponse.chain || {},
      signed: walletResponse.signedData || ''
    })    

    if (rsp.success) {
      // check response is ok and account has been created exists
      let isValid = rsp.data && (!Array.isArray(rsp.data) && rsp.data.id); 

      setTimeout(() => { 
        // does not exist, needs Signup
        if (!isValid) {
          goto("/signup")
          return;
        }

        // account exists !
        goto(`/login`); 
      }, 500)

      working = "Done !";
    }

    if (!rsp.success) {
      working = "";
      // show error and stay in /signup
      warns = 'ERROR';
      warnsMessages[warns] = `Could not create account (${rsp.error})`;
    }
  }
</script>

<MetaTag 
  path="/signup" 
  title="zkCloudWorker" 
  subtitle="Sign Up" 
  description="Signup with Auro wallet" 
/>

<Onboarding
  title="Sign up" 
  subtitle="Create a new account"
  alert={warns && warnsMessages[warns]}
  status={status}
  >
  <!-- <svelte:fragment slot="alert">
    <span>{warnMessages[warns]}</span>
  </svelte:fragment> -->

  <svelte:fragment slot="inputs">
    {#if !hasAccount}
      <ConnectWalletDialog 
        on:continue={async (ev) => { 
          hasAccount = await isWalletConnected();
        }}
      />
    {:else}
      <div class="text-center mt-8">
        <img  alt="icon"  class="inline-block h-10" src="/icons/Activity.svg"/>
        <div class="mt-5 text-gray-900">
          Connected with account <Badge large rounded color="green" class="py-1">
            {hasAccount.slice(0,6)}...{hasAccount.slice(-6)}
          </Badge>
        </div>
      </div>
      <div class="mt-8 px-0 py-6 w-full flex items-center justify-center">
        <Button color="light" class="me-2" href="/login">
          Login
        </Button>

        <SubmitButton
          {working}
          class="w-full mb-2 order-1 md:order-2 md:w-auto md:mb-0 md:ms-2"
          size="lg"
          color="primary" 
            on:click={() => { signUpNow() }}
          >
          Sign up
        </SubmitButton>
      </div>
    {/if}
  </svelte:fragment>
</Onboarding>
