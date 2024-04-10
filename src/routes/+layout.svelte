<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import modeobserver from '$lib/modeobserver';
  import { getCurrentSession, getDefaultSession } from "$lib/store/sessions";

  let activeSession = getCurrentSession(); 

	onMount(() => {
    activeSession = getCurrentSession();
    if (! activeSession) goto("/login");
    if (activeSession) goto("/home");
    modeobserver();
  });
</script>

<slot />
