<script lang="ts">
  import ActivityPanel from "./ActivityPanel.svelte";
  import InvitationCard from "./InvitationCard.svelte";
  import ForYou from "./ForYou.svelte";
</script>

<div class="p-4">
  <div class="flex items-start justify-start">
    <div class="w-full max-w-screen-lg">
      <InvitationCard />
      <br>
      <ForYou />
    </div>

    <div class="hidden xl:block xl:ms-8 max-w-screen-lg">
      <ActivityPanel />
    </div>
  </div>
</div>
