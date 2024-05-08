
<div>
    <div>

        <div>
          <Alert class="text-md bg-green-200 text-black -mx-2 px-8">
           Are you ready to submit your votes?
          </Alert>
        </div>
        <div class="p-2 leading-loose">
          Are you ready to submit it? 
          <ul class="list-disc ps-8">
            <li>Please connect your wallet</li>
            <li>We will ask you to sign the submission. This has no cost.</li>
            <li>After this your votes will be on the way</li>
            <li>Please confirm because you will not be able to resubmit.</li>
          </ul>
        </div>
  
    </div>
    
    <div class="text-end --border-t-2 mt-4 pt-4 px-4">
      <Button color="light" on:click={() => { 
         confirm = false;
         open = false;
        }}>
        No, not ready
      </Button>
      &nbsp;
      <Button color="primary" on:click={() => { 
          confirm = true;
          open = false;
        }}>
        Yes, submit it !
      </Button>
    </div>
  </div>
  
  
  <script lang="ts">
    import { onMount, tick } from "svelte";
    import { get } from "svelte/store";
    import { Alert, Button, Spinner,  } from 'flowbite-svelte';
    import { getCurrentSession, getCurrentUser } from "$lib/store";
    import { auroWallet$} from "$lib/store";
    //import { connectWallet } from "$lib/contracts/wallet";
    //import { loadPlanVotingContract } from "$lib/contracts/batch-voting/loaders";
    import { useSubmitBatchTasks } from "$lib/hooks/tasks";
	import type { Task } from "$lib/types/task";

    export let 
      open: boolean = false, // this opens/closes teh Modal Dialog
      votes: Task[] = [], // this is the data for the Votes to submit
      confirm: boolean = false; // confirm submiting
    
    let submitBatchTasks = useSubmitBatchTasks();
  
    let user ;
    let statusMessage = "", status = 0;
    let pendingTxn;
  
    const READY = 0, SENDING = 2, FAILED = 5, SENT = 3;
  
    // let open = false;
    const toggle = () => (open = !open);
    
    let openNoWalletDlg = false;
    const toggleNoWalletDlg = () => (openNoWalletDlg = !openNoWalletDlg);
  
  
    onMount(async () => {
      user = await getCurrentUser();
      // voterAccountId = user.profile.accountId;
      // console.log("MOUNTED SubmitVotesDlg")
      // await ready for payment
      // canPayNow = await isReadyForPayment();
    })
  
    async function sendThemNow() {
      statusMessage = "Starting signing ..."; await tick();
      status = READY;
  
      let wallet = get(auroWallet$);
  
      let signedData = await wallet.api.signMessage({ 
        message: JSON.stringify(votes) 
      });
      console.log("signedData", 
        signedData.publicKey, 
        signedData.signature.field, 
        signedData.signature.scalar);
      
      // we can now submit the Votes and continue the voting process
      status = SENDING; // sending ...
      await tick();
  
      let result = await $submitBatchTasks.mutateAsync({
        senderAccountId: signedData.publicKey,
        signedData: signedData
      });
  
      if (result.error) {
        status = FAILED;
        await tick();
        return;
      }
  
      status = SENT; // sent ;
      await tick();
    }
    
    function cancelVoting() {
      toggle(); // close dialog
      status = READY; // get ready for next ...
    }
  
    function doneVoting() {
      toggle(); // close dialog
      status = READY; // get ready for next ...
      setTimeout(() => window.location.reload());
    }
  </script>
  
  
  
  
  