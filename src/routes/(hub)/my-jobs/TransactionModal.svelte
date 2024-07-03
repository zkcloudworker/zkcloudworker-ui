<script lang="ts">
	import { onMount, tick } from "svelte";
  import { Badge, Search, A, Modal, Spinner } from "flowbite-svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { ArrowUpRightFromSquareOutline, ChevronLeftOutline, ChevronRightOutline, FilterSolid } from 'flowbite-svelte-icons';
  import { searchTransaction } from "$lib/api/searchs";
  import { type APIResult } from "$lib/api/base";

  export let 
    jobId: string = '', 
    open = false;
  
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

  function sliced(s: string) {
    if (!s) return "";
    return s.slice(0,6)+'...'+s.slice(-6);
  }

  function txnLink(txn: any) {
    return `https://minascan.io/${txn.chain}/tx/${txn.txId}?type=zk-tx`
  }

  function accountLink(txn: any) {
    return `https://minascan.io/${txn.chain}/account/${txn.id}/txs`
  }
</script>

<Modal title="Transaction" size="lg" bind:open={open} autoclose>
  {#if working}
    <Spinner /> 
    Loading transaction for job {sliced(jobId)}
  {/if}

  {#if !working && txn}
    <Table class="text-base">
      <TableBodyRow>
        <TableBodyCell class="text-sm">Job Id</TableBodyCell>
        <TableBodyCell>{sliced(jobId)}</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm">Chain</TableBodyCell>
        <TableBodyCell>{txn.chain}</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm">Transaction Id</TableBodyCell>
        <TableBodyCell>
          <A href={txnLink(txn)} target='_blank'>
            {sliced(txn.txId)}
            &nbsp;
            <ArrowUpRightFromSquareOutline class="w-4 h4" />
          </A>
        </TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm">User</TableBodyCell>
        <TableBodyCell>
          <A href={accountLink(txn)} target='_blank'>
            {sliced(txn.id)}
            &nbsp;
            <ArrowUpRightFromSquareOutline class="w-4 h4" />
          </A>
        </TableBodyCell>  
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm">Developer</TableBodyCell>
        <TableBodyCell>{txn.developer}</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm">Repo</TableBodyCell>
        <TableBodyCell>{txn.repo}</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-sm">Metadata</TableBodyCell>
        <TableBodyCell><pre class="text-xs">{JSON.stringify(txn.metadata, null, 2)}</pre></TableBodyCell>
      </TableBodyRow>
    </Table>
  {/if}

  {#if !working && !txn}
    No data available
  {/if}  
</Modal>
