<script>
	import modeobserver from '$lib/modeobserver';
	import { onMount } from 'svelte';

	onMount(modeobserver);
	
	if (import.meta.env.VITE_APP_ENV === 'production') {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag(){window.dataLayer.push(arguments);}
		window.gtag('js', new Date())

		window.gtag('config', import.meta.env.VITE_GA_TAG);
	}
</script>

<slot />

<svelte:head>
	<script async src={"https://www.googletagmanager.com/gtag/js?id="+import.meta.env.VITE_GA_TAG}></script>
</svelte:head>