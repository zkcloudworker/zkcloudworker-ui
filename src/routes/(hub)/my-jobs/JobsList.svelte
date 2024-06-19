<script lang="ts">
	import { onMount } from "svelte";
  import { Badge, A } from "flowbite-svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import Time from "svelte-time";
  import { searchJobs } from "$lib/api/searchs";
  import { type User } from "$lib/types";
	import { getCurrentUser } from "$lib/store";

  const user: User = getCurrentUser();

  let jobs: any = [];

  onMount(async () => {
    jobs = await searchJobs({
      query: '',
      filters: `developer:${'DFST'}`,
      hitsPerPage: 100,
      currentPage: 1      
    });  
  })
</script>

<div class="mt-8">
  <Table>
    <TableHead>
      <TableHeadCell>Time</TableHeadCell>
      <TableHeadCell>Job ID</TableHeadCell>
      <TableHeadCell>Repo</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
      <TableHeadCell>Metadata</TableHeadCell>
    </TableHead>

    <TableBody tableBodyClass="divide-y">
      {#each (jobs.data?.hits || []) as t}
      <TableBodyRow>
        <TableBodyCell>
          <Time timestamp={t.timeCreated} format="DD/MM/YY h:mm:ss"/>
        </TableBodyCell>
        <TableBodyCell>
          <code>{t.jobId.slice(0,6)}...{t.jobId.slice(-8)}</code>
          <br>
          <span class="text-xs text-gray-400">{t.chain}</span>
        </TableBodyCell>
        <TableBodyCell>
          {t.repo}
        </TableBodyCell>
        <TableBodyCell>
          <Badge color="green" rounded class="text-xs text-black py-1">
            {t.jobStatus}
          </Badge>
        </TableBodyCell>
        <TableBodyCell class="text-xs">
          {t.metadata}
        </TableBodyCell>
      </TableBodyRow>  
      {/each}
    </TableBody>
  </Table>
</div>