<script>
    import { Badge } from "flowbite-svelte";
    import {States, toState} from "$lib/types/states";
    export let data; // State number
    let clazz;
    export { clazz as class };
    console.log("clazz", clazz)
    const state = toState(data)     
</script>


{#if state.badgeType === "info"}
<Badge rounded color="yellow" class={`text-yellow-800 ${clazz || ''}`}>
   <p class="py-1 px-3 text-xs"> {state.name}</p>
</Badge>
{/if}

{#if state.badgeType === "danger"}
<Badge rounded color="red" class={`text-red-800 ${clazz || ''}`}>
    <p class="py-1 px-3 text-xs"> {state.name}</p>
</Badge>
{/if}

{#if state.badgeType === "success"}
<Badge rounded color="green" class={`text-green-800 ${clazz || ''}`}>
    <p class="py-1 px-3 text-xs"> {state.name}</p>
</Badge>
{/if}