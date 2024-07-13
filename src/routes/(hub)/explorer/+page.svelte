<script lang="ts">
  import { Select } from "flowbite-svelte";
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
  import { type User } from "$lib/types";
  import { getCurrentUser } from "$lib/store";
  import JobsList from "../my-jobs/JobsList.svelte";

  const user: User = getCurrentUser() as User;
  let deployedBy = 'all'; // all | me | others

  // $: filters = 
  //   (deployedBy === 'all' ? `NOT id:${user.accountId}` : '')
  //   + (deployedBy === 'me' ? `NOT id:${user.accountId} AND developer:${user.alias}` : '')
  //   + (deployedBy === 'others' ? `NOT id:${user.accountId} AND NOT developer:${user.alias}` : '');
  $: filters = 
    (deployedBy === 'all' ? `` : '')
    + (deployedBy === 'me' ? `developer:${user.alias}` : '')
    + (deployedBy === 'others' ? `NOT developer:${user.alias}` : '');
</script>

<MetaTag 
  path = '/home' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'Explorer'
/>

<main>
   <H1>Explorer</H1>
   <H1Subtitle>
    Deployed by <Select size="lg"
      class="w-32 inline-block py-1 border-0"
      items={[
        { value: 'all', name: 'All' },
        { value: 'me', name: 'Me' },
        { value: 'others', name: 'Others' },
      ]}
      bind:value={deployedBy}
    />
  </H1Subtitle>  

  {#key filters}
    <JobsList 
      filterBy={filters} 
      search={''}
    />
  {/key}
</main>
