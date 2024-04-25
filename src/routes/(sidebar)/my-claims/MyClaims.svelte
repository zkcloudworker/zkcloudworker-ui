<script lang="ts">
	import type { PageData } from './$types';
	import { useGetMyClaims } from '$lib/hooks/claims';
	import ClaimsTable from './ClaimsTable.svelte';
	import { P } from 'flowbite-svelte';
	import { H1, ErrorOnFetch } from '$lib/components';
	import ClaimsTableMobile from './ClaimsTableMobile.svelte';
	import NoData from '$lib/components/common/NoData.svelte';
	const claims = useGetMyClaims();
</script>

<div class="p-4">
	<H1>My Claims</H1>
	<P class="text-gray-400" size="base">Your claimed credentials</P>
	<P class="pb-8"></P>
	{#if $claims.isLoading}
		<span>Loading...</span>
	{:else if $claims.isError}
		<ErrorOnFetch description="All my claims" error={$claims.error} />
	{:else if !$claims.data || $claims.data.length === 0}
		<NoData text="Yo have no pending claims" />
	{:else}
		<div class="hidden lg:block">
			<ClaimsTable data={$claims.data} />
		</div>
		<div class="block lg:hidden">
			<ClaimsTableMobile data={$claims.data} />
		</div>
	{/if}
</div>
