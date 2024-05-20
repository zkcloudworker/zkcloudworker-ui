<script lang="ts">
  import MyVotes from "./MyVotes.svelte";
  import { MetaTag } from "$lib/components";

	const path: string = '/home';
  const description: string = 'Votes on your community claims';
  const title: string = 'My Votes';
  const subtitle: string = 'My Votes';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
  <MyVotes />
</main>
