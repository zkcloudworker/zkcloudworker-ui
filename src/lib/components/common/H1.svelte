<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	
  //export let href: string = '#';
  let twClasses = ""; 
	export { twClasses as class };  
</script>

<Heading tag="h3" class={`text-black ${twClasses}`}>
  <slot/>
</Heading>