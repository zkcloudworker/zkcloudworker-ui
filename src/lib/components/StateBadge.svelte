<script>
    import { Badge } from "flowbite-svelte";
    import {States, toState} from "$lib/types/states";
    let clazz = "";
    export { clazz as class };
    export let data; // State number

    console.log("clazz", clazz)
    const state = toState(data)     
</script>


{#if state.badgeType === "info"}
<Badge rounded color="yellow" class={`text-yellow-800 ${clazz || ''}`}>
   <p class="py-1 px-1 text-xs"> {state.name}</p>
</Badge>
{/if}

{#if state.badgeType === "danger"}
<Badge rounded color="red" class={`text-red-800 ${clazz || ''}`}>
    <p class="py-1 px-2 text-xs"> {state.name}</p>
</Badge>
{/if}

{#if state.badgeType === "success"}
<Badge rounded color="green" class={`text-green-800 ${clazz || ''}`}>
    <p class="py-1 px-2 text-xs"> {state.name}</p>
</Badge>
{/if}