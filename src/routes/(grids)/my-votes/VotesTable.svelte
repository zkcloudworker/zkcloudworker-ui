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
		Avatar,
		ButtonGroup
	} from 'flowbite-svelte';
	import { type Task } from '$lib/types/task';
	import { ASSIGNED } from '$lib/types/states';
	export let data;
	let vote: Task;
</script>

{#if data && Array.isArray(data)}
	<Table>
		<TableHead class="text-md bg-white normal-case text-gray-500">
			<TableHeadCell>Status</TableHeadCell>
			<TableHeadCell>Credential Name</TableHeadCell>
			<TableHeadCell>Applicant</TableHeadCell>
			<TableHeadCell>Details</TableHeadCell>
			<TableHeadCell>Vote</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each data || [] as t}
				<TableBodyRow>
					<TableBodyCell>
						<StateBadge data={t.state} />
					</TableBodyCell>
					<TableBodyCell>{t.community}</TableBodyCell>
					<TableBodyCell>{t.claimer}</TableBodyCell>
					<TableBodyCell>Todo</TableBodyCell>
					<TableBodyCell class="overflow-visible">
						{#if t.state === ASSIGNED}
							<ButtonGroup>
								<Button class="bg-green-100 text-green-800">Yes</Button>
								<Button class="bg-red-100 text-red-800">No</Button>
								<Button class="bg-yellow-100 text-yellow-800">Abstain</Button>
							</ButtonGroup>
						{/if}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
{/if}
