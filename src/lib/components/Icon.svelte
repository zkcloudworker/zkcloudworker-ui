<script lang="ts">
  export let
    name = '',
    size = "24",
    color = 'text-back';

  $: width = size;
  $: size = size;
</script>

<span class={`inline-block leading-none h-${width} w-${width} ${color}`}>
  <img 
    src={`/icons/${name}.svg`} 
    class={`h-${width} w-${width}`}
    alt={`${name} Icon`}
  />
</span>