<script lang="ts">
  import { getAllCommunities } from '$lib/api/queries';
  import { onMount } from 'svelte';
  import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
  import MyCommunities from "./MyCommunities.svelte";
	import MetaTag from '../../utils/MetaTag.svelte';
	import type { Community } from '$lib/store/communities';

	const path: string = '/home';
  const description: string = 'Admin Dashboard example using Flowbite Svelte';
  const title: string = 'Flowbite Svelte Admin Dashboard - Dashboard';
  const subtitle: string = 'Admin Dashboard';

  let communities: Promise<Community[]>;

  onMount(() => {
    communities = getAllCommunities({ notJoined: true });
  })
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-8">
  <Breadcrumb class="mb-5 lg:hidden">
    <BreadcrumbItem home href="/home">Home</BreadcrumbItem>
    <BreadcrumbItem>My Communities</BreadcrumbItem>
  </Breadcrumb>

  <MyCommunities promised={communities}/>
</main>
