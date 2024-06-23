<script lang="ts">
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
	import { usernamePasswordAuthenticator } from "nats.ws";
  import WorkersList from "./WorkersList.svelte";
	import Home from "../home/Home.svelte";
</script>

<MetaTag 
  path = '/home' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'My Workers'
/>

<main>
   <H1>My Workers</H1>
   <H1Subtitle>All deployed</H1Subtitle>
   <WorkersList />
</main>
