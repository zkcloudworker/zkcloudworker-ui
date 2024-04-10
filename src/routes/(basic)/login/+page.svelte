<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getCurrentSession, type Session } from "$lib/store/sessions";
  import { requestOTP } from "$lib/api/mutations";
  import { Card, Button, Label, Input, Alert, A  } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import { SubmitButton } from "$lib/components";
	import MetaTag from '../../utils/MetaTag.svelte';

  let session: Session | null = null ;
  let email: string = '';
  let alert: 'NO_EMAIL' | 'NO_OTP' | 'DONE' | null = null;
  let working = "";

  onMount(async () => {
    session = getCurrentSession();
  })

  async function getOTP() {
    working = "Sending your OTP ...";
    let rsp = await requestOTP({ 
      email: email 
    });
    working = "";

    if (rsp.error?.code === 404) {
      // No valid email, go to signup
      alert = 'NO_EMAIL';
      return;
    }

    if (rsp.error) {
      alert = 'NO_OTP'; 
      return;
    }

    // success, ask for /otp
    alert = 'DONE'; // "Done ! Going to Home ..."
    setTimeout(() => { 
      goto(`/otp?sk=${rsp.data?.session_key}`); 
    }, 500)
  } 
</script>

<MetaTag 
  path="/login" 
  title="Socialcap" 
  subtitle="Sign in" 
  description="Input your email" 
/>

<main class="h-screen flex flex-col justify-center items-center pb-48">
  <p class="p-4 w-full max-w-[38rem]">
    {#if alert}
    <Alert color="yellow" class="p-6">
      <InfoCircleSolid slot="icon" class="w-6 h-6" />
      <span class="text-md font-semibold text-gray-900">
        {#if alert === 'NO_OTP'}
          Problem sending OTP request, please try again
        {/if}
        {#if alert === 'NO_EMAIL'}
          Could not find your email. Please <A class="text-lg" href="/signup">Sign up !</A>
        {/if}
        {#if alert === 'DONE'}
          Done ! Input the OTP we send you 
        {/if}
      </span>
    </Alert>  
    {/if}
  </p>

  <div class="px-4 flex justify-center w-screen">
    <Card size="md">
      <form class="p-4">
        <h3 class="m-0 p-0 text-2xl font-bold text-gray-900 dark:text-white">
          Sign in
        </h3>
        <p class="m-0 p-0 mt-1.5 font-normal text-sm text-gray-500 dark:text-gray-200">
          Enter your email to log in
        </p>
        
        <Label class="space-y-2 mt-6">
          <span class="text-sm font-semibold ps-1">Email</span>
          <Input 
            bind:value={email} 
            type="email" size="lg" name="email" placeholder="" 
            required 
          />
        </Label>

        <div class="mt-6">
          <div class="hidden md:flex md:items-center md:justify-between">
            <Button color="light" href="/signup" size="lg">
              No account ?
              &nbsp; <span  class="text-blue-700">Sign up !</span>
            </Button>
            <SubmitButton 
              on:click={() => getOTP()} 
              {working}
              size="lg">
              Send me the code
            </SubmitButton>
          </div>
          <div class="block md:hidden">
            <SubmitButton
              on:click={() => getOTP()} 
              {working}
              size="lg" class="w-full mb-2">
              Send me the code
            </SubmitButton>
            <Button color="light" href="/signup" size="lg" class="w-full">
              No account ?
              &nbsp; <span  class="text-blue-700">Sign up !</span>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  </div>
  <p>&nbsp;</p>
</main>
