<script lang="ts">
	import type { Plan } from '$lib/types';
  import type { Claim } from '$lib/types/claim';
  import { fixEvidenceData } from '../../api/fix-evidence-data';
	import StateBadge from '../common/StateBadge.svelte';
  import EvidenceForm from './EvidenceForm.svelte';
	import { Button } from 'flowbite-svelte';

  export let 
    plan: any,
    claim: any,
    isNew: boolean;
</script>

<div class="relative">
  <div class="mb-24 p-8 w-full">
    <!-- <pre class="text-xs">
      {JSON.stringify(plan?.evidence, null, 2)}
    </pre> -->
    <form>
      <EvidenceForm 
        eform={plan?.evidence} 
        data={claim?.evidenceData}
      />
    </form>
  </div>

  <div class="fixed bottom-0 py-4 left-0 right-0 lg:left-64 bg-white border-t-2 bg-opacity-70">
      <div class="px-8 flex items-center justify-between border-3 --bg-red-300">
        <div class="ps-8">
          <a href="#" class="text-blue-500">Preview</a>
        </div>
        <div>
          <span class="me-8 text-sm">
            Status <StateBadge data={claim?.state} />
          </span>
          <Button size="lg" color="light" class="me-2">
            Save Draft
          </Button>
          <Button size="lg" primay class="me-8">
            Submit
          </Button>
        </div>
      </div>
  </div>
</div>
