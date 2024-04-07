<script lang="ts">
  import { onMount } from "svelte";
  import { Heading, P } from "flowbite-svelte";
  import InvitationCard from "./InvitationCard.svelte";
  import CommunitiesList from "../my-communities/CommunitiesList.svelte"
  
  export let communities: any[] = [];
</script>

<div>
  <Heading tag="h4">
    For you
  </Heading>
  <P class="text-gray-400" size="base">
    Join new communities  
  </P>
  <InvitationCard />
  <br>
  <CommunitiesList 
    data={communities} 
    joined={false} 
  />
</div>
