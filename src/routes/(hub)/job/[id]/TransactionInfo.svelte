<script lang="ts">
	import { onMount, tick } from "svelte";
  import { Badge, Search, A, Modal, Spinner } from "flowbite-svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { ArrowUpRightFromSquareOutline, ChevronLeftOutline, ChevronRightOutline, FilterSolid } from 'flowbite-svelte-icons';
  import { searchTransaction } from "$lib/api/searchs";
  import { type APIResult } from "$lib/api/base";
  import { sliced } from "$lib/utils";

  export let 
    jobId: string = '';
  
  let 
    response: APIResult,
    working = false,
    txn: any = {};

  onMount(async () => {
    working = true;
    response = await searchTransaction(jobId);
    txn = response.data?.hits[0] || null;
    await tick();
    working = false;
  })  

  function txnLink(txn: any) {
    return `https://minascan.io/${txn.chain}/tx/${txn.txId}?type=zk-tx`
  }

  function accountLink(txn: any) {
    return `https://minascan.io/${txn.chain}/account/${txn.id}/txs`
  }
</script>

<div>
  {#if working}
    <p class="text-sm py-4">
      <Spinner /> 
      Loading transaction for job {sliced(jobId)}
    </p>
  {/if}

  {#if !working && txn}
    <p class="text-xs text-gray-600 font-semibold mt-8 mb-0 ms-6 text-black">
      Transaction
    </p>

    <Table class="text-base">
      <TableBodyRow>
        <TableBodyCell class="text-sm w-40">Id</TableBodyCell>
        <TableBodyCell>
          <A href={txnLink(txn)} target='_blank'>
            {sliced(txn.txId)}
            &nbsp;
            <ArrowUpRightFromSquareOutline class="w-4 h4" />
          </A>
        </TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm w-40">User</TableBodyCell>
        <TableBodyCell>
          <A href={accountLink(txn)} target='_blank'>
            {sliced(txn.id)}
            &nbsp;
            <ArrowUpRightFromSquareOutline class="w-4 h4" />
          </A>
        </TableBodyCell>  
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm w-40">Metadata</TableBodyCell>
        <TableBodyCell><pre class="text-xs">{JSON.stringify(txn.metadata, null, 2)}</pre></TableBodyCell>
      </TableBodyRow>
    </Table>
  {/if}

  {#if !working && !txn}
    <p class="px-6 py-4">
      No transaction data available
    </p>  
  {/if}  
</div>
