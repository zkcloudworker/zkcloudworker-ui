<script lang="ts">
  import MyTasks from "./MyTasks.svelte";
	import MetaTag from '../../utils/MetaTag.svelte';
	export let data;

	const path: string = '/home';
  const description: string = 'Admin Dashboard example using Flowbite Svelte';
  const title: string = 'Flowbite Svelte Admin Dashboard - Dashboard';
  const subtitle: string = 'Admin Dashboard';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
	<!-- <Dashboard {data} /> -->
  <MyTasks />
</main>
