<script lang="ts">
	import { onMount, tick } from "svelte";
  import { Badge, Search, A } from "flowbite-svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { Pagination, PaginationItem } from 'flowbite-svelte';  
  import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
  import Time from "svelte-time";
  import { searchCharges } from "$lib/api/searchs";
  import TransactionModal from "../my-jobs/TransactionModal.svelte";
	import { goto } from "$app/navigation";

  export let 
    query: string = '',
    filters: string = ''; // example: 'status:active AND repo=pepe',

  let hits: any = [];
  let nbPages = 0, nbHits = 0, currentPage = 0, pages = [];
  let q = '';
  let modalOn = false, transaction: any = {};

  onMount(async () => {
    await onChange(currentPage);
  })
  
  async function onChange(page: number) {
    console.log("search", q);
    page = (page < 0 ? 0 : page)
    let jobs = await searchCharges({
      query: `${query} ${q}`,
      filters,
      hitsPerPage: 20,
      currentPage: page     
    });  
    nbHits = jobs.data.nbHits;
    nbPages = jobs.data.nbPages;
    currentPage = jobs.data.page;
    pages = [{ name: `${(currentPage+1)} / ${nbPages}` }];     
    hits = [].concat(jobs.data.hits); 
    console.log(hits);
    await tick();
  }

  const previous = () => {
    onChange(currentPage-1);
  };
  
  const next = () => {
    if (currentPage === nbPages-1) return;
    onChange(currentPage+1);
  };  

  async function openModal(jobId: string) {
    goto(`/job/${jobId}`);
  }
</script>

{#if modalOn}
  <TransactionModal 
    bind:open={modalOn} 
    jobId={transaction.jobId}
  />
{/if}    

<div class="mt-8 w-full">
  <div class="flex items-center justify-between mb-3">
    <Search
      bind:value={q} on:input={() => { onChange(0) }} 
      size="md" 
      class="inline-block w-2/3 border focus:outline-none" 
    />
    <div class="w-1/2 text-end">
      <!-- {nbHits} {nbPages} Page: {currentPage} -->
      {#if nbPages > 0} 
        <Pagination {pages} no-large on:previous={previous} on:next={next} icon>
          <svelte:fragment slot="prev">
            <span class="sr-only">Previous</span>
            <ChevronLeftOutline class="w-6 h-6" />
          </svelte:fragment>
          <svelte:fragment slot="next">
            <span class="sr-only">Next</span>
            <ChevronRightOutline class="w-6 h-6" />
          </svelte:fragment>
        </Pagination>  
      {/if}  
    </div>
  </div>
  <Table>
    <TableHead>
      <TableHeadCell>Time</TableHeadCell>
      <TableHeadCell>Job ID</TableHeadCell>
      <!-- <TableHeadCell>Id ?</TableHeadCell> -->
      <TableHeadCell class="text-center">Billed Time (ms)</TableHeadCell>
      <TableHeadCell class="text-center">Amount (MINA)</TableHeadCell>
    </TableHead>

    <TableBody tableBodyClass="divide-y">
      {#each (hits || []) as t}
      <TableBodyRow>
        <TableBodyCell>
          <Time timestamp={t.timeCreated} format="DD/MM/YY h:mm:ss"/>
        </TableBodyCell>
        <TableBodyCell>
          <A 
            class="font-semibold"
            href={`#`} 
            on:click={() => openModal(t.jobId)}>
            <code>{t.jobId.slice(0,6)}...{t.jobId.slice(-8)}</code>
          </A>  
        </TableBodyCell>
        <TableBodyCell class="text-center">
          {t.billedDuration}
          <!-- <br>
          <span class="text-xs">({t.time})</span> -->
        </TableBodyCell>
        <TableBodyCell class="text-xs text-center">
          {t.amount}
        </TableBodyCell>
      </TableBodyRow>  
      {/each}
    </TableBody>
  </Table>
</div>