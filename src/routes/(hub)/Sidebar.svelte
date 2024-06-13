<script lang="ts">
  import { onMount } from "svelte";
  import { getCurrentUser } from "$lib/store";
  import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button, Sidebar,	SidebarGroup,	SidebarItem, SidebarWrapper } from 'flowbite-svelte';
  import { SidebarDropdownWrapper, SidebarDropdownItem } from "flowbite-svelte";
  import { Avatar, Select, A } from 'flowbite-svelte';
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import Icon from "$lib/components/common/Icon.svelte";
  import GradientAvatar from "$lib/components/common/GradientAvatar.svelte";
	import { getInitials, buildGradient } from "$lib/components/common/gradient-svg";
  import type { User, Chain } from "$lib/types";
  import { removeActiveSession } from '$lib/store/sessions';
  import { getCurrentChain, getChains, DEFAULT_CHAIN_ID } from "$lib/store/chains";
	import { setNavigationPath } from '$lib/store/navigation';

	export let drawerHidden: boolean = false;
  export let network: string = 'devnet';
  
	$: mainSidebarUrl = $page.url.pathname;
	let activeMainSidebar: string;
  let openCreateCommunityModal = false;
  let profile: User | null = getCurrentUser();
  let chain: Chain | null = getCurrentChain();
  let chains: Chain[] = getChains();
  $: initials = getInitials(profile?.fullName ?? ""); 
  $: chainId = chain?.chainId || DEFAULT_CHAIN_ID;

	afterNavigate((navigation) => {
    setNavigationPath({
      from: navigation.from?.route.id || "",
      to: navigation.to?.route.id || "", 
      type: navigation.type
    })
    // this fixes https://github.com/themesberg/flowbite-svelte/issues/364
		document.getElementById('svelte')?.scrollTo({ top: 0 });
		closeDrawer();
		activeMainSidebar = navigation.to?.url.pathname ?? '';
	});

	const closeDrawer = () => {
    drawerHidden = true;
	};

  function logoutNow() {
    removeActiveSession();
  }
  
  onMount(() => {
    profile = getCurrentUser();
  })

  // auxiliary classes for Sidebar
  let iconClass ='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white';
  let itemClass ='flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700';
  let groupClass = 'pt-3 space-y-3';
  let spanClass = 'text-base text-gray-600 black dark:text-gray-100 flex-1 ms-3 whitespace-nowrap';
</script>

<Sidebar
  class={drawerHidden ? 'hidden' : ''}
  activeUrl={mainSidebarUrl}
  activeClass="flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700"
  asideClass="fixed inset-0 z-30 flex-none h-full w-full overflow-auto lg:w-64 lg:h-auto border-e border-gray-200 dark:border-gray-600 lg:overflow-y-visible pt-8 lg:pt-24 lg:block"
  >
  <SidebarWrapper class="pt-14 pb-12 lg:pt-0 bg-white dark:bg-dark">
    <SidebarGroup class="pt-2">

      <SidebarItem label="Network" {spanClass}>
        <svelte:fragment slot="icon">
            <Icon name="Network" size="5" />
        </svelte:fragment>
        <svelte:fragment slot="subtext">
          <Select 
            class={`
              max-w-24 px-2 py-1 ms-3 text-xs font-medium text-gray-800 
              bg-orange-200 rounded-full border-orange-300 dark:bg-gray-700 dark:text-gray-300`
            }
            placeholder="" 
            bind:value={chainId}>
            {#each (chains || []) as achain}
              <option selected value={achain.chainId}>{achain.name}</option>
            {/each} 
          </Select>
        </svelte:fragment>  
      </SidebarItem>

    </SidebarGroup>

    <SidebarGroup border class="pt-6 mt-4">

      <SidebarItem label="Profile" {spanClass} {itemClass} class="lg:hidden" href="/account">
        <svelte:fragment slot="icon">
          <Icon name="Profile" size="5" />
        </svelte:fragment>
        <svelte:fragment slot="subtext">
          <GradientAvatar initials={initials} gradient={buildGradient(initials)} />
        </svelte:fragment>  
      </SidebarItem>

      <SidebarItem label="Home" {spanClass} {itemClass} href="/home">
        <svelte:fragment slot="icon">
          <Icon name="Home" size="5" />
          <!-- <HouseSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> -->
        </svelte:fragment>
      </SidebarItem>

      <SidebarItem label="My Workers" {spanClass} {itemClass} href="/my-workers">
        <svelte:fragment slot="icon">
          <Icon name="MyCredentials" size="5" />
        </svelte:fragment>
      </SidebarItem>

      <SidebarItem label="My Jobs" {spanClass} {itemClass} href="/my-jobs">
        <svelte:fragment slot="icon">
          <Icon name="Activity" size="5" />
        </svelte:fragment>
      </SidebarItem>

      <SidebarItem label="Explore" {spanClass} {itemClass} href="/explorer">
        <svelte:fragment slot="icon">
          <Icon name="MyCommunities" size="5" />
          <!-- <ShapesSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> -->
        </svelte:fragment>
      </SidebarItem>
    </SidebarGroup>

    <SidebarGroup border>
      <SidebarItem label="Billing" {spanClass} {itemClass} href="/billing">
        <svelte:fragment slot="icon">
          <Icon name="MyClaims" size="5" />
          <!-- <BookmarkSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> -->
        </svelte:fragment>
      </SidebarItem>

      <SidebarItem label="Support" {spanClass} href="/support">
        <svelte:fragment slot="icon">
          <Icon name="Support" size="5" />
        </svelte:fragment>
      </SidebarItem>

      <SidebarItem label="Sign out" {spanClass} href="/login">
        <svelte:fragment slot="icon">
          <Icon name="Disconnect" size="5" />
        </svelte:fragment>
      </SidebarItem>
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>

<div
	hidden={drawerHidden}
	class="fixed inset-0 z-20 bg-gray-900/50 dark:bg-gray-900/60"
	on:click={closeDrawer}
	on:keydown={closeDrawer}
	role="presentation"
/>
