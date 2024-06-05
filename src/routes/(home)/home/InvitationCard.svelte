<script lang="ts">
  import { Card, Dropdown, DropdownItem, Avatar, Button, Img } from 'flowbite-svelte';

  export let open = true;
</script>

{#if open}
<Card 
  class="text-center mt-4  border-0 shadow-xl h-54" 
  size="none" padding="xl" 
  style={`
    background-image: url("/images/Maskgroup.svg");
    background-position-x: right;
    background-position-y: center;
    background-repeat: no-repeat;
    background-size: 224px;  
    background-color: #F5F7FE
  `}>
  <div class="flex flex-col items-start pt-3">
    <h6 class="mb-0 text-2xl font-semibold text-gray-900 dark:text-white">
      Better together, invite friends
    </h6>
    <p class="mb-10 text-base text-gray-600 dark:text-gray-400">
      Invite teammates and create better communities
    </p>
    <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
      <Button color="blue">
        Invite
      </Button>
      <Button color="transparent"
        on:click={() => open = false}>
        Dismiss
      </Button>
    </div>
  </div>
</Card>  

<br>
{/if}