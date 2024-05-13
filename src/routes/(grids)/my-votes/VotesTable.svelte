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
		ButtonGroup,
		RadioButton,
		Dropdown
	} from 'flowbite-svelte';
	import { type Task } from '$lib/types/task';
	import { ASSIGNED } from '$lib/types/states';
	import ActionFooter from './ActionFooter.svelte';
	export let data: Task[] = [];

	const changeVote = (e: any, t: Task, index: number) => {
		console.log("data", data)
		if (t.result == e.target.value) {
			// remove vote
			data[index] = { ...t, result: "7" };
		}
		console.log('index', index);
	};
</script>

<div class="relative">
	{#if data && Array.isArray(data)}
		<Table>
			<TableHead class="text-md bg-white normal-case text-gray-500">
				<TableHeadCell>Status</TableHeadCell>
				<TableHeadCell>Credential Name</TableHeadCell>
				<TableHeadCell>Applicant</TableHeadCell>
				<!-- <TableHeadCell>Details</TableHeadCell> -->
				<TableHeadCell>Vote</TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each data || [] as t, i}
					<TableBodyRow>
						<TableBodyCell>
							<StateBadge data={t.state} />
						</TableBodyCell>
						<TableBodyCell>{t.community}</TableBodyCell>
						<TableBodyCell>{t.claimer}</TableBodyCell>
						<!-- <TableBodyCell>Todo</TableBodyCell> -->
						<TableBodyCell>
							{#if t.state === ASSIGNED}
								<ButtonGroup>
									<RadioButton
										on:click={(e) => changeVote(e, t, i)}
										class="active:bg-green-100 checked:text-green-800"
										value={"1"}
										bind:group={t.result}>Yes</RadioButton
									>
									<RadioButton
										on:click={(e) => changeVote(e, t, i)}
										class="checked:bg-red-100 checked:text-red-800"
										value={"-1"}
										bind:group={t.result}>No</RadioButton
									>
									<RadioButton
										on:click={(e) => changeVote(e, t, i)}
										class="checked:bg-yellow-100 checked:text-yellow-800"
										value={"0"}
										bind:group={t.result}>Abstain</RadioButton
									>
								</ButtonGroup>
							{/if}
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{/if}

	<ActionFooter tasks={data} />
</div>
