<script lang="ts">
	import type { Plan } from '$lib/types';
  import type { Claim } from '$lib/types/claim';
	import { Button } from 'flowbite-svelte';
	import StateBadge from '../common/StateBadge.svelte';
  import EvidenceForm from './EvidenceForm.svelte';
  import { PaymentStep } from './payment-flow';
  import PaymentDialog from './PaymentDialog.svelte';

  export let 
    plan: any,
    claim: any,
    isNew: boolean;

  let toggleDialog = false, step = 0;

  async function confirmSubmission() {
    toggleDialog = true;
  }
</script>

{#if toggleDialog}
  <PaymentDialog 
    bind:open={toggleDialog} 
    step={PaymentStep.CONFIRM_SUBMIT} 
    claim={claim}
    plan={plan}
  />
{/if}

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
          <Button size="lg" primay class="me-8" 
            on:click={() => confirmSubmission()}>
            Submit
          </Button>
        </div>
      </div>
  </div>
</div>
