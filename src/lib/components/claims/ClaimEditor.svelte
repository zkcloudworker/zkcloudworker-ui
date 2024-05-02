<script lang="ts">
	import type { Plan } from '$lib/types';
  import type { Claim } from '$lib/types/claim';
  import { fixEvidenceData } from './fix-evidence-data';
  import EvidenceForm from './EvidenceForm.svelte';
	import { Button } from 'flowbite-svelte';

  export let 
    plan: any,
    claim: any,
    isNew: boolean;

    let data = fixEvidenceData(plan.evidence, claim?.evidence || []);
</script>

<div class="relative max-w-screen-lg">

  <div class="p-2 lg:p-8 max-w-screen-md mx-auto">
    <!-- <pre>
      {JSON.stringify(data, null, 2)}
    </pre> -->
    <EvidenceForm 
    eform={plan?.evidence} 
    data={data}
    />
  </div>

  <div class="fixed bottom-0 py-4 left-0 lg:left-64 right-0 w-full bg-white border-t bg-white">
    <div class="max-w-screen-lg --bg-green-300">
      <div class="lg:p-0 max-w-screen-md mx-auto flex items-center justify-between border-3 --bg-red-300">
        <div class="ps-8">
          <a href="#" class="text-blue-500">Preview</a>
        </div>
        <div>
          <Button size="lg" class="bg-gray-500 me-2">
            Save Draft
          </Button>
          <Button size="lg" primay class="me-8">
            Submit
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>
