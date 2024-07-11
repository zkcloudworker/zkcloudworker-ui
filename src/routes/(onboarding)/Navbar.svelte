<script>
	import {
		NavBrand,
		Navbar,
    A
	} from 'flowbite-svelte';
	import '../../app.pcss';

	export let fluid = true;
	export let list = false;
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
	<NavContainer class="mb-px mt-px px-1 py-3 justify-between" {fluid}>
		<NavBrand href="/" class={list ? 'w-60' : 'lg:w-60'}>
			<img
        src="/images/zkCloudWorker-logo-horizontal.svg"
				class="me-2.5 h-12 sm:h-12"
				alt="Socialcap Logo"
			/>
		</NavBrand>
    <div class="me-4 text-lg font-semibold">
      <A class ="ms-6" href="https://docs.zkcloudworker.com/">Docs</A>
      <A class ="ms-6" href="https://minarollupscan.com/">Explorer</A>
    </div>
	</NavContainer>
</Navbar>
