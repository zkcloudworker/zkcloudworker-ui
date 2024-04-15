<script lang="ts">
	import StateBadge from '$lib/components/StateBadge.svelte';
	import { Card, Badge, Avatar, Button, Img } from 'flowbite-svelte';
	import Time from 'svelte-time/Time.svelte';

	export let data: {
		uid: string;
		state: number;
		type: string;
		image: string;
		community: string;
		createdUTC?: Date;
		issuedUTC?: Date;
	};

	const bgImage = '/images/gradient-background-1.jpeg';
</script>

<Card size="full">
	<!-- <div class="bg-[url(')] bg-cover p-4">
    </div> -->
	<div class="space-y-4">
		<div class="flex space-x-4">
			<Avatar src={data.image || bgImage} class="round h-10 w-10 drop-shadow-lg" />
			<a href={`/claim/${data.uid}`}>
				<div class="grid grid-cols-1 gap-1">
					<p class="text-weight-400 text-xs text-gray-500">{data.community}</p>
					<p class="text-weight-600 text-md">{data.type}</p>
				</div>
			</a>
		</div>

		<!-- <div class="flex space-y-4"> -->
		<div class="flex items-center justify-between">
			<div class="flex space-x-4">
				<div class="grid grid-cols-1 gap-1">
					<p class="text-md text-weight-600 text-gray-500">Created</p>
					<p class="text-xs"><Time timestamp={data.createdUTC} /></p>
				</div>
				<div class="grid grid-cols-1 gap-1 text-center">
					<p class="text-md text-weight-600 text-gray-500">Claimed</p>
					<p class="text-xs">
						{#if data.issuedUTC}<Time timestamp={data.issuedUTC} />
						{:else}-{/if}
					</p>
				</div>
			</div>
			<StateBadge class="p-x-16 p-y-1 text-sm" data={data.state} />
		</div>
	</div>
</Card>
