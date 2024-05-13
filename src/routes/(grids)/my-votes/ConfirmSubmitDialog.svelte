<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Alert, Button, Badge, StepIndicator } from 'flowbite-svelte';
	import Time from 'svelte-time/Time.svelte';
	import { type Task } from '$lib/types/task';
	
	const dispatch = createEventDispatcher();

	export let votes: Task[];
</script>

<div>
	<div class="text-base">
		<div class="mt-10 text-gray-800">Confirm your votes</div>
		<div class="mt-10 text-gray-800">Prepare your wallet to sign the votes confirmation</div>
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
		<Button
			color="blue"
			class="py-3"
			on:click={() => {
				dispatch('submit');
			}}
		>
			Go ahead
		</Button>
	</div>
</div>
