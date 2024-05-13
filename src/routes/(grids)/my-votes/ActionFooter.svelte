<script lang="ts">
	import { ASSIGNED } from '$lib/types/states';
	import type { Task } from '$lib/types/task';
	import { Button } from 'flowbite-svelte';
	import SubmitVotesDialog from './SubmitVotesDialog.svelte';
    import { createEventDispatcher, tick} from 'svelte';
	import { useSubmitBatchTasks } from '$lib/hooks/tasks';
	import { get } from 'svelte/store';
	import { auroWallet$ } from '$lib/store/auroWallet';
	import { VoteStep } from './vote-flow';

	export let tasks: Task[] = [];
    const dispatch = createEventDispatcher();  

    let openDialog = false;
	$: votes = tasks.filter((t: Task) => t.result != "7" && t.state == ASSIGNED);
	let submitBatchTasks = useSubmitBatchTasks();
    
    let statusMessage = '',
		status = 0;

	const READY = 0,
		SENDING = 2,
		FAILED = 5,
		SENT = 3;

	const submitAllVotes = () => {
		// open dialog
        console.log("opening dialog")
        openDialog = true;
	};
    async function sendThemNow() {
        console.log("SENDING VOTES")
		statusMessage = 'Starting signing ...';
		await tick();
		status = READY;

		let wallet = get(auroWallet$);
        console.log("WALLET", wallet);
        // request account
        const accounts: any[] = await wallet.api.requestAccounts() || [];
        if (!accounts.length) {
            status = FAILED;
            // change state/dispatch to show error alert
        }
        const account = accounts[0];
        console.log("account", account);

		let signedData = await wallet.api.signMessage({
			message: JSON.stringify(votes)
		});
		console.log(
			'signedData publicKey',
			signedData.publicKey,
            'signedData signature',
			signedData.signature.field,
            'signedData signature scalar',
			signedData.signature.scalar
		);

		// we can now submit the Votes and continue the voting process
		status = SENDING; // sending ...
		await tick();

		let result = await $submitBatchTasks.mutateAsync({
			senderAccountId: signedData.publicKey,
			signedPack: signedData
		});

		if (result.error) {
			status = FAILED;
			await tick();
			return;
		}

		status = SENT; // sent ;
		await tick();
	}
</script>
{#if openDialog}
<SubmitVotesDialog
    bind:open={openDialog}
	{votes}
	step={VoteStep.CONFIRM_SUBMIT}
/>
{/if}
<div class="fixed bottom-0 left-0 right-0 border-t-2 bg-white py-4 lg:left-64">
	<div class="border-3 --bg-red-300 flex content-end justify-end px-8">
		<div>
			<span class="me-8 text-sm">
				Votes on {votes.length} of {tasks.length}
			</span>

			<Button size="lg" primay class="me-8" on:click={() => submitAllVotes()}>Submit Vote</Button>
		</div>
	</div>
</div>


