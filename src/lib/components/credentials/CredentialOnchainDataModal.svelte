<script lang="ts">
	// import { useGetCredentialOnchainData } from '$lib/hooks/credentials';
  import { getCredentialOnchainData } from '$lib/api/credentials-api';
	import { onMount } from 'svelte';
	import { Label, Input, Button, Modal, Checkbox, Helper } from 'flowbite-svelte';
  import ErrorOnFetch from '../common/ErrorOnFetch.svelte';
  import NoData from '../common/NoData.svelte';

	export let 
    open = false,
    onchainData: any = null;
  
	//let onchainData; // useGetCredentialOnchainData(claimUid);

	// onMount(() => {});
  function sliced(s: string): string {
    return (s.slice(0,4)+'...'+s.slice(-5))
  }
</script>

<Modal bind:open size="lg" autoclose class="w-full max-w-screen-md">
    <div class="">
      <!-- <p class="text-lg font-semibold text-black">
        Let's join <b>{title}</b>
      </p> -->
      {#if !onchainData}
        <span>Loading...</span>
      {:else}
        <div class="text-xs flex items-start justify-between">
          <p>
            <b>Account</b><br/>
            <a href={onchainData.url} class="text-sm text-blue-600">
              {sliced(onchainData.address)}
            </a>
          </p>
          <p>
            <b>Claim ID</b><br/>
            <span class="text-sm">
              {sliced(onchainData.claimUid)}
            </span>
          </p>  
          <p>
            <b>Owner</b><br/>
            <span class="text-sm">
              {sliced(onchainData.applicantUid)}
            </span>
          </p>
          <!--  
           -->
          <br>
        </div>
        <pre>
          {JSON.stringify(onchainData, null, 2)} 
        </pre>
      {/if}
    </div>

    <div class="flex items-center justify-end mt-4">
      <Button on:click={() => open = false}
				color="light" size="md" class="text-sm">
				Close
			</Button>
      &nbsp;
    </div>  
</Modal>
