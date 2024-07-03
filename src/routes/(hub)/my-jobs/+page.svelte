<script lang="ts">
  import { Select } from "flowbite-svelte";
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
  import { type User } from "$lib/types";
  import { getCurrentUser } from "$lib/store";
  import JobsList from "./JobsList.svelte";
	import { use } from "chai";

  export let data: any = null;

  const user: User = getCurrentUser() as User;
  let deployedBy = 'all'; // all | me | others

  $: filters = `id:${user.accountId}`
      + (deployedBy === 'me' ? ` AND developer:${user.alias}` : '')
      + (deployedBy === 'others' ? ` AND NOT developer:${user.alias}` : '');
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
      search={data.repo || ''}
    />
  {/key}
</main>
