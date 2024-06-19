<script lang="ts">
  import { Card, Button } from "flowbite-svelte";

  export let 
    title = "",
    items: {
      label: string;
      value: string;
      unit: string;
      color: string;
    }[] = [];
</script>

<Card size="none" padding="xl">
  <p class="text-sm text-gray-400">{title}</p>
  <div class="flex items-baseline justify-between text-gray-900 dark:text-white">
    {#each items as t}
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{t.label}</h5>
        <span class={`text-5xl font-extrabold tracking-tight text-${t.color}-700`}>{t.value}</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400">{t.unit}</div>
      </div>
    {/each}
  </div>
  {#if $$slots.buttons}
    <slot name="buttons"></slot>
  {/if}
</Card>
