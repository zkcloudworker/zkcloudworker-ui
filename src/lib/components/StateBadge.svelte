<script>
    import { Badge } from "flowbite-svelte";
    import {States, toState} from "$lib/types/states";
    export let data; // State number
    const state = toState(data)
</script>


{#if state.badgeType === "info"}
<Badge  rounded color="yellow" class="text-yellow-800">
   <p class="p-2"> {state.name}</p>
</Badge>
{/if}

{#if state.badgeType === "danger"}
<Badge  rounded color="red" class="text-red-800">
    <p class="p-2"> {state.name}</p>
</Badge>
{/if}

{#if state.badgeType === "success"}
<Badge  rounded color="green" class="text-green-800">
    <p class="p-2"> {state.name}</p>
</Badge>
{/if}