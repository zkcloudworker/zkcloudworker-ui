<script lang="ts">
	import type { Community } from '$lib/types';
	//
	import Time from 'svelte-time';
	import { Button, Badge } from 'flowbite-svelte';
	import { ForwardOutline, CheckOutline } from 'flowbite-svelte-icons';
	import CommunityMenu from '$lib/components/communities/CommunityMenu.svelte';
	import JoinCommunityModal from '$lib/components/communities/JoinCommunityModal.svelte';
	import { type Credential } from '$lib/types/credential';
	export let credential: Credential | undefined;
</script>

<div class="flex items-center space-x-1">
	<Button size="md" color="light" class="p-2 px-4">
		Share <ForwardOutline class="ms-2 h-5 w-5" />
	</Button>

	<Button size="md" color="primary" class="p-2 px-4">
		Mint
	</Button>
</div>
