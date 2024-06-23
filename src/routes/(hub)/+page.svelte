<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
	import type { PageData } from './$types';
  import { MetaTag } from "$lib/components";
  import Home from "./home/Home.svelte";

	const path: string = '';
  const description: string = 'Socialcap App';
  const title: string = 'Socialcap';
  const subtitle: string = 'Home';
</script>

<MetaTag {path} {description} {title} {subtitle} />
<main class="p-">
	<!-- <Dashboard {data} /> -->
  <Home />
</main>
