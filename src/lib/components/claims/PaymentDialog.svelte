<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button, Modal, StepIndicator } from 'flowbite-svelte';
  import type { Claim } from '$lib/types/claim';
	import type { Plan } from '$lib/types';
  import { PaymentStep, Step } from './payment-flow';
	import { getCurrentBlockchain } from '$lib/store';
  import ConfirmSubmitDialog from './ConfirmSubmitDialog.svelte';
  import ConnectWalletDialog from '../common/ConnectWalletDialog.svelte';
  import ConfirmPaymentDialog from './ConfirmPaymentDialog.svelte';
  import PaymentSentDialog from "./PaymentSentDialog.svelte";
	import { useSaveDratClaim, useUpdateClaim } from '$lib/hooks/claims';
	import { goto } from '$app/navigation';

  export let 
    open = false,
    plan: Plan,
    claim: Claim,
    isNew: boolean,
    step: number = 1,
    steps = ['1','2', '3'],
    txnId = "";

  const dispatch = createEventDispatcher();  
  async function cancelSubmit() {
    open = false;
    step = 1;
  }

  async function confirmSubmit() {
    step = PaymentStep.CONNECT_WALLET;
    open = true;
  }

  async function confirmConnect() {
    step = PaymentStep.CONFIRM_PAYMENT;
    open = true;
  }

  async function donePayment(detail: any) {
    step = PaymentStep.PAYMENT_SENT;
    txnId = detail.hash;
    open = true;
  }

  async function doneSubmit() {
    open= false;
    goto('/my-claims');
  }
</script>

<!-- 
  Modal Payments Dialogs
