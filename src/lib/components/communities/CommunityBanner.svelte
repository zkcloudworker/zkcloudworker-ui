<script lang="ts">
  import { Card, Badge, Avatar, Button, Img } from 'flowbite-svelte';
  
  export let image: string = "";
</script>

<div class="relative bg-blue-100 h-32 bg-[url('/images/community-banner-light.svg')] bg-cover rounded-t-lg">
  <Img 
    src={image} 
    crossorigin={(image || "").includes('socialcap.') ? null : ""}
    class="absolute max-w-24 h-24 mt-10 ms-4 bg-gray-200 border-2 border-gray-100 rounded-3xl"/>
    <!-- <span class="inline-block mt-4 ms-4 absolute top-0 left-0">
      <Avatar src={image || bgImage} class="h-24 w-24 round drop-shadow-lg"/>
    </span> -->
</div>
