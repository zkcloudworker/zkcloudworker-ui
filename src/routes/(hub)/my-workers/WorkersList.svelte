<script lang="ts">
	import { onMount, tick } from "svelte";
	import { fade, blur } from 'svelte/transition';  
  import { Badge, A, Skeleton, Spinner } from "flowbite-svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { type User } from "$lib/types";
	import { getCurrentUser } from "$lib/store";
  import { getMyWorkers } from "$lib/api/queries";
  import Time from "svelte-time";

  const user: User = getCurrentUser();

  let workers: any = [];
  let visibles = [];
  let loading = false;

  onMount(async () => {
    loading = true;
    workers = await getMyWorkers({
      developer: user.alias
    });  
    loading = false;
    (workers.data || []).forEach((row, index) => {
      setTimeout(() => {
        visibles = [...visibles, row];
      }, index * 60); // Delay each row by 500ms
    });    
  })
</script>

<div class="mt-8">
  {#if loading}
    <Spinner size="4"/> &nbsp; Loading workers ...
    <!-- <Skeleton size="sm" class="my-8" /> -->
  {/if}

  {#if !loading && workers.data}
      <Table>
        <TableHead>
          <TableHeadCell>Worker</TableHeadCell>
          <TableHeadCell class="text-center">Runs</TableHeadCell>
          <TableHeadCell>Last run</TableHeadCell>
        </TableHead>

        <TableBody tableBodyClass="divide-y">
        {#each (visibles || []) as t}
          <TableBodyRow>
            <TableBodyCell>
              <div data-sveltekit-preload-data="false">
                <A class="text-lg" href={`/my-jobs/?repo=${t.repo}`}>
                  {t.repo} 
                </A>
                <Badge class="ms-2">
                  {t.version}
                </Badge>
                <p class="text-xs text-gray-400">
                  Deployed <Time timestamp={t.timeDeployed} />
                </p>
                <!-- <p class="text-xs">{JSON.stringify(t, null, 2)}</p> -->
              </div>
            </TableBodyCell>
            <TableBodyCell class="text-center">
              {t.countUsed}
            </TableBodyCell>
            <TableBodyCell>
              <Time timestamp={t.timeUsed} />
            </TableBodyCell>
          </TableBodyRow>
        {/each}
        </TableBody>
      </Table>
  {/if}
</div>