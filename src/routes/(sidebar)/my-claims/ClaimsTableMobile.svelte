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
	import { DotsVerticalOutline } from 'flowbite-svelte-icons';
</script>

<Table>
	<TableHead class="bg-white text-sm normal-case text-gray-400">
		<TableHeadCell>Credential</TableHeadCell>
		<TableHeadCell>Created</TableHeadCell>
		<TableHeadCell>Claimed</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Edit</span>
		</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each data as t}
			<TableBodyRow>
				<TableBodyCell>
					<div class="flex items-center space-x-2">
						<Avatar src={t.image} class="round h-10 w-10 drop-shadow-lg" />
						<a href={`/claim/${data.uid}`}>
							<div class="grid grid-cols-1 gap-1">
								<p class="text-weight-400 truncate text-xs text-gray-500">{t.community}</p>
								<p class="text-weight-600 text-md truncate">{t.type}</p>
							</div>
						</a>
					</div>
				</TableBodyCell>
				<TableBodyCell><Time timestamp={t.createdUTC} /></TableBodyCell>
				<TableBodyCell
					>{#if t.issuedUTC}
						(<Time timestamp={t.issuedUTC} />)
					{:else}
						<p>-</p>
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					<div class="flex items-center space-x-3">
						<StateBadge data={t.state} />
						<Button color="alternative" size="sm"><DotsVerticalOutline /></Button>
					</div>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
