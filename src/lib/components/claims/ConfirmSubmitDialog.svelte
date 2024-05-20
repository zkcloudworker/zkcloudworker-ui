<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Alert, Button, Badge, StepIndicator } from 'flowbite-svelte';
	import Time from 'svelte-time/Time.svelte';
	import { type Claim } from '$lib/types/claim';
	import { type Plan, PayedBy } from '$lib/types';
	import PaymentDialog from './PaymentDialog.svelte';
	import { saveDratClaim } from '$lib/api/claims-api';
	import { useSaveDratClaim, useUpdateClaim } from '$lib/hooks/claims';
	import { CLAIMED } from '$lib/types/states';

	const dispatch = createEventDispatcher();

	export let plan: Plan, claim: Claim, isNew: boolean;

	$: payedByCommunity = plan.payedBy === PayedBy.community;
	const saveClaimMutation = useSaveDratClaim();
	const updateClaimMutation = useUpdateClaim();

	async function saveClaim() {
		if (isNew) {
			const result = await $saveClaimMutation.mutateAsync({...claim, state: CLAIMED});
		} else {
			const result = await $updateClaimMutation.mutateAsync({...claim, state: CLAIMED});
		}
	}
</script>

<div>
	<div class="text-base">
		<div class="mt-10 text-gray-800">
			{plan.description}
		</div>
		<div class="mt-8">
			Final submission date: <b>
				<Time format="MMM DD, YYYY" timestamp={plan.endsUTC} />
				(23:59 UTC)
			</b>
		</div>
		<div class="mt-8 text-base">
			Fee <Badge
				rounded
				large
				class={(payedByCommunity ? 'bg-gray-400 line-through' : 'bg-gray-500') +
					' ms-2 px-4 text-white'}
			>
				{plan.fee} MINA
			</Badge>
			{#if payedByCommunity}
				<span class="ms-2">will be paid by the community.</span>
			{/if}
			{#if !payedByCommunity}
				<span class="ms-2"> Prepare your wallet.</span>
			{/if}
		</div>
	</div>

	<div class="--border-t-2 absolute bottom-0 left-0 right-0 px-8 py-6 text-right text-end">
		<Button
			color="light"
			class="py-3"
			on:click={() => {
				dispatch('cancel');
			}}
		>
			I'll do it later
		</Button>
		&nbsp;
		{#if payedByCommunity}
			<Button
				color="blue"
				class="py-3"
				on:click={() => {
					saveClaim();
					dispatch('paycommunity');
				}}
			>
				{#if $saveClaimMutation.isPending || $updateClaimMutation.isPending}
					Saving...
				{:else}
					Confirm
				{/if}
			</Button>
		{:else}
			<Button
				color="blue"
				class="py-3"
				on:click={() => {
					dispatch('submit');
				}}
			>
				Go ahead
			</Button>
		{/if}
	</div>
</div>
