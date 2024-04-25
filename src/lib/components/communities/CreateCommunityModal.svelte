<script lang="ts">
	import { useCreateCommunity } from '$lib/hooks/communities';
	import { onMount } from 'svelte';
	import { Label, Input, Button, Modal, Checkbox, Helper } from 'flowbite-svelte';
	import { getCurrentUser } from '$lib/store';
	import type { User } from '$lib/types';
	import SubmitButton from '../common/SubmitButton.svelte';
	import CommunityCard from './CommunityCard.svelte';
	export let open = false;
	export let created = false;
	let name = '';
	let description = '';
	let acceptTac = false;
	let isAdmin = false;
	const createCommunityMutation = useCreateCommunity();
	$: working = $createCommunityMutation.isPending ? 'Creating...' : '';
	let profile: User | null = getCurrentUser();
	const onSubmit = async (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		await $createCommunityMutation.mutateAsync({ name, description, adminUid: profile?.uid });
		created = true;
	};
	onMount(() => {
		profile = getCurrentUser();
	});
</script>

<Modal bind:open size="md" autoclose class="w-full max-w-screen-lg">
	{#if !created}
		<div class="flex flex-col space-y-1">
			<h3 class="text-xl font-medium text-gray-900 dark:text-white">Create new community</h3>
			<h4 class="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
				We’ll check the community registration before approving it.
			</h4>
		</div>
		<form class="mx-6 flex flex-col space-y-4">
			<Label class="space-y-2">
				<div class="flex justify-between">
					<span>Name</span><span class="text-orange-400">Required</span>
				</div>
				<Input type="text" name="name" required bind:value={name} />
				<Helper class="mt-2 text-sm text-gray-500">Community name must be unique</Helper>
			</Label>
			<Label class="space-y-2">
				<div class="flex justify-between">
					<span>Description</span><span class="text-orange-400">Required</span>
				</div>
				<Input type="text" name="description" required bind:value={description} />
				<Helper class="mt-2 text-sm text-gray-500">This description will be public</Helper>
			</Label>

			<Checkbox bind:checked={isAdmin}>I am one of the administrator of this community</Checkbox>
			<Label class="items-baseline space-y-2">
				<Checkbox bind:checked={acceptTac}
					>Accept&nbsp;<a href="/"> Terms of Service</a>&nbsp;and&nbsp;<a href="/">Privacy Policy</a
					></Checkbox
				>
			</Label>
		</form>

		<SubmitButton
			on:click={onSubmit}
			{working}
			disabled={!acceptTac ||
				name.trim() == '' ||
				description.trim() == '' ||
				$createCommunityMutation.isPending}
			class="order-1 mb-2 mt-6 w-full md:order-2 md:mb-0 md:ms-2"
			size="lg"
		>
			Create
		</SubmitButton>
	{:else}
		<div class="flex flex-col space-y-5">
			<div class="flex flex-col space-y-1 text-center">
				<h3 class="text-xl font-medium text-gray-900 dark:text-white">
					Your submission is pending to revision!
				</h3>
				<h4 class="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
					We’ll send you an email when it’s ready
				</h4>
			</div>
			<CommunityCard title={name} {description} state={'INITIAL'} joined={true} />

			<Button
				on:click={() => {
					open = false;
				}}
				color="blue"
				size="lg"
				class="w-full text-sm font-bold"
			>
				Close
			</Button>
		</div>
	{/if}
</Modal>
