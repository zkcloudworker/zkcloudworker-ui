<script lang="ts">
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
  import { type User } from "$lib/types";
  import { getCurrentUser } from "$lib/store";
  import JobsList from "./JobsList.svelte";

  export let data: any = null;

  const user: User = getCurrentUser();
</script>

<MetaTag 
  path = '/home' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'My Jobs'
/>

<main>
  <H1>My Jobs</H1>
  <H1Subtitle>
    Repository: {data.repo || 'All repositories'} ({user.alias})
  </H1Subtitle>  

  <JobsList 
    developer={user.alias}
    filterBy={data.repo ? `${data.repo}` : ''}
  />
</main>
