<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getCurrentSession, removeActiveSession, saveActiveSession, type Session } from "$lib/store/sessions";
  import { Button, Badge, A  } from "flowbite-svelte";
  import { SubmitButton } from "$lib/components";
  import { MetaTag } from "$lib/components";
  import Onboarding from "../Onboarding.svelte";
  import ConnectWalletDialog from "$lib/components/common/ConnectWalletDialog.svelte";
  import { isWalletConnected  } from "$lib/store/wallet";
  import { getMyAccount } from "$lib/api/queries";
	import { saveActiveUser } from "$lib/store";

  let session: Session | null = null ;
  let alert: 'NO_WALLET' | 'NO_OTP' | 'DONE' | null = null;
  let working = "";
  let status = "WAIT";
  let hasAccount = ''; // the connected account !

  const STATUS_COLORS: any = {
    'NO_WALLET': 'WARNING',
    'NO_OTP': 'WARNING',
    'DONE': 'SUCCESS'
  }

  $: status = alert ? STATUS_COLORS[alert] : 'WAIT';

  onMount(async () => {
    session = removeActiveSession();
    hasAccount = await isWalletConnected();
  });

  async function loginNow() {
    working = "Connecting ...";
    let rsp = await getMyAccount({
      id: hasAccount
    })    
    if (rsp.success) {
      setTimeout(() => { 
        session = session as Session;
        session.key = rsp.data.id;
        saveActiveSession(session);
        saveActiveUser({
          uid: hasAccount,
          accountId: hasAccount, 
          alias: rsp.data.alias,
          fullName: rsp.data.fullName,
          email: rsp.data.email,
          preferences: rsp.data.preferences,
        })
        goto(`/home`); 
      }, 500)
      working = "Done !";
    }
    else {
      working = "Done !";
      goto("/signup")
    }
  }

</script>

<MetaTag 
  path="/login" 
  title="zkCloudWorker" 
  subtitle="Sign in" 
  description="Input your email" 
/>

<Onboarding
  title="Sign in" 
  subtitle=""
  alert={alert}
  status={status}
  >
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
        <SubmitButton
          {working}
          class="w-full mb-2 order-1 md:order-2 md:w-auto md:mb-0 md:ms-2"
          size="lg"
          color="primary" 
            on:click={() => { loginNow() }}
          >
          Login
        </SubmitButton>
      </div>
    {/if}
  </svelte:fragment>
</Onboarding>
