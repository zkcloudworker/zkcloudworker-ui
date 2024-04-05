<script lang="ts">
	import type { PageData } from './$types';
  import { Heading, P } from "flowbite-svelte";
  import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';
  import InvitationCard from './InvitationCard.svelte';
  import CommunityCard from './CommunityCard.svelte';
  import ActivityPanel from './ActivityPanel.svelte';

  export let communities = [];
</script>

<Heading tag="h4">
  For you
</Heading>
<P class="text-gray-400" size="base">
  Join new communities  
</P>
<InvitationCard />
<br>
<div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
  {#each communities as c}
    <CommunityCard
      title={c.title}
      description={c.description}
      count={c.count}/>
  {/each}
</div>
