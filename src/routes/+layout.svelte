<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
  import { page } from "$app/stores";
	import modeobserver from '$lib/modeobserver';
  import { getCurrentSession} from "$lib/store/sessions";

  let activeSession = getCurrentSession(); 

	onMount(() => {
    activeSession = getCurrentSession();
    console.log("pageUrl: ", getRoute(), ", activeSession: ", activeSession);
    
    // job detail does not need login
    if (isJobRoute()) { goto(getRoute()); return; }; 

    if (! activeSession) goto("/login");
    if (activeSession) goto(getRoute());
    modeobserver();
  });
	onMount(modeobserver);

  function isJobRoute() {
    const pathname = $page.url.pathname;
    console.log("Start jobs route: ", pathname);
    return pathname.includes('/job/');
  }
  
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
  <title>zkCloudWorker</title>
	<script async src={"https://www.googletagmanager.com/gtag/js?id="+import.meta.env.VITE_GA_TAG}></script>
</svelte:head>