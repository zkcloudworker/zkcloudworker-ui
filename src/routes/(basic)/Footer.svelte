<script lang="ts">
	import { Card, Frame, A, P, type LinkType } from 'flowbite-svelte';
	import {
		DiscordSolid,
		DribbbleSolid,
		FacebookSolid,
		GithubSolid,
		TwitterSolid
	} from 'flowbite-svelte-icons';
	import type { ComponentType } from 'svelte';

  export let message: string = "";

	const links: LinkType[] = [
		{ name: 'Terms and conditions', href: '#' },
		{ name: 'Privacy Policy', href: '#' },
	];

	const brands: [ComponentType, string][] = [
		[DiscordSolid, ''],
		[TwitterSolid, ''],
		[GithubSolid, ''],
	];

  const maxWidth = "max-w-lg";
  const frameClass = `
    ${maxWidth}
    mx-4 my-2 rounded-lg bg-transparent p-4 shadow dark:bg-gray-800 
    md:flex md:items-center md:justify-between md:p-2 xl:p-8
  `;
</script>

{#if message}
  <P class="{maxWidth} bg-white shadow mt-4 p-6 text-center text-md font-semibold leading-relaxed">
    {@html message}
  </P>
{/if}
<Frame tag="footer"	class={frameClass}>
	<ul class="mb-0 flex flex-wrap items-center space-y-1 sm:gap-4 md:mb-0 xl:gap-6">
		{#each links as { name, href }}
			<li>
				<a
					{href}
					class="mr-4 text-sm font-normal text-gray-500 hover:underline dark:text-gray-400 sm:mr-6"
				>
					{name}
				</a>
			</li>
		{/each}
	</ul>
	<div class="flex space-x-6 sm:justify-center">
		{#each brands as [component, href]}
			<a {href} class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
				<svelte:component this={component} size="md" />
			</a>
		{/each}
	</div>
</Frame>

<p class="my-0 text-center text-sm text-gray-500">
	© 2023-2024 <A href="https://socialcap.app/" class="font-bold hover:underline" target="_blank">
		Socialcap Project
  </A>. All rights reserved.
</p>
