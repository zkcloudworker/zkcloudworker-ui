<script lang="ts">
  import { onMount } from 'svelte';
  import { Breadcrumb, BreadcrumbItem, P } from 'flowbite-svelte';
  import { MetaTag } from "$lib/components";
	import MyCommunities from "./MyCommunities.svelte";

	const path: string = '/home';
  const description: string = 'Admin Dashboard example using Flowbite Svelte';
  const title: string = 'Flowbite Svelte Admin Dashboard - Dashboard';
  const subtitle: string = 'Admin Dashboard';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
  <!-- only on mobile -->
  <Breadcrumb class="mb-5 lg:hidden">
    <BreadcrumbItem home href="/home">Home</BreadcrumbItem>
    <BreadcrumbItem>My Communities</BreadcrumbItem>
  </Breadcrumb>

  <MyCommunities />
</main>
