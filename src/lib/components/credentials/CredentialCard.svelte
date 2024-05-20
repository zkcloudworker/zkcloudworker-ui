<script lang="ts">
	import StateBadge from '$lib/components/common/StateBadge.svelte';
	import { type Credential } from '$lib/types/credential';
	import { Card, Badge, Avatar, Button, Img } from 'flowbite-svelte';
	import Time from 'svelte-time';
	import { useGetCommunity } from '$lib/hooks/communities';
	import ErrorOnFetch from '../common/ErrorOnFetch.svelte';
	import { onMount } from 'svelte';
	import type { User } from '$lib/types';
	import { getCurrentUser } from '$lib/store';
	import { avatarPath } from '$lib/variables';
	import { goto } from '$app/navigation';

	export let 
    data: Credential,
    joined: boolean = false,
    isClaimable: boolean = false;
  
  const community = useGetCommunity(data.communityUid);
  let profile: User | null = getCurrentUser();

  $: isIssued = !isClaimable;
  // Date values and labels depend on isClaimable
  $: fromDateLabel = isClaimable ? 'Starts' : 'Issued';
  $: toDateLabel = isClaimable ? 'Ends' : 'Expires';
  $: fromDate = isClaimable ? data.startsUTC : data.issuedUTC;
  $: toDate = isClaimable ? data.endsUTC : data.expiresUTC;
  $: bannerImage = data?.banner || '/images/credentialbg.svg'; 
  $: avatarImage = isClaimable 
      ? (data?.image || '/images/credentialbg.svg')
      : (profile?.image || data.image || '/images/profile-2.png');
  $: avatarLabel = isClaimable 
      ? (data?.community || 'No name')
      : (data.applicant || 'No name');
  $: issuedByImage = isIssued 
      ? ($community.data?.image || '/images/credentialbg.svg')
      : "";


	function gotoLink(uid: string) {
		return `/credential/${uid}`;
	}

	onMount(async () => {
		profile = getCurrentUser();
    console.log("community Image", $community.data?.image);
	});

</script>

{#if $community.isLoading}
	<span>Loading...</span>
{:else if $community.isError}
	<ErrorOnFetch description="Credential" error={$community.error} />
{:else}
	<Card class="" padding="none"  size="fluid">
		<!-- <div class="bg-[url(')] bg-cover p-4">
    </div> -->
		<div class="relative flex items-end justify-center">
			<img 
        src={bannerImage} 
        class="fill h-auto w-full" alt="Credential Banner" 
        crossorigin=""
      />

			<div class="border-2 absolute -bottom-4 flex items-center gap-2 rounded-full border-gray-200 bg-gray-50 p-1">
				<Avatar size="xs" src={avatarImage} crossorigin="" tabindex="0" />
				<div class="text-xs truncate max-w-64 text-black dark:text-white px-2">{avatarLabel}</div>
			</div>
		</div>

		<div class="ps-4 pb-4 pt-4">
      {#if isIssued}
			  <h6 class="mb-2 mt-2 text-xl font-bold text-gray-900 dark:text-white">
          {data.type || data.name}
        </h6>
      {/if}
      {#if isClaimable}
        <div class="flex items-center justify-between">
          <h6 class="mb-2 mt-2 text-xl font-bold text-gray-900 dark:text-white">
            {data.type}
          </h6>
          <div class="min-w-20">
            {#if (data?.available || 0) > 0 }
              <Badge rounded large color="green" class="bg-green-200">{`${data.available} left`}</Badge>
            {:else}
              <Badge rounded large color="red">{`All claimed!`}</Badge>
            {/if}
          </div>
        </div>
      {/if}

			<p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
				{data.description}
			</p>
		</div>
		<div class="px-4 pb-4 pt-2">
			<div class="ms-0 mt-4 flex items-center justify-between rtl:space-x-reverse">
        {#if isIssued}
  				<div class="flex items-center justify-between gap-2">
  					<div>
  						<Avatar src={issuedByImage} crossorigin="" size="xs" />
  					</div>
  					<div class="grid grid-cols-1 gap-1">
  						<p class="text-weight-600 text-xs font-bold text-gray-500">Issued by</p>
  						<p class="text-xs">{data.community}</p>
  					</div>
  				</div>
        {/if}

				<div class="grid grid-cols-1 gap-1">
					<p class="text-weight-600 text-xs font-bold text-gray-500">{fromDateLabel}</p>
					<p class="text-xs">
						{#if fromDate}
              <Time format="MMM DD, YYYY" timestamp={fromDate} />
            {:else}-{/if}
					</p>
				</div>
				<div class="grid grid-cols-1 gap-1 text-left">
					<p class="text-weight-600 text-xs font-bold text-gray-500">{toDateLabel}</p>
					<p class="text-xs">
						{#if toDate}
              <Time format="MMM DD, YYYY" timestamp={toDate} />
						{:else}-{/if}
					</p>
				</div>

        {#if isClaimable}
          <Button color="primary" 
            on:click={() => goto(`/claim/new?mp=${data.uid}`)}>
            Claim it!
          </Button>
        {/if}
		</div>
	</Card>
{/if}
