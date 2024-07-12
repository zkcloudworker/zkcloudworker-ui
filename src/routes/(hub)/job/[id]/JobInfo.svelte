<script lang="ts">
	import { onMount, tick } from "svelte";
  import { Badge, Search, A, Modal, Spinner } from "flowbite-svelte";
  import Time from "svelte-time/Time.svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { ArrowUpRightFromSquareOutline, ChevronLeftOutline, ChevronRightOutline, FilterSolid } from 'flowbite-svelte-icons';
  import { getJob } from "$lib/api/searchs";
  import { type APIResult } from "$lib/api/base";
  import { sliced } from "$lib/utils";
  import StateBadge from "$lib/components/common/StateBadge.svelte";

  export let 
    jobId: string = '';
  
  let 
    response: APIResult,
    working = false,
    job: any = {};

  onMount(async () => {
    working = true;
    response = await getJob(jobId);
    job = response.data?.hits[0] || null;
    await tick();
    working = false;
  })  
</script>

<div>
  {#if working}
    <p class="text-sm py-6">
      <Spinner size={5}/> 
      Loading job data for {sliced(jobId)}
    </p>  
    {/if}
    
    {#if !working && job}
    <Table class="text-base">
      <TableBodyRow>
        <TableBodyCell class="text-sm w-40">Job</TableBodyCell>
        <TableBodyCell class="flex items-center justify-start">
          <div>{jobId} 
            <p class="text-sm text-gray-500 mt-2">
              <Time timestamp={job.timeCreated} format="DD/MM/YY h:mm:ss"/>
            </p>
          </div>
        </TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm w-40">Status</TableBodyCell>
        <TableBodyCell class="flex items-center justify-start">
            <StateBadge state={job.jobStatus} />
        </TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm w-40">Repo</TableBodyCell>
        <TableBodyCell>{job.repo} ({job.developer})</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm w-40">Task</TableBodyCell>
        <TableBodyCell>
          {job.task}
          <Badge class="ms-3 p-1 px-2" color="blue">{job.chain}</Badge>
        </TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm w-40">Events</TableBodyCell>
        <TableBodyCell class="text-sm">
          <pre>Created    <Time timestamp={job.timeCreated} format="hh:mm:ss.ms"/></pre>
          <pre>Started    <Time timestamp={job.timeStarted} format="hh:mm:ss.ms"/></pre>
          <pre>Finished   <Time timestamp={job.timeFinished} format="hh:mm:ss.ms"/></pre>
          <pre>Used       <Time timestamp={job.timeUsed} format="hh:mm:ss.ms"/></pre>
        </TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm w-40">Billed</TableBodyCell>
        <TableBodyCell>{job.billedDuration || 'unknown'} ms</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm w-40">Metadata</TableBodyCell>
        <TableBodyCell><pre class="text-sm">{job.metadata}</pre></TableBodyCell>
      </TableBodyRow>
    </Table>
    <!--
      events
      objectID
      "zkCW2kebIaeBsbdDcVMBrzLbtmTdyXpjJkXaCHV0mgotnniY.1720525444648"
      jobId
      "zkCW2kebIaeBsbdDcVMBrzLbtmTdyXpjJkXaCHV0mgotnniY"
      jobStatus
      "used"
      eventTime
      1720525444648    
  -->
  {/if}

  {#if !working && !job}
    <p class="px-6 py-4">
      No job data available
    </p>  
  {/if}  
</div>
