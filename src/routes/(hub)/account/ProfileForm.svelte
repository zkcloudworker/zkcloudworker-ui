<script lang="ts">
  import { goto } from "$app/navigation";
  import { Input, Label, Helper, A } from "flowbite-svelte";
  import SubmitButton from "$lib/components/common/SubmitButton.svelte";
	import { getCurrentUser } from "$lib/store";
  import { type User } from "$lib/types";
  import { updateProfile } from "$lib/api/mutations";

  let user: User = getCurrentUser() as User;

  let working = "";
  let warns: 'DONE' | 'ERROR' | null = null;
  const warnsMessages: any = {
    'ERROR': 'ERROR' // to be filled latter
  }

  function generateJWT() {
    alert("7")
  }

  async function updateNow() {
    working = "Connecting ...";

    // now we try to create the update account 
    let rsp = await updateProfile({
      id: user.accountId,
      alias: user.alias,
      email: user.email,
      fullName: user.fullName,
      preferences: '{}'
    })    

    if (rsp.success) {
      setTimeout(() => { 
        working = "";
        goto("/home")
      }, 500)
      working = "Done !";
    }

    if (!rsp.success) {
      working = "";
      // show error and stay in /signup
      warns = 'ERROR';
      warnsMessages[warns] = `Could not save the profile (${rsp.error})`;
      alert(warnsMessages['ERROR']);
    }
  }
</script>

<Helper class="text-xs text-gray-500 mt-2">
  We’ll never share your details. Read our <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500"> Privacy Policy</a>.
</Helper>

<div class="border-0 max-w-lg mt-8">

  <Label class="mt-8 block space-y-2">
    <span class="text-base text-black">Wallet account</span>
    <div class="text-sm border rounded-md p-2  break-words">
      {user.accountId}
    </div>  
  </Label>

  <Label class="mt-6 block space-y-2">
    <span class="text-base text-black">Full name</span>
    <Input class="text-lg" label="fullName" id="fullName" name="fullName" 
      required placeholder="" 
      bind:value={user.fullName}/>
    <Helper class="text-sm text-gray-500">
      Your full name.
    </Helper>
  </Label>

  <Label class="mt-6 block space-y-2">
    <span class="text-base text-black">Your email</span>
    <Input class="text-lg" label="Email" id="email" name="email" 
      required placeholder="" 
      bind:value={user.email}/>
    <Helper class="text-sm text-gray-500">
      A mail where we can send notifications. It will not be used for login.
    </Helper>
  </Label>

  <Label class="mt-6 block space-y-2">
    <span class="text-base text-black">Alias</span>
    <Input class="text-lg" label="alias" id="alias" name="alias" 
      required placeholder="" 
      bind:value={user.alias}/>
    <Helper class="text-sm text-gray-500">
      Your developer alias. Will use it when deploying your workers.
    </Helper>
  </Label>

  <Label class="mt-6 block space-y-2">
    <span class="text-base text-black">API Key</span>
    &nbsp; | &nbsp;
    <A on:click={generateJWT} class="">
      Generate new API Key
    </A>
    <div class="text-sm border rounded-md p-2 break-words">
      {'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkI2MnFwYnFMQjFwYWJaVXU0b2FES0ZtdjcyRHRIV25GeEdLOGF1Y05aSHhTMWNEbW1zcnJwVnAiLCJpYXQiOjE3MTg3NzYxMzUsImV4cCI6MTc1MDMxMjEzNX0.mAXEUY_iLYOsD6GBzk7ufnsbvHZKqsHVwDv95-M0kE8'}
    </div>  
    <Helper class="text-sm text-gray-500">
      Your JWToken for deploying and calling your workers. 
    </Helper>
  </Label>

  <div class="mt-8">
    <SubmitButton 
      on:click={() => { updateNow() }}
      {working}
      class="w-full mb-2 order-1 md:order-2 md:w-auto md:mb-0 md:ms-2"
      size="lg"
      color="primary">
      Save changes
    </SubmitButton>
  </div>

</div>