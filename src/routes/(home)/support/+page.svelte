<script lang="ts">
  import Support from "./Support.svelte";
  import { MetaTag } from "$lib/components";

	const path: string = '/home';
  const description: string = '';
  const title: string = 'Socialcap';
  const subtitle: string = 'Support';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
  <Support />
</main>
