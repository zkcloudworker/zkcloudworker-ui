<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	
  //export let href: string = '#';
  let twClasses = ""; 
	export { twClasses as class };  
</script>

<Heading tag="h1" class={`text-black text-3xl font-semibold ${twClasses}`}>
  <slot/>
</Heading>