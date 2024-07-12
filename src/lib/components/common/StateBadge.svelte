<script>
    import { Badge } from "flowbite-svelte";
    import { StateStyles } from "$lib/types/states";
    let clazz = "";
    export { clazz as class };

    export let state = ''; 
    $: styled = StateStyles[state || 'unknown'];
</script>

{#if state}
  <span class="inline-block flex items-center justify-start">
    <Badge 
      rounded 
      class={`
        py-1 px-1
        ${styled.color} 
        ${clazz || ''} 
      `}>
      <svelte:component this={styled.icon} class="w-4 h-4"/>
    </Badge>
    <span class="text-xs inline-block ms-2">{styled.label}</span>
  </span>
{/if}
