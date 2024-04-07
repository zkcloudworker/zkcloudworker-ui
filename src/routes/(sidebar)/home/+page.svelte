<script lang="ts">
  import { onMount } from "svelte";
  import { CACHE } from "$lib/api/caches";
  import { getAllCommunities } from "$lib/api/queries";
  import Home from "./Home.svelte";
	import MetaTag from '../../utils/MetaTag.svelte';
  import { activities } from './data';

	const path: string = '/home';
  const description: string = 'Admin Dashboard example using Flowbite Svelte';
  const title: string = 'Flowbite Svelte Admin Dashboard - Dashboard';
  const subtitle: string = 'Admin Dashboard';

  const STORE_KEY = 'all_communities';
  let communities: any[];

  onMount(() => {
    // communities = getAllCommunities({ notJoined: true });
    communities = CACHE.get(STORE_KEY) || [];
    getAllCommunities({ notJoined: true }).then((data: any[]) => {
      communities = data;
      CACHE.set(STORE_KEY, data);
    })
  })
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
  <Home {communities} {activities}/>
</main>
