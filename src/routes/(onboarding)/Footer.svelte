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

<div class="w-full md:w-[36rem] mt-5 leading-relaxed text-gray-600">
  <p class=" p-3 text-center text-base">
    By signing, you accept our Terms and Conditions
  </p>
</div>

<div tag="footer"	class="fixed right-0 left-0 bottom-0 w-screen p-4">
  <div class="m-auto w-auto md:max-w-md mt-5 leading-relaxed text-gray-600">
    <p class="my-0 text-center text-sm">
      © 2023-2024 - 
      <A href="https://socialcap.app/" class="font-bold hover:underline" target="_blank">
        Socialcap
      </A>. 
      All rights reserved.
    </p>
    <div class="mt-4 mx-1 md:mx-16 flex items-center justify-between text-sm">
      <A class="underline inline-block">Support</A>
      <A class="underline inline-block">Privacy Policies</A>
      <A class="underline inline-block">Terms and Conditions</A>
    </div>
  </div>
</div>

