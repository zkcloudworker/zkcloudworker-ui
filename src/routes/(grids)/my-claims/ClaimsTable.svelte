<script lang="ts">
	import StateBadge from '$lib/components/common/StateBadge.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Modal,
		Avatar
	} from 'flowbite-svelte';
	import ClaimModal from './ClaimModal.svelte';
	import type { Claim } from '$lib/types/claim';
	import Time from 'svelte-time';
	import { DRAFT, UNPAID } from '$lib/types/states';
	import { goto } from '$app/navigation';

	export let data;

	let showModal = false;
	let claim: Claim;
	function isEditable(state: number) {
		return state === UNPAID || state === DRAFT; 
	}
</script>

{#if data && Array.isArray(data)}
	<Table>
		<TableHead class="text-md bg-white normal-case text-gray-500">
			<TableHeadCell>Credential</TableHeadCell>
			<TableHeadCell>Created</TableHeadCell>
			<TableHeadCell>Issued</TableHeadCell>
			<TableHeadCell>Status</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each data || [] as t}
				<TableBodyRow class="cursor-pointer" on:click={() => goto(`/claim/${t.uid}/?mp=${t.planUid}&mode=${isEditable(t.state) ? "edit" : "view"}`)}>
					<TableBodyCell>
						<div class="flex items-center space-x-3">
							<img class="h-12 w-12 rounded-full" src={t.image} alt="Badge" />
							<div class="grid grid-cols-1 gap-0">
								<p class="text-x truncate text-gray-400">{t.community}</p>
								<p class="m-0 truncate p-0 text-base">{t.type}</p>
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
						{#if isEditable(t.state)}
						<Button
							color="alternative"
							size="sm"
							href="/claim/{t.uid}/?mp={t.planUid}&mode=edit"
						>
							Edit
						</Button>
						{/if}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
{/if}
