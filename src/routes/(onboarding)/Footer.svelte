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
    mx-4 my-2 rounded-lg bg-transparent p-4 dark:bg-gray-800 
    md:flex md:items-center md:justify-between md:p-2 xl:p-3
  `;
</script>

<div class="w-full md:w-[36rem] mt-5 leading-relaxed">
  <p class=" p-3 text-center text-base font-semibold ">
    Signing means you abide to our 
    <A href="https://socialcap.app">
      Terms and Conditions
    </A>.
  </p>
  <p class="my-0 text-center text-sm text-gray-800">
    © 2023-2024 <A href="https://socialcap.app/" class="font-bold hover:underline" target="_blank">
      Socialcap Project
    </A>. 
    All rights reserved.
  </p>
</div>

<!-- <Frame tag="footer"	class={frameClass}>
	<ul class="mb-0 flex flex-wrap items-center space-y-1 sm:gap-4 md:mb-0 xl:gap-6">
		{#each links as { name, href }}
			<li>
				<a
					{href}
					class="mr-4 text-sm font-normal text-blue-800 underline hover:underline dark:text-gray-400 sm:mr-6"
				>
					{name}
				</a>
			</li>
		{/each}
	</ul>
	<div class="flex space-x-6 sm:justify-center">
		{#each brands as [component, href]}
			<a {href} class="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
				<svelte:component this={component} size="lg" />
			</a>
		{/each}
	</div>
</Frame> -->

