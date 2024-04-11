<script>
	import {
		NavBrand,
		Navbar,
	} from 'flowbite-svelte';
	import '../../app.pcss';

	export let fluid = true;
	export let list = false;
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
	<NavContainer class="mb-px mt-px px-1 justify-center" {fluid}>
		<NavBrand href="/" class={list ? 'w-60' : 'lg:w-60'}>
			<img
				src="/images/socialcap-logo.svg"
				class="me-2.5 h-10 sm:h-10"
				alt="Socialcap Logo"
			/>
		</NavBrand>
	</NavContainer>
</Navbar>
