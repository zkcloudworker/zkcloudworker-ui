<script lang="ts">
  import Time from "svelte-time/Time.svelte";
  import GradientAvatar from "../common/GradientAvatar.svelte";
  import { getInitials, buildGradient } from "../common/gradient-svg";

  export let 
    uid: string = "",
    personUid: string = "",
    fullName: string = "",
    createdUTC: Date,
    role: string,
    isAdmin: boolean = false;
  
  $: initials = getInitials(fullName);
</script>

<div class="flex items-center justify-between pt-3 pb-3 border-b">
  <div class="w-12">
    <GradientAvatar 
      initials={initials} 
      gradient={buildGradient(initials)} 
    />
  </div>
  <div class="w-full h-12 ms-4 text-base font-semibold text-black text-start">
    <a href={`/person/${personUid}`}>
      {fullName}
    </a>
    <div class="text-xs text-gray-400 mt-1">
      Since
      <Time format="MMM DD, YYYY" timestamp={createdUTC} />
    </div>
  </div>
  <div class="text-sm text-black text-end">
    {personUid.slice(0,6)}...{personUid.slice(-6)}
  </div>
</div>