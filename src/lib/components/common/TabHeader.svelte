<script lang="ts">
  import { Badge, Avatar, Button, Img } from 'flowbite-svelte';

  export let 
    label = "",
    count = 0,
    showCount = true;
</script>

<span class="inline-block text-sm font-bold">
  {label}
  {#if showCount}
  <Badge class="inline-block mb-0 ms-2 bg-gray-200 rounded-full">
    { count }
  </Badge>
  {/if}
</span>
