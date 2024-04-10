<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getCurrentSession, getDefaultSession } from "$lib/store/sessions";
  import { saveActiveSession, type Session } from "$lib/store/sessions";
  import { API } from "$lib/api";
  import { login } from "$lib/api/mutations";
  import { Card, Button, Label, Input, A, Alert  } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
	import { MetaTag, SubmitButton } from '$lib/components';

  export let data: any;
 
  let otp: string = "";
  let session: Session | null = null;
  let working = "";
  let alert: 'DONE' | 'NO_OTP' | null = null;

  onMount(async () => {
    session = getCurrentSession();
  })

  async function loginNow() {
    working = "Signing in ... ";
    let rsp = await login({ 
      session_key: data.sessionKey, 
      otp: otp 
    });
    working = "";

    if (rsp.error) {
      alert = 'NO_OTP'; 
      return;
    }

    // save state in currentSession
    session = getDefaultSession();
    session.authorization = rsp.data.authorization;
    saveActiveSession(session);
    API.init(activeSession);  

    // success
    alert = 'DONE';
    setTimeout(() => { 
      goto('/home'); 
    }, 1000)
  } 

  function validateOtp(e: any) {
    const value = e.target.value;
    const input = e.data;
    const isValid = "0123456789".includes(input) 
                    || e.inputType == "deleteContentBackward";
    console.log("before: ", e.key, input, isValid, value, otp);
    otp = isValid ? value : otp;                  
    console.log("after: ", value, otp);
    e.target.value = otp;
  }

  $: noSignin = ((otp || '').length < 6);
</script>

<MetaTag 
  path="/login" 
  title="Socialcap" 
  subtitle="OTP" 
  description="Input your OTP code here" 
/>

<main class="p-4 h-screen flex items-center pb-48">
  <p class="p-4 w-full max-w-[38rem]">
    {#if alert}
    <Alert color="yellow" class="p-6">
      <InfoCircleSolid slot="icon" class="w-6 h-6" />
      <span class="text-md font-semibold text-gray-900">
        {#if alert === 'NO_OTP'}
          The OTP code seems invalid, please try again !
        {/if}
        {#if alert === 'DONE'}
          Done ! Going to Home ...
        {/if}
      </span>
    </Alert>  
    {/if}
  </p>

  <div class="flex justify-center w-screen">
      <Card size="sm" class="--max-w-[22rem]">
        <form class="p-2">
          <h3 class="m-0 p-0 text-2xl font-bold text-gray-900 dark:text-white">
            Check your email
          </h3>
          <p class="m-0 p-0 mt-1.5 font-normal text-sm text-gray-500 dark:text-gray-200">
            You’ll received a 6 digit code in your email
          </p>
          
          <Label class="space-y-2 mt-6">
            <span class="text-sm font-semibold ps-1">Enter 6 digit code</span>
            <div class="flex items-center justify-between space-x-1">
              <!-- on:input={(e) => validateOtp(e)} -->
              <Input 
                bind:value={otp}
                class="tracking-[1.4rem] text-2xl w-full ps-4 pe-0 overscroll-none"
                maxlength="6"
                name="otp" 
                placeholder="------" 
                required 
                autofocus
              />
            </div>
          </Label>

          <div class="mt-6 flex items-center justify-between">
            <Button color="light" href="/login">
              <span  class="text-blue-600">Other email !</span>
            </Button>
            <SubmitButton
              on:click={() => loginNow()} 
              {working}
              disabled={noSignin}
              size="lg">
              Sign in
            </SubmitButton>
          </div>
        </form>
      </Card>
    </div>
  <p>&nbsp;</p>
</main>

