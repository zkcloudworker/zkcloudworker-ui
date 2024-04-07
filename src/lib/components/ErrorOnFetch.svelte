<script lang="ts">
	import { P, A } from 'flowbite-svelte';
  import { APIError } from '$lib/api/api-errors';

  const twClasses: string = ""; 
  export { twClasses as class }; 
  export let description: string = '' 
  export let error: APIError | null = null;
</script>

<div class="py-4">
  <P class={`leading-8 ${twClasses}`}>
    <span class="text-lg">
      We could not fetch <b class="bg-gray-200 px-2 py-1 text-base rounded">{description}</b> data.
    </span> 
    <br/>
    <span class={`text-base ${twClasses}`}>
      If you think this is an application error, please report it 
      to our Team using the <A href="/support">Support channels</A>
    </span>
    <br/>
    <span class={`text-sm`}>
      Detail: <code>({error?.code}): {error?.message}</code>
    </span>
  </P>
</div>