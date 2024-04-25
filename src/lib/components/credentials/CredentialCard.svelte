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

	export let data: Credential;
	const community = useGetCommunity(data.communityUid);

	const bgImage = '/images/credentialbg.svg'; // gradient-background-1.jpeg';

	function gotoLink(uid: string) {
		return `/credential/${uid}`;
	}

	let profile: User | null = getCurrentUser();

	onMount(() => {
		profile = getCurrentUser();
	});
</script>

{#if $community.isLoading}
	<span>Loading...</span>
{:else if $community.isError}
	<ErrorOnFetch description="Credential" error={$community.error} />
{:else}
	<Card class="" padding="none">
		<!-- <div class="bg-[url(')] bg-cover p-4">
    </div> -->
		<div class="relative flex items-end justify-center">
			<img src={bgImage} class="fill h-auto w-full" alt="applicant" />

			<div
				class="border-1 absolute -bottom-4 flex items-center gap-2 rounded-full border-gray-100 bg-gray-50 p-1"
			>
				<Avatar size="xs" src={profile?.image ? profile?.image : '/images/profile-2.png'} tabindex="0" />
				<div class="text-xs text-black dark:text-white">{profile?.fullName}</div>
			</div>
		</div>

		<div class="px-4 pb-4 pt-4">
			<h6 class="mb-2 mt-2 text-xl font-bold text-gray-900 dark:text-white">{data.type}</h6>

			<p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
				{data.description}
			</p>
		</div>
		<div class="px-4 pb-4 pt-2">
			<div class="ms-0 mt-4 flex items-center justify-between rtl:space-x-reverse">
				<div class="flex items-center justify-between gap-2">
					<div>
						<Avatar src={$community.data?.image} size="xs" />
					</div>
					<div class="grid grid-cols-1 gap-1">
						<p class="text-weight-600 text-xs font-bold text-gray-500">Issued by</p>
						<p class="text-xs">{data.community}</p>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-1">
					<p class="text-weight-600 text-xs font-bold text-gray-500">Issued</p>
					<p class="text-xs">
						{#if data.issuedUTC}<Time
								format="DD MMM, YYYY"
								timestamp={data.issuedUTC}
							/>{:else}-{/if}
					</p>
				</div>
				<div class="grid grid-cols-1 gap-1 text-center">
					<p class="text-weight-600 text-xs font-bold text-gray-500">Expire</p>
					<p class="text-xs">
						{#if data.expiresUTC}<Time timestamp={data.expiresUTC} />
						{:else}-{/if}
					</p>
				</div>
			</div>
		</div>
	</Card>
{/if}
