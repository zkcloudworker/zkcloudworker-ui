<script lang="ts">
  import { goto } from "$app/navigation";
  import { Input, Label, Helper, A } from "flowbite-svelte";
  import SubmitButton from "$lib/components/common/SubmitButton.svelte";
	import { getCurrentUser } from "$lib/store";
  import { type User } from "$lib/types";
  import { updateProfile, generateJWT } from "$lib/api/mutations";

  let user: User = getCurrentUser() as User;

  let working = "";
  let warns: 'DONE' | 'ERROR' | 'JWT_ERROR' | null = null;
  let errorMessages = "";

  async function recreateJWT() {
    warns = null;
    user.JWT = "Creating your API key ...";
    let rsp = await generateJWT(user.accountId);
    user.JWT = rsp.success ? rsp.data : '';
    warns = rsp.success ? null : 'JWT_ERROR';
    errorMessages = rsp.success ? '' : `Could not generate the JWT: ${rsp.error}`;
  }

  async function updateNow() {
    working = "Connecting ...";

    // now we try to create the update account 
    let rsp = await updateProfile({
      id: user.accountId,
      alias: user.alias,
      email: user.email,
      fullName: user.fullName,
      preferences: '{}',
      discord: user.discord,
      JWT: user.JWT
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
      errorMessages = `Could not save the profile (${rsp.error})`;
    }
  }
</script>

<Helper class="text-xs text-gray-500 mt-2">
  We’ll never share your details. Read our <a href="/support" class="font-medium text-primary-600 hover:underline dark:text-primary-500"> Privacy Policy</a>.
</Helper>

<div class="border-0 max-w-lg mt-8">

  <Label class="mt-8 block space-y-2">
    <span class="text-sm text-black">Wallet account</span>
    <div class="text-sm border rounded-md p-2  py-3 break-words">
      {user.accountId}
    </div>  
  </Label>

  <Label class="mt-6 block space-y-2">
    <span class="text-sm text-black">Full name</span>
    <Input class="text-lg" label="fullName" id="fullName" name="fullName" 
      required placeholder="" 
      bind:value={user.fullName}/>
    <Helper class="text-xs text-gray-500">
      Your full name.
    </Helper>
  </Label>

  <Label class="mt-6 block space-y-2">
    <span class="text-sm text-black">Alias</span>
    <Input class="text-lg" label="alias" id="alias" name="alias" 
      required placeholder="" 
      bind:value={user.alias}/>
    <Helper class="text-xs text-gray-500">
      Your developer alias. Will use it when deploying your workers.
    </Helper>
  </Label>

  <Label class="mt-6 block space-y-2">
    <span class="text-sm text-black">Your email</span>
    <Input class="text-lg" label="Email" id="email" name="email" 
      required placeholder="" 
      bind:value={user.email}/>
    <Helper class="text-xs text-gray-500">
      A mail where we can send notifications. It will not be used for login.
    </Helper>
  </Label>

  <Label class="mt-6 block space-y-2">
    <span class="text-sm text-black">Discord ID</span>
    <Input class="text-lg" label="Discord" id="discord" name="discord" 
      required placeholder="" 
      bind:value={user.discord}/>
    <Helper class="text-xs text-gray-500">
      Your Discord username where we can send notifications.
    </Helper>
  </Label>

  <Label class="mt-6 block space-y-2">
    <span class="text-sm text-black">API Key</span>
    &nbsp; | &nbsp;
    <A on:click={recreateJWT} class="">
      Generate new API Key
    </A>
    <div class="text-sm border rounded-md p-2 py-3 break-words">
      {user.JWT || ''}
    </div>  
    <Helper class="text-sm" 
      color={warns === 'JWT_ERROR' ? 'red' : 'gray'}>
      {warns === 'JWT_ERROR' 
        ? errorMessages
        : 'Your JWToken for deploying and calling your workers.'
      }   
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