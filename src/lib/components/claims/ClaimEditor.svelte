<script lang="ts">
	import type { Plan } from '$lib/types';
	import type { Claim } from '$lib/types/claim';
	import { Button } from 'flowbite-svelte';
	import StateBadge from '../common/StateBadge.svelte';
	import EvidenceForm from './EvidenceForm.svelte';
	import { PaymentStep } from './payment-flow';
	import PaymentDialog from './PaymentDialog.svelte';
	import EvidenceFormPreview from './EvidenceFormPreview.svelte';
	import { useSaveDratClaim, useUpdateClaim } from '$lib/hooks/claims';
	import { goto } from '$app/navigation';

	export let plan: any, claim: any, isNew: boolean;
	const saveClaim = useSaveDratClaim();
	const updateClaim = useUpdateClaim();

	let toggleDialog = false,
		step = 0;
	let previewOn = false;
	async function confirmSubmission() {
		toggleDialog = true;
	}

	async function saveDraft() {
		if (isNew) {
			const result = await $saveClaim.mutateAsync(claim);
		} else {
			const result = await $updateClaim.mutateAsync(claim);
		}
		goto('/my-claims');
	}
</script>

{#if toggleDialog}
	<PaymentDialog bind:open={toggleDialog} step={PaymentStep.CONFIRM_SUBMIT} {claim} {plan} isNew />
{/if}

<div class="relative">
	<div class="mb-24 w-full p-8">
		<!-- <pre class="text-xs">
      {JSON.stringify(plan?.evidence, null, 2)}
    </pre> -->
		{#if !previewOn}
			<form>
				<EvidenceForm eform={plan?.evidence} data={claim?.evidenceData} />
			</form>
		{:else}
			<EvidenceFormPreview evidenceData={claim?.evidenceData} />
		{/if}
	</div>

	<div class="fixed bottom-0 left-0 right-0 border-t-2 bg-white bg-opacity-70 py-4 lg:left-64">
		<div class="border-3 --bg-red-300 flex items-center justify-between px-8">
			<div class="ps-8">
				{#if !previewOn}
					<Button alternate color="light" on:click={() => (previewOn = true)}>Preview</Button>
				{:else}
					<Button alternate color="light" on:click={() => (previewOn = false)}>Edit</Button>
				{/if}
			</div>
			<div>
				<span class="me-8 text-sm">
					Status <StateBadge data={claim?.state} />
				</span>

				<Button size="lg" color="light" class="me-2" on:click={() => saveDraft()}>
					{#if $saveClaim.isPending || $updateClaim.isPending}
						Saving...
					{:else}
						Save Draft
					{/if}</Button
				>
				<Button size="lg" primay class="me-8" on:click={() => confirmSubmission()}>Submit</Button>
			</div>
		</div>
	</div>
</div>
