<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import Icon from './Icon.svelte';
	export let text = 'You have no data to display';
	export let title = 'Nothing to see here';
</script>

<div class="flex justify-center mt-8 lg:mt-20">
	<Card class="items-center px-18 py-6 rounded-md border-0 bg-gray-50 text-center" padding="xl">

			<div class="mb-6">
				<Icon name="Sad" size="8" />
			</div>
			<h6 class="text-md text-weight-500 mb-2 text-gray-900 dark:text-white">{title}</h6>
			<p class="text-weight-400 mb-4 text-sm text-gray-600 dark:text-gray-400 sm:text-lg">
				{text}
			</p>
			<div
				class="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0 rtl:space-x-reverse"
			>
				<Button color="primary" size="sm">Back home</Button>
				<Button color="none" class="border-0">Learn more</Button>
			</div>

	</Card>
</div>
