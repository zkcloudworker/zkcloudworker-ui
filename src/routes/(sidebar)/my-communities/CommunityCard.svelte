<script lang="ts">
  import { Card, Badge, Avatar, Button, Img } from 'flowbite-svelte';

  export let 
    uid = '', title = '', description = '', image = '',
    state = '', count = "0", 
    joined = false;

  const bgImage = '/images/gradient-background-1.jpeg';
</script>

<Card class="" padding="none" size="fluid">
  <!-- <div class="bg-[url(')] bg-cover p-4">
  </div> -->
  <div class="relative">
    <img src={bgImage} class="h-32 w-full"/>
    <span class="inline-block mt-4 ms-4 absolute top-0 left-0">
      <Avatar src={image || bgImage} class="h-24 w-24 round drop-shadow-lg"/>
    </span>
  </div>

  <div class="flex flex-col px-6 pb-4">
    <a href={`/community/${uid}`}>
      <h6 class="mt-4 mb-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h6>
    </a>
    <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
      {description}
    </p>
    <div class="mt-4 justify-between items-center flex rtl:space-x-reverse">
      <Badge rounded border large color="green">{state}</Badge>
      <div class="flex">
        <Avatar src="/images/profile-909.png" stacked size="sm"/>
        <Avatar src="/images/profile-1127.png" stacked  size="sm"/>
        <Avatar src="/images/profile-1.png" stacked  size="sm"/>
        <Avatar stacked size="sm" class="bg-gray-700 text-white hover:bg-gray-600 text-xs">+{count}</Avatar>        
      </div>      
      {#if !joined}
        <Button color="primary" size="sm">Join</Button>
      {/if}
    </div>
  </div>
</Card>  
