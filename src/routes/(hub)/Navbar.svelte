<script lang="ts">
  import { onMount } from "svelte";
  import type { User } from "$lib/types";
  import { getCurrentUser } from "$lib/store";
  import {
    DarkMode,
		Dropdown,
		DropdownItem,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar,
		Search, Badge
	} from 'flowbite-svelte';
	import '../../app.pcss';
	import Notifications from '$lib/components/common/NotificationList.svelte';
  import SearchList from '$lib/components/common/SearchList.svelte';
  import UserMenu from '$lib/components/common/UserMenu.svelte';

	export let fluid = true;
	export let drawerHidden = false;
	export let list = false;

  let profile: User | null = getCurrentUser();

  onMount(() => {
    profile = getCurrentUser();
  })
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
	<NavContainer class="mb-px mt-px px-1 py-2" {fluid}>
		<NavBrand href="/" class={list ? 'w-60' : 'lg:w-60'}>
			<img
				src="/images/zkCloudWorker-logo-horizontal.svg"
				class="me-2.5 h-12 sm:h-10"
				alt="zkCloudWorker logo"
			/>
		</NavBrand>
		<!-- <div class="hidden lg:block lg:ps-3">
			<form>
				<Search size="md" class="mt-1 w-96 border focus:outline-none" />
			</form>
		</div> -->
    <div class="hidden lg:block">
      <div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
        <form class="hidden lg:block">
          <Badge large rounded color="green" class="py-1 me-4">
            {profile?.accountId.slice(0,6)}...{profile?.accountId.slice(-6)}
          </Badge>
          <!-- <Search size="md" class="mt-1 w-64 border focus:outline-none" /> -->
        </form>
        &nbsp;
        &nbsp;
        <UserMenu 
          name={profile?.fullName  || "Account full name" } 
          email={profile?.email || "Account@email"}
        />
      </div>
    </div>
    <div class="block lg:hidden">
      <div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
        <NavHamburger
    			onClick={() => (drawerHidden = !drawerHidden)}
    			class="m-0 my-3 me-3 md:block lg:hidden"
    		/>
      </div>
    </div>  
	</NavContainer>
</Navbar>
