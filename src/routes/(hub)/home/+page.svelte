<script lang="ts">
  import { MetaTag, H1 } from "$lib/components";
  import Home from "./Home.svelte";
</script>

<MetaTag 
  path = '/home' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'Home'
/>

<main>
  <H1>Dashboard</H1>
  <Home />
</main>
