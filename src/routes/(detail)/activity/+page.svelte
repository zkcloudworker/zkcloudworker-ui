<script lang="ts">
  import Activity from "./Activity.svelte";
  import { MetaTag } from "$lib/components";
	export let data;

	const path: string = '/home';
  const description: string = '';
  const title: string = 'Socialcap';
  const subtitle: string = 'Activity';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
	<!-- <Dashboard {data} /> -->
  <Activity />
</main>
