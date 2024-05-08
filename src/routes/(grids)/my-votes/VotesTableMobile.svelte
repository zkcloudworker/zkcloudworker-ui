<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Avatar,
		RadioButton,
		ButtonGroup
	} from 'flowbite-svelte';
	import { Icon, StateBadge } from '$lib/components';
	import { type Task } from '$lib/types/task';
	import { ASSIGNED } from '$lib/types/states';
	import ActionFooter from './ActionFooter.svelte';
	export let data: Task[] = [];
	const changeVote = (e: any, t: Task, index: number) => {
		console.log('data', data);
		if (t.result == e.target.value) {
			// remove vote
			data[index] = { ...t, result: '7' };
		}
		console.log('index', index);
	};
</script>

{#if data && Array.isArray(data)}
	<Table class="p-0">
		<TableBody class="table-fixed">
			{#each data || [] as t, i}
				<TableBodyRow>
					<TableBodyCell class="py-4 px-0" >
						<div class="flex items-center space-x-4 w-full mx-auto" >
							<div>
								<StateBadge class="text-xs" data={t.state} />
							</div>
							<div class="flex flex-col space-y-4">
								<div class="space-y-1">
									<div>{t.community}</div>
									<div>{t.claimer}</div>
									<div>Todo</div>
								</div>
								<div>
									{#if t.state === ASSIGNED}
										<ButtonGroup size="xs">
											<RadioButton
												size="xs"
												on:click={(e) => changeVote(e, t, i)}
												class="checked:bg-green-100 checked:text-green-800"
												value={'1'}
												bind:group={t.result}>Yes</RadioButton
											>
											<RadioButton
												size="xs"
												on:click={(e) => changeVote(e, t, i)}
												class="checked:bg-red-100 checked:text-red-800"
												value={'-1'}
												bind:group={t.result}>No</RadioButton
											>
											<RadioButton
												size="xs"
												on:click={(e) => changeVote(e, t, i)}
												class="checked:bg-yellow-100 checked:text-yellow-800"
												value={'0'}
												bind:group={t.result}>Abstain</RadioButton
											>
										</ButtonGroup>
									{/if}
								</div>
							</div>
						</div></TableBodyCell
					>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
{/if}
<ActionFooter tasks={data} />
