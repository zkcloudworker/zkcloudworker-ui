<script lang="ts">
	import type { Plan } from '$lib/types';
  import type { Claim } from '$lib/types/claim';
  import { fixEvidenceData } from './fix-evidence-data';
  import EvidenceForm from './EvidenceForm.svelte';

  export let 
    plan: any,
    claim: any,
    isNew: boolean;

    let data = fixEvidenceData(plan.evidence, claim?.evidence || []);
</script>

<div class="p-2 lg:p-8 max-w-screen-md mx-auto">
  <!-- <pre>
    {JSON.stringify(data, null, 2)}
  </pre> -->
  <EvidenceForm 
    eform={plan?.evidence} 
    data={data}
  />
</div>
