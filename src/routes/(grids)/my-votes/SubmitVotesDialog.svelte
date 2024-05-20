<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { get } from 'svelte/store';
	import { Modal, Alert, Button, Spinner, StepIndicator } from 'flowbite-svelte';
	import { getCurrentBlockchain, getCurrentSession, getCurrentUser } from '$lib/store';
	import { Mina } from 'o1js';
	//import { connectWallet } from "$lib/contracts/wallet";
	//import { loadPlanVotingContract } from "$lib/contracts/batch-voting/loaders";
	import { useSubmitBatchTasks } from '$lib/hooks/tasks';
	import type { Task } from '$lib/types/task';
	import { auroWallet$ } from '$lib/store/auroWallet';
	import { createEventDispatcher } from 'svelte';
	import { VoteStep, Step } from './vote-flow';
	import ConnectWalletDialog from '$lib/components/common/ConnectWalletDialog.svelte';
	import ConfirmSubmitDialog from './ConfirmSubmitDialog.svelte';
	import VotesSentDialog from './VotesSentDialog.svelte';
	import ConfirmVotesDialog from './ConfirmVotesDialog.svelte';
	const dispatch = createEventDispatcher();

	export let open: boolean = false, // this opens/closes teh Modal Dialog
		votes: Task[] = [], // this is the data for the Votes to submit
		confirm: boolean = false, // confirm submiting
		step: number = 1,
		steps = ['1', '2', '3'];

	let submitBatchTasks = useSubmitBatchTasks();

	async function cancelSubmit() {
		open = false;
		step = 1;
	}

	async function confirmSubmit() {
		step = VoteStep.CONNECT_WALLET;
		open = true;
	}

	async function confirmConnect() {
		step = VoteStep.CONFIRM_VOTE;
		open = true;
	}

	let user;
	let statusMessage = '',
		status = 0;
	let pendingTxn;

	const READY = 0,
		SENDING = 2,
		FAILED = 5,
		SENT = 3;

	// let open = false;
	const toggle = () => (open = !open);

	let openNoWalletDlg = false;
	const toggleNoWalletDlg = () => (openNoWalletDlg = !openNoWalletDlg);

	onMount(async () => {
		user = await getCurrentUser();
		// voterAccountId = user.profile.accountId;
		// console.log("MOUNTED SubmitVotesDlg")
		// await ready for payment
		// canPayNow = await isReadyForPayment();
	});

	function doneVoting() {
		toggle(); // close dialog
		status = READY; // get ready for next ...
		setTimeout(() => window.location.reload());
	}
	async function doneConfirmVotes(detail: any) {
		step = VoteStep.VOTES_SENT;
		open = true;
	}
</script>

<Modal size="md" class="relative mx-0 h-[32rem] w-full max-w-screen-md p-0" bind:open>
	<div class="px-4 text-base">
		<div class="text-lg font-bold text-black">
			{Step[step].title}
		</div>
		<div class="text-sm text-gray-500">
			{Step[step].description}
		</div>
		<div class="mt-6">
			<StepIndicator {steps} size="h-1.5" hideLabel={true} currentStep={step} class="py-2" />
		</div>
	</div>

	<div class="px-4">
		{#if step === VoteStep.CONFIRM_SUBMIT}
			<ConfirmSubmitDialog
				{votes}
				on:cancel={() => cancelSubmit()}
				on:submit={() => confirmSubmit()}
			/>
		{/if}

		{#if step === VoteStep.CONNECT_WALLET}
			<ConnectWalletDialog on:cancel={() => cancelSubmit()} on:continue={() => confirmConnect()} />
		{/if}

		{#if step === VoteStep.CONFIRM_VOTE}
			<ConfirmVotesDialog
				{votes}
				on:cancel={() => cancelSubmit()}
				on:done={(ev) => doneConfirmVotes(ev.detail)}
			/>
		{/if}

		{#if step === VoteStep.VOTES_SENT}
			<VotesSentDialog chain={getCurrentBlockchain()} on:close={() => cancelSubmit()} />
		{/if}
	</div>
</Modal>
