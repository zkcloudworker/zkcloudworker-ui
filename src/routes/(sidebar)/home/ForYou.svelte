<script lang="ts">
  import { onMount } from "svelte";
  import { Heading, P } from "flowbite-svelte";
  import H1 from "$lib/components/H1.svelte";
  import InvitationCard from "./InvitationCard.svelte";
  import CommunitiesList from "../my-communities/CommunitiesList.svelte"

  export let communities: any[] = [];
</script>

<div>
  <H1>For you</H1>
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
