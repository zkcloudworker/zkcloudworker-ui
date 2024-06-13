<script lang="ts">
  import { Button, Spinner } from "flowbite-svelte";
  let twClasses = ""; 
	export { twClasses as class };  

  export let
    size: any = "lg",
    color: any = "primary",
    disabled = false,
    working = "";
</script>

<Button 
  type="submit"
  on:click
  size={size}
  color={color}
  class={`${twClasses}`} 
  disabled={disabled || working}>
  {#if working}
    <Spinner class="me-3" size="4" color="red" />
    <code>{working || ""}</code>
    &nbsp;
  {:else}
    <slot />    
  {/if}
</Button>