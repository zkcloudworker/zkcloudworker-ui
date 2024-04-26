<script lang="ts">
  import { onMount } from 'svelte';
  import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
  import { type NavigationPath, NavigationLabels } from '$lib/types';
  import { navigationPath } from '$lib/store';

  let twClasses = ""; export { twClasses as class };  
  export let label = "";

  let navigation: NavigationPath | null = null;

  onMount(() => {
    // navigation = getNavigationPath();
    // console.log("onMount navigation=", navigation);
  })
</script>

<Breadcrumb class={`mb-5 ms-2 ${twClasses}`}>
  <BreadcrumbItem home href="/home">
    { NavigationLabels['/home'] }
  </BreadcrumbItem>

  {#if $navigationPath.from && $navigationPath.from !== '/home'}
    <BreadcrumbItem href={$navigationPath.from}>
      { NavigationLabels[$navigationPath.from] || ''}
    </BreadcrumbItem>
  {/if}
  
  <BreadcrumbItem>{label || ""}</BreadcrumbItem>
</Breadcrumb>
