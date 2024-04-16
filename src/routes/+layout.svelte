<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
  import { page } from "$app/stores";
	import modeobserver from '$lib/modeobserver';
  import { getCurrentSession, getDefaultSession } from "$lib/store/sessions";

  let activeSession = getCurrentSession(); 

	onMount(() => {
    activeSession = getCurrentSession();
    if (! activeSession) goto("/login");
    if (activeSession) goto(getRoute());
    console.log("pageUrl=", getRoute())
    modeobserver();
  });
	onMount(modeobserver);
	
  function getRoute() {
    const pathname = $page.url.pathname;
    const search = new URLSearchParams($page.url.search).toString();
    return pathname + (search ? `?${search}` : '');    
  }

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