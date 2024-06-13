<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getCurrentSession, removeActiveSession } from "$lib/store/sessions";
  import { signUp } from "$lib/api/sessions-api";
  import { Card, Button, Label, Input, Checkbox, A  } from "flowbite-svelte";
  import { SubmitButton, MetaTag } from "$lib/components";
  import Onboarding from "../Onboarding.svelte";
	import type { APIError } from "$lib/api";

  let session ;
  let alert: 'NO_EMAIL' | 'NO_SIGNUP' | 'DONE' | null = null;
  let working = "";
  let status = "WAIT";
  let error: APIError | null = null;
  let email = "", fullName = "";

  const STATUS_COLORS: any = {
    'NO_EMAIL': 'WARNING',
    'NO_SIGNUP': 'ERROR',
    'DONE': 'SUCCESS'
  }

  $: status = alert ? STATUS_COLORS[alert] : 'WAIT';

  onMount(async () => {
    session = removeActiveSession();
  })

  async function signUpNow() {
    working = "Go ...";
    let rsp = await signUp({
      email: email,
      full_name: fullName
    })
    working = "";

    if (rsp.error?.code === 404) {
      error = rsp.error;
      alert = 'NO_EMAIL';
      return;
    }

    if (rsp.error) { 
      error = rsp.error;
      alert = 'NO_SIGNUP';
      return;
    }

    // success
    // session = rsp;
    alert = 'DONE';
    setTimeout(() => {
      goto("/login")
    }, 3000)
  }

  function isValid(email: string, fullName: string) {
    return (
      email.length > 0 && email.includes('@')
      && fullName.length > 0
    );
  }

  const path: string = '/login';
  const description: string = 'Socialcap Login';
  const title: string = 'Socialcap';
  const subtitle: string = 'Login';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<Onboarding
  title="Sign up" 
  subtitle="Create a new account"
  alert={alert}
  status={status}
  >
  <svelte:fragment slot="alert">
    {#if alert === 'NO_SIGNUP'}
      Problem sending your Sign Up request: "
      <code>{error?.cause}</code>"
      <br>Please correct it and try again.
    {/if}
    {#if alert === 'NO_EMAIL'}
      This seems like and invalid email. Please correct it and retry.
    {/if}
    {#if alert === 'DONE'}
      We created the new account. You can login now !
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="inputs">
    <Label class="space-y-2 mt-6">
      <span class="text-sm font-semibold ps-1">
        Full Name
      </span>
      <Input 
        bind:value={fullName} 
        type="text" size="lg" name="fullName" placeholder="" required 
      />
    </Label>

    <Label class="space-y-2 mt-6">
      <span class="text-sm font-semibold ps-1">Email</span>
      <Input 
        bind:value={email} 
        type="email" size="lg" name="email" placeholder="" required 
      />
    </Label>
  </svelte:fragment>

  <svelte:fragment slot="buttons">  
    <Button 
      class="w-full order-2 md:order-1 md:w-auto md:mb-0"
      color="light" 
      href="/login" 
      size="lg"
      > 
      <span class="text-primary-700">
        Sign in
      </span>
    </Button>

    <SubmitButton
      on:click={() => signUpNow()} 
      {working}
      disabled={!isValid(email, fullName)}
      class="w-full mb-2 order-1 md:order-2 md:w-auto md:mb-0 md:ms-2"
      size="lg"
      > 
      Sign up
    </SubmitButton>
  </svelte:fragment>
</Onboarding>
