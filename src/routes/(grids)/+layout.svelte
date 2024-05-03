<script>
	import Footer from "../(home)/Footer.svelte";
	import Navbar from "../(home)/Navbar.svelte";
	import Sidebar from '../(home)/Sidebar.svelte';
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'

	let drawerHidden = false;

	// Create a client
	const queryClient = new QueryClient()
</script>

<header	class={
    `sticky top-0 z-40 mx-auto w-full flex-none 
    border-b border-gray-200 bg-white dark:border-gray-600 
    dark:bg-gray-800`
  }>
	<Navbar bind:drawerHidden />
</header>
<div class="overflow-hidden lg:flex">
	<QueryClientProvider client={queryClient}>
  	<Sidebar bind:drawerHidden />
  	<div class="relative h-full w-full overflow-y-auto lg:ms-64 --xl:me-32">
      <div class="max-w-screen-lg mx-auto --bg-red-200">
        <slot />
      </div>
  		<Footer />
  	</div>
	</QueryClientProvider>
</div>
