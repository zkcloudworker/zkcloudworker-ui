<script>
	import StateBadge from '$lib/components/StateBadge.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Avatar
	} from 'flowbite-svelte';
	import Time from 'svelte-time';
	export let data;
</script>

<Table>
	<TableHead class="text-md bg-white normal-case text-gray-500">
		<TableHeadCell>Credential</TableHeadCell>
		<TableHeadCell>Created</TableHeadCell>
		<TableHeadCell>Claimed</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Edit</span>
		</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each data as t}
			<TableBodyRow>
				<TableBodyCell>
					<div class="flex space-x-3 items-center">
						<img class="h-10 w-10 rounded-full" src={t.image} alt="Badge" />
						<div class="grid grid-cols-1 gap-3">
							<p class="truncate text-gray-500">{t.community}</p>
							<p class="text-md truncate">{t.type}</p>
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell><Time timestamp={t.createdUTC} /></TableBodyCell>
				<TableBodyCell
					>{#if t.issuedUTC}
						(<Time timestamp={t.issuedUTC} />)
					{:else}
						<p>-</p>
					{/if}</TableBodyCell
				>
				<TableBodyCell><StateBadge data={t.state} /></TableBodyCell>
				<TableBodyCell>
					<Button color="alternative" size="sm">Edit</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
