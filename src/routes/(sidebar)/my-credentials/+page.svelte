<script lang="ts">
  import MyCredentials from "./MyCredentials.svelte";
	import MetaTag from '../../utils/MetaTag.svelte';

	const path: string = '/home';
  const description: string = 'Admin Dashboard example using Flowbite Svelte';
  const title: string = 'Flowbite Svelte Admin Dashboard - Dashboard';
  const subtitle: string = 'Admin Dashboard';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
  <MyCredentials />
</main>
