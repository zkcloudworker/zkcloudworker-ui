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
	<TableBody class="table-fixed">
		{#each data as t}
			<TableBodyRow>
				<TableBodyCell>
					<div class="flex items-center justify-between">
						<div class="flex space-x-4">
							<Avatar src={t.image} class="round h-10 w-10 drop-shadow-lg" />
							<div class="space-y-4">
								<div class="flex items-center space-x-2">
									<div class="grid grid-cols-1 gap-1">
										<p class="text-weight-400 truncate text-xs text-gray-500">{t.community}</p>
										<p class="text-weight-600 text-md truncate">{t.type}</p>
									</div>
								</div>
								<div class="flex items-center justify-between">
									<div class="flex space-x-4">
										<div class="grid grid-cols-1 gap-1">
											<p class="text-md text-weight-600 text-gray-500">Created</p>
											<p class="text-xs"><Time timestamp={t.createdUTC} /></p>
										</div>
										<div class="grid grid-cols-1 gap-1 text-center">
											<p class="text-md text-weight-600 text-gray-500">Claimed</p>
											<p class="text-xs">
												{#if t.issuedUTC}<Time timestamp={t.issuedUTC} />
												{:else}-{/if}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="space-x-4">
							<StateBadge class="p-x-16 p-y-1 text-sm" data={t.state} />
							<Button color="none" size="sm"><DotsVerticalOutline /></Button>
						</div>
					</div>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
