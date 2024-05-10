<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { get } from 'svelte/store';
	import { Modal, Alert, Button, Spinner } from 'flowbite-svelte';
	import { getCurrentSession, getCurrentUser } from '$lib/store';
	import { Mina } from 'o1js';
	//import { connectWallet } from "$lib/contracts/wallet";
	//import { loadPlanVotingContract } from "$lib/contracts/batch-voting/loaders";
	import { useSubmitBatchTasks } from '$lib/hooks/tasks';
	import type { Task } from '$lib/types/task';
	import { auroWallet$ } from '$lib/store/auroWallet';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();  


	export let open: boolean, // this opens/closes teh Modal Dialog
		votes: Task[] = [], // this is the data for the Votes to submit
		confirm: boolean = false; // confirm submiting

	let submitBatchTasks = useSubmitBatchTasks();

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


	function cancelVoting() {
		toggle(); // close dialog
		status = READY; // get ready for next ...
	}

	function doneVoting() {
		toggle(); // close dialog
		status = READY; // get ready for next ...
		setTimeout(() => window.location.reload());
	}
</script>
<Modal 
title="Confirm Votes Submission"
autoclose size="md" class="p-0 mx-1 w-full max-w-screen-md"
bind:open={open}>
<div>
	<div>
		<div>
			<Alert class="text-md -mx-2 bg-green-200 px-8 text-black">
				Are you ready to submit your votes?
			</Alert>
		</div>
		<div class="p-2 leading-loose">
			Are you ready to submit it?
			<ul class="list-disc ps-8">
				<li>Please connect your wallet</li>
				<li>We will ask you to sign the submission. This has no cost.</li>
				<li>After this your votes will be on the way</li>
				<li>Please confirm because you will not be able to resubmit.</li>
			</ul>
		</div>
	</div>

	<div class="--border-t-2 mt-4 px-4 pt-4 text-end">
		<Button
			color="light"
			on:click={() => {
				confirm = false;
				open = false;
                dispatch("close");
			}}
		>
			No, not ready
		</Button>
		&nbsp;
		<Button
			color="primary"
			on:click={() => {
				confirm = true;
				open = false;
                dispatch("submit");
			}}
		>
			Yes, submit it !
		</Button>
	</div>
</div>
</Modal>