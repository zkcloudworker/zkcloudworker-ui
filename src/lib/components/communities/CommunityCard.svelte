<script lang="ts">
  import StateBadge from '$lib/components/common/StateBadge.svelte';
	import { findState } from '$lib/types/states';
  import { Card, Badge, Avatar, Button, Img } from 'flowbite-svelte';

  export let 
    uid = '', title = '', description = '', image = '',
    state = '', count = "0", nClaims = 0, nCredentials = 0,
    joined = false;

  $: sts = findState((state === 'INITIAL') ? 'Revision' : state);
  const bgImage = '/images/socialcap-bg-signin.svg'; // gradient-background-1.jpeg';

  function gotoLink(joined: boolean, uid: string) {
    return joined 
      ? `/community/${uid}`
      : `/community/${uid}`;
  }
</script>

<Card class="" padding="none" size="fluid">
  <!-- <div class="bg-[url(')] bg-cover p-4">
  </div> -->
  <div class="relative bg-blue-100">
    <img src={bgImage} class="h-32 w-full"/>
    <!-- <span class="inline-block mt-4 ms-4 absolute top-0 left-0">
      <Avatar src={image || bgImage} class="h-24 w-24 round drop-shadow-lg"/>
    </span> -->
  </div>

  <div class="px-4 pt-2 pb-4">
    <!-- <Badge rounded border large color="green" class="inline-block mb-0">{state}</Badge> -->
    <StateBadge data={sts} />
    <a href={gotoLink(joined, uid)}>
      <h6 class="mt-2 mb-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h6>
    </a>
    <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
      {description}                                              
    </p>
    <div class="ms-0 mt-4 justify-between items-center flex rtl:space-x-reverse">
      {#if joined}
        <span class="inline-block text-sm font-bold">
          <Badge class="inline-block mb-0 py-1 bg-gray-200 rounded-full">
            { nClaims }
          </Badge> claims
        </span>
        <span class="inline-block text-sm font-bold">
          <Badge class="inline-block mb-0 py-1 bg-gray-200 rounded-full">
            { nCredentials }
          </Badge> issued
        </span>
      {/if}
      <div class="flex ms-4 items-center">
        <Avatar src="/images/gradient-lean.svg" stacked size="xs"/>
        <Avatar src="/images/gradient-mario.svg" stacked  size="xs"/>
        <Avatar src="/images/gradient-nicolas.svg" stacked  size="xs"/>
        <Avatar stacked size="xs" class="py-1 bg-gray-200 text-dark font-bold hover:bg-gray-600 text-xs w-10">
          +{Number(count)-3 }
        </Avatar>        
      </div>      
      {#if !joined}
        <Button color="primary" size="sm">Join</Button>
      {/if}
    </div>                
  </div>
</Card>  
