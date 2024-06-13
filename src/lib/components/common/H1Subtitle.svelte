<script lang="ts">
	import { P } from 'flowbite-svelte';
	
  //export let href: string = '#';
  let twClasses = ""; 
	export { twClasses as class };  
</script>

<P class={`text-gray-400 font-normal mt-1 ${twClasses} text-lg lg:text-lg`}>
  <slot/>
</P>
