<script lang="ts">
  import { onMount } from 'svelte';
  import { CACHE } from "$lib/api/caches";
  import { getMyCommunities } from '$lib/api/queries';
  import { Breadcrumb, BreadcrumbItem, P } from 'flowbite-svelte';
	import MetaTag from '../../utils/MetaTag.svelte';
	import MyCommunities from "./MyCommunities.svelte";

	const path: string = '/home';
  const description: string = 'Admin Dashboard example using Flowbite Svelte';
  const title: string = 'Flowbite Svelte Admin Dashboard - Dashboard';
  const subtitle: string = 'Admin Dashboard';

  const STORE_KEY = 'my_communities';
  let communities: any[];

  onMount(() => {
    // communities = getAllCommunities({ notJoined: true });
    communities = CACHE.get(STORE_KEY) || [];
    getMyCommunities().then((data: any[]) => {
      communities = data;
      CACHE.set(STORE_KEY, data);
    })
  })
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-8">
  <!-- only on mobile -->
  <Breadcrumb class="mb-5 lg:hidden">
    <BreadcrumbItem home href="/home">Home</BreadcrumbItem>
    <BreadcrumbItem>My Communities</BreadcrumbItem>
  </Breadcrumb>

  <MyCommunities {communities} />
</main>
