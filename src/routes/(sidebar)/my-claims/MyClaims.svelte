<script lang="ts">
	import type { PageData } from './$types';
	import { Heading } from 'flowbite-svelte';

	import { useGetMyClaims } from '$lib/hooks/claims';
	import ClaimsTable from './ClaimsTable.svelte';
	import { P } from 'flowbite-svelte';
	import { H1, ErrorOnFetch } from '$lib/components';
	import ClaimCard from './ClaimCard.svelte';
	import Device from '$lib/components/Device.svelte';
	import { isMobile } from '$lib/screenWidth';
  let innerWidth = 0;
	const claims = useGetMyClaims();
</script>
<Device bind:innerWidth />

<div class="p-4">
	<H1>My Claims</H1>
	<P class="text-gray-400" size="base">Your claimed credentials</P>
	<P class="pb-8"></P>
	{#if $claims.isLoading}
		<span>Loading...</span>
	{:else if $claims.isError}
		<ErrorOnFetch description="All my claims" error={$claims.error} />
	{:else if isMobile(innerWidth)}
		<div class="grid grid-cols-1 gap-1">
			{#each $claims.data || [] as t}
				<ClaimCard data={t} />
			{/each}
		</div>
	{:else}
		<ClaimsTable data={$claims.data} />
	{/if}
</div>
