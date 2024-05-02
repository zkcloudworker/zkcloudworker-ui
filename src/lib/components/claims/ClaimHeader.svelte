<script lang="ts">
	import StateBadge from '$lib/components/common/StateBadge.svelte';
	import { type Plan } from '$lib/types/plan';
	import { Card, Badge, Avatar, Button, Img } from 'flowbite-svelte';
	import Time from 'svelte-time';
	import ErrorOnFetch from '../common/ErrorOnFetch.svelte';
  import { H1 } from "$lib/components";
	import { onMount } from 'svelte';
	import type { User } from '$lib/types';
	import { getCurrentUser } from '$lib/store';
	import { PlayOutline } from 'flowbite-svelte-icons';

	export let 
    data: Plan,
    isNew: boolean,
    isEdit: boolean,
    isView: boolean;
  
  // Date values and labels depend on isClaimable
  $: fromDateLabel = 'Starts';
  $: toDateLabel = 'Ends';
  $: fromDate = data.startsUTC;
  $: toDate = data.endsUTC;
  $: bannerImage = data?.banner || '/images/socialcap-bg-signin.svg';//'/images/credentialbg.svg'; 
  $: avatarImage = data.image || '/images/credentialbg.svg';

	onMount(async () => {
		//profile = getCurrentUser();
	});
</script>

<Card class="" padding="none"  size="fluid">
  <div class="relative bg-blue-100">
    <span class="inline-block mt-4 ms-4 absolute -bottom-12 left-0">
      <Avatar src={avatarImage} class="h-24 w-24 round drop-shadow-lg"/>
    </span>
    <img 
      src={bannerImage} 
      class="fill max-h-32 w-full" alt="Credential Banner" 
      crossorigin=""
    />
  </div>

		<div class="px-4 pt-16">
      <H1>{data.name}</H1>
			<p class="mb-0 mt-2 text-lg text-gray-400 dark:text-gray-400">
				{data.description}
			</p>
		</div>

		<div class="px-4 pb-4 pt-0">
			<div class="ms-0 mt-4 flex items-center justify-between rtl:space-x-reverse">
				<div class="text-start">
          {#if (data?.available || 0) > 0 }
            <Badge rounded large color="green" class="bg-green-200">{`${data.available} left`}</Badge>
          {:else}
            <Badge rounded large color="red">{`All claimed!`}</Badge>
          {/if}
				</div>

        <div class="flex items-start justify-between w-[50%] max-w-64">
          <div class="grid grid-cols-1 gap-1">
            <p class="text-weight-600 text-sm font-bold text-gray-500">{fromDateLabel}</p>
            <p class="text-sm">
              {#if fromDate}
                <Time format="MMM DD, YYYY" timestamp={fromDate} />
              {:else}-{/if}
            </p>
          </div>
          <div class="grid grid-cols-1 gap-1 text-left">
            <p class="text-weight-600 text-sm font-bold text-gray-500">{toDateLabel}</p>
            <p class="text-sm">
              {#if toDate}
                <Time format="MMM DD, YYYY" timestamp={toDate} />
              {:else}-{/if}
            </p>
          </div>
        </div>
		</div>
</Card>
