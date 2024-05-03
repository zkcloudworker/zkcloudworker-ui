<script lang="ts">
  import { type APIResponse } from '$lib/api';
  import { Heading, P, Badge  } from 'flowbite-svelte';
	import { ErrorOnFetch } from '$lib/components';
  import { activities } from './home/data';

  // let activities: APIResponse | null = null;
</script>

<div class="block w-full border-s-2 border-s-gray-100 rounded py-11 px-8">
  <Heading tag="h4">
    Activity
  </Heading>
  <P class="text-gray-400 mb-4" size="base">
    Follow activities from your communities  
  </P>
  {#if !activities?.error}
    {#each (activities?.data || []) as t}
      <div class="mb-5 leading-relaxed">
        <p>
          <span class="text-bold text-sm">{t.title}: </span>
          <span class="mt-2 text-sm text-gray-500">{t.description}</span>
        </p>
        <Badge color="dark">{t.when}</Badge>
      </div>
    {/each}
  {:else}
    <ErrorOnFetch
      description="Activities"
      error={activities.error}
    />
  {/if}
</div>  
