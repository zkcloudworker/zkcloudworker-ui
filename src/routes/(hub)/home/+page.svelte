<script lang="ts">
  import { MetaTag, H1 } from "$lib/components";
	import H1Subtitle from "$lib/components/common/H1Subtitle.svelte";
  import Home from "./Home.svelte";
</script>

<MetaTag 
  path = '/home' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'Home'
/>

<main>
  <H1>This month status</H1>
  <Home />
</main>
