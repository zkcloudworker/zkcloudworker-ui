<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button, Dropdown, DropdownItem, ToolbarButton, DropdownDivider } from 'flowbite-svelte';
  import { DotsHorizontalOutline, DotsVerticalOutline } from 'flowbite-svelte-icons';

  export let 
    open = false;

  let items: any[] = [];   

  const dispatcher = createEventDispatcher();  

  $: items = buildItems();

  function buildItems(): any[] {
    items = [];
    return items;
  }

  function dispatch(ev: any, action: string) {
    ev.preventDefault();//.stopPropagation();
    dispatcher(action);
    open = false;
  }
</script>

<button 
  on:click|preventDefault|stopPropagation={() => open = !open} 
  class="p-1 no-border">
  <slot>
    <DotsVerticalOutline size="lg" class="dark:text-white" />
  </slot>
</button>
<Dropdown bind:open={open} class="shadow-lg rounded-lg border-2 border-gray-100 text-black py-1">
  {#each items as item}
    <DropdownItem on:click={(ev) => dispatch(ev,item.action)}>
      {item.name}
    </DropdownItem>
  {/each}
</Dropdown>
