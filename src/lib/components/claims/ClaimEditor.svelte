<script lang="ts">
	import type { Plan } from '$lib/types';
  import type { Claim } from '$lib/types/claim';
  import { fixEvidenceData } from '../../api/fix-evidence-data';
  import EvidenceForm from './EvidenceForm.svelte';
	import { Button } from 'flowbite-svelte';

  export let 
    plan: any,
    claim: any,
    isNew: boolean;
</script>

<div class="relative max-w-screen-lg">
  <div class="p-2 lg:p-8 max-w-screen-md mx-auto">
    <!-- <pre class="text-xs">
      {JSON.stringify(plan?.evidence, null, 2)}
    </pre> -->
    <form>
      <EvidenceForm 
        eform={plan?.evidence} 
        data={claim.evidenceData}
      />
    </form>
  </div>

  <div class="fixed bottom-0 py-4 left-0 lg:left-64 right-0 w-full bg-white border-t bg-white">
    <div class="max-w-screen-lg --bg-green-300">
      <div class="px-8 flex items-center justify-between border-3 --bg-red-300">
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
