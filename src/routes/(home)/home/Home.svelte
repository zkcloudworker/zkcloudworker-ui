<script lang="ts">
  import InvitationCard from "./InvitationCard.svelte";
  import ForYou from "./ForYou.svelte";
  let openInvite = true;
</script>

<div class="p-4 w-full">
  <InvitationCard bind:open={openInvite}/>
  <ForYou />
</div>
