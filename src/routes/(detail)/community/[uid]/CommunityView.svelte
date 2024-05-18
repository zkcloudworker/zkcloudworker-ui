<script lang="ts">
  import { onMount } from "svelte";
  import { Dropdown, DropdownItem, Tabs, TabItem } from 'flowbite-svelte';
  import { Badge, Avatar, Button, Img } from 'flowbite-svelte';
  import { EnvelopeSolid, EditSolid, ShareNodesSolid,DotsVerticalOutline } from "flowbite-svelte-icons";
  import { H1, ErrorOnFetch } from "$lib/components";
  import { useGetCommunity } from "$lib/hooks/communities";
	import { useGetAdminedPlans } from '$lib/hooks/plans';
  import { findState } from '$lib/types/states';
  import type { Community } from "$lib/types";
  import Time from 'svelte-time';
  import StateBadge from '$lib/components/common/StateBadge.svelte';
  import Breadcrumbs from "$lib/components/common/Breadcrumbs.svelte";
	import CommunityBanner from "$lib/components/communities/CommunityBanner.svelte";

  export let uid: string | null = null;
  
  let community = useGetCommunity(uid!);
  const plans = useGetAdminedPlans();
  let joined = true, sts = 0;

  $: cmn = $community.data;
  $: sts = findState((cmn?.state === 'INITIAL') ? 'Revision' : (cmn?.state || '-'));
    
  const bgImage = '/images/community-banner-light.svg'; // gradient-background-1.jpeg';
</script>

<div class="p-4">
  <Breadcrumbs label={$community.data?.name || '?'}/>

  <div>
    {#if $community.isLoading}
      <span>Loading...</span>
    {:else if $community.isError}
      <ErrorOnFetch 
        description="My community"
        error={$community.error} 
      />
    {:else}
      <div class="w-full max-w-screen-lg">
        <!-- <div class="bg-[url(')] bg-cover p-4">
        </div> -->
        <CommunityBanner image={cmn?.image} />
        <!-- <div class="relative bg-blue-100 mb-12 rounded-md">
          <Img src={bgImage} class="h-32 w-full rounded"/>
          <span class="inline-block mt-4 ms-4 absolute top-[4rem] left-0">
            <Img src={cmn?.image || bgImage} class="h-24 w-24 round drop-shadow-lg"/>
          </span>
        </div> -->
      
        <div class="px-4 pt-3 pb-4">
          <!-- <Badge rounded border large color="green" class="inline-block mb-0">{state}</Badge> -->
          <div class="flex justify-between items-center">
            <div>
              <StateBadge data={sts} /> 
              <span class="text-xs ms-2">
                Last update <Time relative={true} timestamp={cmn?.createdUTC.replace('T',' ')} />
              </span>
            </div>
            <div class="flex items-center space-x-1">
              <!-- 
                <Button size="md" color="light" class="!p-2 --bg-orange-500 --text-white"><EditSolid  class="w-6 h-6" /></Button> 
              -->
              <Button size="md" class="bg-orange-500">Admin this</Button> 
              <!-- <Button size="md" color="light" class="!p-2"><EnvelopeSolid  class="w-6 h-6" /></Button>  -->
              <Button size="md" color="light" class="!p-2"><ShareNodesSolid  class="w-6 h-6" /></Button> 
              <DotsVerticalOutline class="dots-menu w-6 h-6 font-bold dark:text-white" />
              <Dropdown placement="bottom" triggeredBy=".dots-menu">
                <DropdownItem>Share ...</DropdownItem>
                <DropdownItem>Invite ...</DropdownItem>
                <DropdownItem slot="footer">Delete this !</DropdownItem>
              </Dropdown>              
              <!--  
          -->
            </div>
          </div>
        
          <h6 class="mt-2 mb-2 text-xl font-bold text-gray-900 dark:text-white">{cmn?.name}</h6>
          <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            {cmn?.description}                                              
          </p>

          <Tabs style="underline" defaultClass="flex flex-wrap items-end justify-between space-x-4 rtl:space-x-reverse">
            <TabItem open class="">
              <span slot="title" class="font-bold">
                <span class="inline-block text-sm">
                  <Badge class="inline-block mb-0 bg-gray-200 rounded-full">
                    { cmn?.countClaims }
                  </Badge> Claim & Earn 
                </span>
              </span>
              <div>
                Credential offerings go here ...
              </div>
            </TabItem>

            <TabItem class="">
              <span slot="title" class="font-bold">
                <span class="inline-block text-sm font-bold">
                  <Badge class="inline-block mb-0 bg-gray-200 py-1 rounded-full">
                    {cmn?.countCredentials}
                  </Badge> Issued
                </span>
              </span>
              <div>
                Credential offerings go here ...
              </div>
            </TabItem>

            <TabItem class="">
              <span slot="title" class="text-dark text-sm font-bold">
                <div class="flex ms-4 items-center">
                  <Avatar src="/images/gradient-lean.svg" stacked size="sm"/>
                  <Avatar src="/images/gradient-mario.svg" stacked  size="sm"/>
                  <Avatar src="/images/gradient-nicolas.svg" stacked  size="sm"/>
                  <Avatar stacked size="sm" class="bg-gray-700 text-white font-bold hover:bg-gray-600 text-xs">
                    {cmn?.countMembers}
                  </Avatar> 
                  &nbsp;Members 
                </div>      
              </span>
              <div>
                Credential offerings go here ...
              </div>
            </TabItem>
          </Tabs>
        </div>
      </div>  
    {/if}
  </div>
</div>
