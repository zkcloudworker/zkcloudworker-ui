<script lang="ts">
  import { Card, Alert  } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import Footer from "./Footer.svelte";
  
  export let
    title: string = "", 
    subtitle: string = "",
    alert: string | null = null,
    status: string = "WAIT"; 

  const ALERT_COLORS: any = {
    'WAIT': 'light',
    'WARNING': 'yellow',
    'ERROR': 'red',
    'SUCCESS': 'green'
  }  

  $: alertColor = ALERT_COLORS[status] || 'light';
</script>

<main class="h-screen flex flex-col justify-center items-center pb-48">
  <div class="p-4 w-full max-w-lg">
    {#if alert}
      <Alert border color={alertColor} class="p-6">
        <InfoCircleSolid slot="icon" class="w-6 h-6" />
        <span class="text-md font-semibold text-gray-900">
          <slot name='alert'>
            Alert messages here ...
          </slot>
        </span>
      </Alert>  
    {/if}
  </div>

  <div class="px-0 md:px-4 flex justify-center w-screen">
    <Card size="md" class="max-w-lg">
      <form class="p-4">
        <h3 class="m-0 p-0 text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p class="m-0 p-0 mt-1.5 font-normal text-sm text-gray-500 dark:text-gray-200">
          {subtitle}
        </p>

        <slot name="inputs">
          Input fields go here
        </slot>  

        <div class="mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <slot name="buttons">
        </slot>

      </form>
    </Card>
  </div>

  <div class="">
    <Footer />
  </div>
</main>