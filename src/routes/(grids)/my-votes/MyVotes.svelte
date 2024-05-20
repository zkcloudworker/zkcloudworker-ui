<script lang="ts">
	import { useGetMyTasks } from '$lib/hooks/tasks';
	import { DropdownItem, P, Dropdown } from 'flowbite-svelte';
	import { H1, H1Subtitle, ErrorOnFetch } from '$lib/components';
	import VotesTable from './VotesTable.svelte';
	import VotesTableMobile from './VotesTableMobile.svelte';
	import NoData from '$lib/components/common/NoData.svelte';

	const tasks = useGetMyTasks();
</script>

<div class="p-4">
	<H1>My Votes</H1>

	{#if $tasks.isLoading}
		<span>Loading...</span>
	{:else if $tasks.isError}
		<ErrorOnFetch description="All my votes" error={$tasks.error} />
	{:else if !$tasks.data || $tasks.data.length === 0}
		<NoData text="You have no pending votes to cast" />
	{:else}
		<H1Subtitle class="mb-8">
      You have {$tasks.data.length} pending votes
    </H1Subtitle>
		<div class="hidden lg:block">
			<VotesTable data={$tasks.data && Array.isArray($tasks.data) ? $tasks.data : []} />
		</div>
		<div class="block lg:hidden">
			<VotesTableMobile data={$tasks.data && Array.isArray($tasks.data) ? $tasks.data : []} />
		</div>
	{/if}
</div>
