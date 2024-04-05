<script lang="ts">
	import type { PageData } from './$types';
  import ActivityPanel from './ActivityPanel.svelte';
  import ForYou from "./ForYou.svelte";
  import { communities, activities } from './data';
</script>

<div class="p-4">
  <div class="flex items-start justify-start">
    <div class="w-full max-w-screen-lg">
      <ForYou {communities}/>
    </div>

    <div class="hidden xl:block xl:ms-8 max-w-screen-lg">
      <ActivityPanel {activities}/>
    </div>
  </div>
</div>