-->
<div>
  <Modal 
    size="md" 
    class="p-0 mx-0 w-full max-w-screen-md h-[32rem] relative"
    bind:open={open}>

    <div class="px-4 text-base">
      <div class="text-lg font-bold text-black">
        {Step[step].title}
      </div>
      <div class="text-sm  text-gray-500">
        {Step[step].description}
      </div>
      <div class="mt-6">
        <StepIndicator {steps} size="h-1.5" hideLabel={true} currentStep={step} class="py-2"/>
      </div>
    </div>

    <div class="px-4">
      {#if step === PaymentStep.CONFIRM_SUBMIT} 
        <ConfirmSubmitDialog 
          claim={claim}
          plan={plan}
          isNew={isNew}
          on:cancel={() => cancelSubmit()}
          on:done={() => doneSubmit()}
          on:submit={() => confirmSubmit()}
        />
      {/if}
  
      {#if step === PaymentStep.CONNECT_WALLET} 
        <ConnectWalletDialog 
          on:cancel={() => cancelSubmit()}
          on:continue={() => confirmConnect()}
        />
      {/if}

      {#if step === PaymentStep.CONFIRM_PAYMENT} 
        <ConfirmPaymentDialog 
          claim={claim}
          plan={plan}
          isNew={isNew}
          on:cancel={() => cancelSubmit()}
          on:done={(ev) => donePayment(ev.detail)}
        />
      {/if}

      {#if step === PaymentStep.PAYMENT_SENT} 
        <PaymentSentDialog 
          chain={getCurrentBlockchain()}
          txnId={txnId} 
          on:close={() => cancelSubmit()}
          on:done={() => doneSubmit()}
        />
      {/if}
    </div>

    <!-- <ModalHeader {toggle}>
      Payment for credential
    </ModalHeader>

    <ModalBody>
      {#if !$deployedSocialcap$}
        <p class="p-2"> 
          Please wait ... loading Snarky contracts ...
        </p>
      {/if}

      {#if $deployedSocialcap$}
        <p class="p-1">Snarky SocialcapContract is ready !</p>
      {/if}

      {#if $deployedSocialcap$ && !$auroWallet$?.connected}
        <p class="p-1">Connecting the wallet ...</p>
      {/if}

      {#if $deployedSocialcap$ && $auroWallet$?.connected && $auroWallet$?.publicKey && paymentStatus===0}
        <p class="p-1">AuroWallet is connected !</p>
        <p class="p-1">Account: {$auroWallet$?.publicKey.slice(0,6)}...{$auroWallet$?.publicKey.slice(-6)}</p>
        <p class="p-2">
          Are you ready to pay ? Claim fee for this credential is <b>{data.plan.fee}</b> MINA.
        </p>
      {/if}

      {#if paymentStatus===1}
        <p class="p-2">
          {paymentMessage}
        </p>
      {/if}

      {#if paymentStatus===2}
        <p class="p-2 text-wrap">
          Payment was sent !
          <br>
          <br>Please wait for transaction to be included... it takes some time.
          <br>
          <br>Transaction Id: <a href={`${MINAExplorer}/transaction/${pendingTxn?.hash}`}>
              {pendingTxn?.hash}
            </a>
        </p>
        <p class="p-2">
          When payment is complete, we will start voting for your claim !
        </p>
      {/if}
    </ModalBody>

    <ModalFooter class="text-center">
      {#if canPayNow && paymentStatus===0}
        <Button color="primary" on:click={payNow}>Pay now !</Button>
      {/if}
      {#if paymentStatus!==2}
        <Button color="secondary" on:click={toggle}>Cancel</Button>
      {/if}
      {#if paymentStatus===2}
        <Button color="success" on:click={submitClaimNow}>Submit it !</Button>
      {/if}
    </ModalFooter> -->

    <!-- <Modal isOpen={openNoWalletDlg} toggle={toggleNoWalletDlg}>
      <ModalHeader toggle={toggleNoWalletDlg}>
        Auro wallet is not installed
      </ModalHeader>
      <ModalBody>
        Please install the Auro wallet for paying your claims,
      </ModalBody>
      <ModalFooter class="text-center">
        <Button color="secondary" on:click={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal> -->

  </Modal>
</div>

<!--
//   import { onMount, tick } from "svelte";
//   import { get } from "svelte/store";
//   import { Button } from 'sveltestrap';
//   import { Modal, ModalBody,ModalFooter,ModalHeader } from 'sveltestrap';
//   import Section from "@components/Section.svelte";
//   import BackButton from "@components/buttons/BackButton.svelte";
//   import SubmitButton from "@components/buttons/SubmitButton.svelte";
//   import DetailPageContent from "@components/DetailPageContent.svelte";
//   import DetailPageHeader from "@components/DetailPageHeader.svelte";
//   import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
//   import StateBadge from "@components/badges/StateBadge.svelte";
//   import { prettyDate } from "@utilities/datetime";
//   import { AppStatus } from "@utilities/app-status";
//   import { addClaim, updateClaim, updateProfile, submitClaim } from "@apis/mutations";
//   import { DRAFT, CANCELED, CLAIMED } from "@models/states";
//   import EvidenceForm from "./EvidenceForm.svelte";
//   import { isAllValid } from "./validations";
//   import 
//     MINAExplorer, loadSocialcapContract, connectWallet, payForCredentialClaim, 
//     auroWallet$, deployedSocialcap$ 
//   } from "$lib/contracts/claim-voting/helpers";
// 	
//   export let data; // this is the data for this MasterPlan and empty Claim
// 
//   let user = getCurrentUser(), firstTime = false;
// 
//   let open = false;
//   const toggle = () => (open = !open);
//   
//   let openNoWalletDlg = false;
//   const toggleNoWalletDlg = () => (openNoWalletDlg = !openNoWalletDlg);
// 
//   let paymentMessage = "", paymentStatus = 0, canPayNow = false;
//   let pendingTxn;
// 
//   onMount(() => {
//     user = getCurrentUser();
//     firstTime = false; //isFirstTimeUser(user); 
//   })
// 
//   let loading = false;
// 
//   /** Data validation **/
// 
//   const required = (t) => 
//     `<span class="text-warning fw-bold">${t ? `Required` : ``}</span>.`;
// 
//   function dataIsOk(data) {
//     return isAllValid(
//       data.plan.evidence, 
//       data.claim.evidenceData
//     )
//   }
// 
//   /**
//    * Updates the Claim before doing any other action, such as 
//    * paying and then submiting the claim.
//    */
//   async function updateTheDraft() {
//     if (!dataIsOk(data)) {
//       AppStatus.error("Please fill all required fields !")
//       return false;
//     }
// 
//     let updated;
//     if (data.isNew) {
//       updated = await addClaim(data.claim);
//     }
//     else {
//       updated = await updateClaim(data.claim);
//     }
// 
//     return updated;
//   }
// 
//   /**
//    * This just saves the claim draft to the server and goes
//    * bak to the previous page.
//    */
//   async function saveDraft() {
//     loading = true;
//     let updated = await updateTheDraft();
//     loading = false;
//     if (updated) 
//       history.back();
//   }
// 
//   /**
//    * First saves the draft and then asks for payment before submiting 
//    * the claim to the API and starting the MINA transaction.
//    * The Payer is the logged user who needs to pay for the Credential, and
//    * is transfered to the Socialcap (main) account.
//    * The new Claim deployment is payed by the SocialcapFeePayer account.
//    */
//   async function saveDraftAndSubmit() {
//     let updated = await updateTheDraft();
//     if (! updated)
//       return ; // saving the draft failed, we can not continue ...
// 
//     // await ready for payment
//     canPayNow = await isReadyForPayment();
// 
//     // save draft again with the accountId == sender public key
//     let sender = get(auroWallet$)?.sender?.toBase58();
//     await updateProfileAccountId(sender);
//   }
// 
//   async function isReadyForPayment() {
//     paymentStatus = 0;
//     toggle(); // open dialog
// 
//     let isSnarkyLoaded = get(deployedSocialcap$) ;
//     if (!isSnarkyLoaded) {
//       isSnarkyLoaded = await loadSocialcapContract();
//     }
// 
//     let hasWallet = false;
//     if (isSnarkyLoaded) {
//       hasWallet = await connectWallet();
//     }
// 
//     if (!hasWallet) {
//       toggleNoWalletDlg();
//     }
// 
//     return (hasWallet && isSnarkyLoaded) ;
//   }
// 
//   async function payNow() {
//     paymentMessage = "Starting payment transaction ..."; await tick();
//     paymentStatus = 1; // started
// 
//     let result = await payForCredentialClaim(data.plan.fee);
// 
//     if (!result.success) {
//       paymentMessage= "Payment was not done: "+result.error; await tick();
//       return;
//     }
//     pendingTxn = result.pendingTxn;
//     paymentStatus = 2; // sent ;
//     await tick();
// 
//     // we can now submit the Claim and start the voting process
//     // the server will wait till the transaction si finished
//   }
// 
//   async function updateProfileAccountId(sender) {
//     if (! sender) return;
//     let user = await getCurrentUser();
//     await updateProfile({ uid: user.uid, accountId: sender });
//   }
// 
//   async function submitClaimNow() {
//     let params = data.claim;
//     params.extras = {
//       transaction: JSON.stringify(pendingTxn)
//     };
//     let updated = await submitClaim(params);
//     if (updated) 
//       history.back();
//   }  
-->