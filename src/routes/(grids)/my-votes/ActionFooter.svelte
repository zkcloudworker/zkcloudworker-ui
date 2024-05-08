<script lang="ts">
	import { ASSIGNED } from '$lib/types/states';
	import type { Task } from '$lib/types/task';
	import { Button } from 'flowbite-svelte';
	import SubmitVotesDialog from './SubmitVotesDialog.svelte';

	export let tasks: Task[] = [], confirm: boolean = false;
    
    let openDialog = false;
	$: votes = tasks.filter((t: Task) => t.result != "7" && t.state == ASSIGNED);

	const submitAllVotes = () => {
		// filter all the Not voted tasks, we only send the ones with results
		const completedTasks = tasks.filter((t: Task) => t.state !== ASSIGNED);
		// open dialog
        openDialog = true;
	};

	async function cancelSubmit() {
		alert('Canceled');
	}

	async function submitTasks() {
		alert('Submit');
	}
</script>
{#if openDialog}
<SubmitVotesDialog
	{votes}
	bind:confirm={confirm}
	on:cancel={() => cancelSubmit()}
	on:submit={() => submitTasks()}
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


