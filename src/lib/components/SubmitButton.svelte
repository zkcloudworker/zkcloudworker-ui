<script lang="ts">
  import { Button } from "flowbite-svelte";
  let twClasses = ""; 
	export { twClasses as class };  

  export let
    size: any = "lg",
    color: any = "blue",
    disabled = false,
    working = "";
</script>

<Button 
  on:click
  size={size}
  color={color}
  class={`${twClasses}`} 
  disabled={disabled || working}>
  {working || ""}
  &nbsp;
  {#if !working}
    <slot />    
  {/if}
</Button>