<script lang="ts">
	import { onMount } from "svelte";
  import { Badge, A } from "flowbite-svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { type User } from "$lib/types";
	import { getCurrentUser } from "$lib/store";
  import { getMyWorkers } from "$lib/api/queries";
  import Time from "svelte-time"

  const user: User = getCurrentUser();

  let workers: any = [];

  onMount(async () => {
    workers = await getMyWorkers({
      developer: user.alias
    });  
  })
</script>

<div class="mt-8">
  <Table>
    <TableHead>
      <TableHeadCell>Worker</TableHeadCell>
      <TableHeadCell class="text-center">Runs</TableHeadCell>
      <TableHeadCell>Last run</TableHeadCell>
    </TableHead>

    <TableBody tableBodyClass="divide-y">
    {#each (workers.data || []) as t}
      <TableBodyRow>
        <TableBodyCell>
          <div>
            <A class="text-lg" href={`#${t.id}`}>
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

</div>