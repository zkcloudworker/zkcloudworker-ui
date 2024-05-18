<script lang="ts">
	import { P } from 'flowbite-svelte';
	
  //export let href: string = '#';
  let twClasses = ""; 
	export { twClasses as class };  
</script>

<P class={`text-gray-400 font-normal ${twClasses} text-xl lg:text-2xl`}>
  <slot/>
</P>
