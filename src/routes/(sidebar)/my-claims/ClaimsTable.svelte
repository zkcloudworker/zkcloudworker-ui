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
		<TableHeadCell>
			<span class="sr-only">Image</span>
		</TableHeadCell>
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
					<img class="h-10 w-10 rounded-full" src={t.image} alt="Badge" />
				</TableBodyCell>
				<TableBodyCell
					><div class="grid grid-cols-1 gap-4">
						<p class="text-gray-500">{t.community}</p>
						<p class="text-md">{t.type}</p>
					</div></TableBodyCell
				>
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
