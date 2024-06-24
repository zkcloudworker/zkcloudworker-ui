<script lang="ts">
  import { Card, Alert  } from "flowbite-svelte";
  import { InfoCircleSolid, CheckCircleSolid } from "flowbite-svelte-icons";
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

<main class="h-screen mx-2 flex flex-col justify-start items-center">
  <div class="mt-8">
    &nbsp;
  </div>

  <div class="pb-4 flex justify-center w-full">
    {#if alert}
      <Alert border color={alertColor} class="p-6 w-full md:w-[36rem]">
        <InfoCircleSolid slot="icon" class="w-6 h-6" />
        <span class="text-md font-semibold text-gray-900">
          <slot name='alert'>
            {alert}
          </slot>
        </span>
      </Alert>  
    {/if}
  </div>

  <div class="px-0 md:px-0 flex justify-center w-full md:w-[36rem]">
    <Card size="md" class="p-0">
      <form class="pt-4 px-2">
        <h3 class="m-0 p-0 text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p class="m-0 p-0 mt-1.5 font-normal text-sm text-gray-500 dark:text-gray-200">
          {subtitle}
        </p>

        <slot name="inputs">
          Input fields go here
        </slot>  

        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <slot name="buttons">
        </slot>

      </form>
    </Card>
  </div>

  <div class=" w-full md:w-[36rem]">
    <Footer />
  </div>

  <p class="h-32">
    &nbsp;
    <!-- 
    need to leave enough space in bottom 
    so we allow a place for the top status area 
    -->
  </p>
</main>