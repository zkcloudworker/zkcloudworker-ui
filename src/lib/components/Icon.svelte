<script lang="ts">
  let twClasses = ""; 
	export { twClasses as class };  

  export let
    name = '',
    size = '24',
    color = 'text-black';

  $: width = size;
  $: size = size;
</script>

<span class={`inline-block leading-none h-${width} w-${width} ${color} ${twClasses}`}>
  <img 
    src={`/icons/${name}.svg`} 
    class={`h-${width} w-${width}`}
    alt={`${name} Icon`}
  />
</span>