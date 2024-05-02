<div class="">
  <p class="pt-2 pb-8 text-gray-600 leading-relaxed text-lg text-gray-700">
    Please provide below the required evidence to sustain your claim. This 
    evidence will be deleted as soon as the claim has been approved, so no 
    personal or private data will be stored and kept.
  </p>

  {#each eform as field, index}
      <EvidenceField 
        field={field} 
        index={index} 
        bind:data={data} 
      />
  {/each}
</div>        

<script>
  import EvidenceField from "./EvidenceField.svelte";
  import { Input } from "flowbite-svelte";
	
  export let 
    eform,
    data; // this is the data for this MasterPlan and empty Claim
</script>