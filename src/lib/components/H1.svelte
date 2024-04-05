<script lang="ts">
	import { Heading } from 'flowbite-svelte-icons';
	//export let href: string = '#';
  let twClasses = "" 
</script>

<Heading tag="h3" class={twClasses}>
  <slot/>
</Heading>