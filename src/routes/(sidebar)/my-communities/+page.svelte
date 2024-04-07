<script lang="ts">
  import { CACHE } from "$lib/api/caches";
  import { getAllCommunities, getMyCommunities } from '$lib/api/queries';
  import { onMount } from 'svelte';
  import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
  import MyCommunities from "./MyCommunities.svelte";
	import MetaTag from '../../utils/MetaTag.svelte';
	import type { Community } from '$lib/store/communities';

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
  <Breadcrumb class="mb-5 lg:hidden">
    <BreadcrumbItem home href="/home">Home</BreadcrumbItem>
    <BreadcrumbItem>My Communities</BreadcrumbItem>
  </Breadcrumb>

  <MyCommunities data={communities}/>
</main>
