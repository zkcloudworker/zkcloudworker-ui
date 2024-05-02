<div class="">
  <Alert dismissable class="mb-8 -mx-4 rounded-lg px-4 pt-4 pb-3 text-blue-900 leading-relaxed text-sm bg-gray-200">
    Please provide below the required evidence to sustain your claim. This 
    evidence will be deleted as soon as the claim has been approved, so no 
    personal or private data will be stored and kept.
  </Alert>

  {#each (eform || []) as field, index}
      <EvidenceField 
        field={field} 
        index={index} 
        bind:data={data} 
      />
  {/each}
</div>        

<script>
  import EvidenceField from "./EvidenceField.svelte";
  import { Alert } from "flowbite-svelte";
	
  export let 
    eform,
    data; // this is the data for this MasterPlan and empty Claim
</script>