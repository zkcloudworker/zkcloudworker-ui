<script lang="ts">
	import { onMount, tick } from "svelte";
	import { fade, blur } from 'svelte/transition';  
  import { Badge, A, Skeleton, Spinner } from "flowbite-svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { type User } from "$lib/types";
	import { getCurrentUser } from "$lib/store";
  import { getMyWorkers, getUsedWorkers } from "$lib/api/queries";
  import Time from "svelte-time";

  const user: User = getCurrentUser();

  let deployed: any = [], used: any = [];
  let deployedVisibles = [], usedVisibles = [];
  let loading = false;

  onMount(async () => {
    // get all workers deployed by me
    loading = true;
    deployed = await getMyWorkers({
      developer: user.alias
    });  
    (deployed.data || []).forEach((row, index) => {
      setTimeout(() => {
        deployedVisibles = [...deployedVisibles, row];
      }, index * 60); // Delay each row by 500ms
    });    
    loading = false;

    // get all workers deployed by others , but used by me
    used = await getUsedWorkers({
      accountId: user.accountId,
      developer: user.alias
    });  
    (used.data || []).forEach((row, index) => {
      setTimeout(() => {
        usedVisibles = [...usedVisibles, row];
      }, index * 60); // Delay each row by 500ms
    });    
    loading = false;
  })
</script>

<div class="mt-8">
  {#if loading}
    <Spinner size="4"/> &nbsp; Loading workers ...
    <!-- <Skeleton size="sm" class="my-8" /> -->
  {/if}

  {#if !loading && deployed.data}
      <Table>
        <TableHead>
          <TableHeadCell>Worker</TableHeadCell>
          <TableHeadCell class="text-center">Runs</TableHeadCell>
          <TableHeadCell>Last run</TableHeadCell>
        </TableHead>

        <TableBody tableBodyClass="divide-y w-full">
        <p class="text-sm font-bold text-start pt-6 pb-2 ps-6">
          Deployed by me
        </p>
        {#each (deployedVisibles || []) as t}
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
                  ({t.developer})
                </p>
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

        {#if (usedVisibles || []).length}
        <TableBody tableBodyClass="divide-y w-full">
        <p class="text-sm font-bold text-start pt-6 pb-2 ps-6">
          Deployed by others, used by me
        </p>
        {#each (usedVisibles || []) as t}
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
                  ({t.developer})
                </p>
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
        {/if}

      </Table>
  {/if}
</div>