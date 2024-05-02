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

  export let data;

  let showModal = false;
  let claim: Claim;
</script>

{#if data && Array.isArray(data)}
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
  		{#each (data || []) as t}
  			<TableBodyRow>
  				<TableBodyCell>
  					<div class="flex space-x-3 items-center">
  						<img class="h-12 w-12 rounded-full" src={t.image} alt="Badge" />
  						<div class="grid grid-cols-1 gap-0">
  							<p class="truncate text-x text-gray-400">{t.community}</p>
  							<p class="text-base truncate m-0 p-0">{t.type}</p>
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
  					<Button color="alternative" size="sm" 
              on:click={() => { showModal = true; claim = t; }}>
              Edit
            </Button>
  				</TableBodyCell>
  			</TableBodyRow>
  		{/each}
  	</TableBody>
  </Table>
{/if}
