<script lang="ts">
  import { Card, Badge, Avatar, Button, Img } from 'flowbite-svelte';
  import {  PersonSnowboardingSolid,  PeopleGroupSolid } from "svelte-awesome-icons";
  import InvitationCard from './InvitationCard.svelte';

  export let title = '', description = '', state = '', count = "0";
</script>

<Card class="" padding="none" size="fluid">
  <img src="/images/gradient-background-1.jpeg" class="" style="width:100%;max-height:128px;"/>
  <div class="flex flex-col px-6 pb-4">
    <h6 class="mt-4 mb-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h6>
    <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
      {description}
    </p>
    <div class="mt-4 justify-between items-center flex rtl:space-x-reverse">
      <Badge rounded border large color="green">Active</Badge>
      <div class="flex">
        <Avatar src="/images/profile-909.png" stacked size="sm"/>
        <Avatar src="/images/profile-1127.png" stacked  size="sm"/>
        <Avatar src="/images/profile-1.png" stacked  size="sm"/>
        <Avatar stacked size="sm" class="bg-gray-700 text-white hover:bg-gray-600 text-xs">+{count}</Avatar>        
      </div>      
      <Button color="primary" size="sm">Join</Button>
    </div>
  </div>
</Card>  
