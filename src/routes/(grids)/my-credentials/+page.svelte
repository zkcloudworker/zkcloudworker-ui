<script lang="ts">
  import MyCredentials from "./MyCredentials.svelte";
  import { MetaTag } from "$lib/components";

	const path: string = '/home';
  const description: string = '';
  const title: string = 'Socialcap';
  const subtitle: string = 'My Credentials';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
  <MyCredentials />
</main>
