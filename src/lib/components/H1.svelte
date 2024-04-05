<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	//export let href: string = '#';
  let twClasses = "" 
</script>

<Heading tag="h3" class={twClasses}>
  <slot/>
</Heading>