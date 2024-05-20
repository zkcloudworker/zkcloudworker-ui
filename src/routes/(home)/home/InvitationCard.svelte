<script lang="ts">
  import { Card, Dropdown, DropdownItem, Avatar, Button, Img } from 'flowbite-svelte';

  export let open = true;
</script>

{#if open}
<Card class="text-center mt-8 border-0 shadow-xl" size="fluid" padding="xl">
  <div class="flex flex-col items-center pb-4">
    <!-- <div class="flex mb-5">
      <Avatar src="/images/gradient-nicolas.svg" stacked />
      <Avatar src="/images/gradient-lean.svg" stacked />
      <Avatar src="/images/gradient-maria.svg" stacked/>
      <Avatar stacked />
    </div>       -->
    <div>
      <Img src="/images/invite-banner.png" class="h-20"/>
    </div>
    <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Better together</h6>
    <p class="mb-4 text-base text-gray-600 sm:text-lg dark:text-gray-400">
      Invite teammates and create better communities
    </p>
    <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
      <Button color="light"
        on:click={() => open = false}>
        Dismiss
      </Button>
      <Button color="blue">Invite</Button>
    </div>
  </div>
</Card>  

<br>
{/if}