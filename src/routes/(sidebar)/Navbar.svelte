<script>
	import UserMenu from '$lib/components/UserMenu.svelte';
	import {
		DarkMode,
		Dropdown,
		DropdownItem,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar,
		Search
	} from 'flowbite-svelte';
	import '../../app.pcss';
	import Users from '../data/users.json';
	import Notifications from '$lib/components/NotificationList.svelte';
  import SearchList from '$lib/components/SearchList.svelte';
	export let fluid = true;
	export let drawerHidden = false;
	export let list = false;
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
	<NavContainer class="mb-px mt-px px-1" {fluid}>
		<NavBrand href="/" class={list ? 'w-60' : 'lg:w-60'}>
			<img
				src="/images/socialcap-logo.svg"
				class="me-2.5 h-10 sm:h-10"
				alt="Socialcap Logo"
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
          <Search size="md" class="mt-1 w-64 border focus:outline-none" />
        </form>
        &nbsp;
        <Notifications />
        <!-- <AppsMenu /> -->
        <!-- <DarkMode /> -->
        &nbsp;
        <UserMenu {...Users[4]} />
      </div>
    </div>
    <div class="block lg:hidden">
      <div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
        <SearchList />
        &nbsp;
        <Notifications />
        &nbsp;
        <NavHamburger
    			onClick={() => (drawerHidden = !drawerHidden)}
    			class="m-0 my-3 me-3 md:block lg:hidden"
    		/>
      </div>
    </div>  
	</NavContainer>
</Navbar>
