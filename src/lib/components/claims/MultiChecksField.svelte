<span>
  {#each options as option, i}
    <Input
      id={`rd-${option}-${i}`}
      type="checkbox"
      label={option}
      class={className}
      bind:checked={states[i]}
      on:change={(ev) => onChange(i, states[i])}
    />
  {/each}  
  <!-- {JSON.stringify(states)} {JSON.stringify(value)} -->
</span>

<script>
  import { onMount } from "svelte";
  import { Input } from "flowbite-svelte";

  export let field, value;
  export { className as class };

  let className;
  let options = [];  
  let states = [];

  onMount(() => {
    options = field.extras.options.split(',');
    if (!value) {
      // init the value field !
      value = [];
      states = [];
      options.forEach((t) => { value.push(""); });
      options.forEach((t) => { states.push(false); });
    }
    else {
      // already has values
      states = [];
      options.forEach((t, i) => { 
        states.push(value[i] !== "" ? true : false); 
      });
    }
  })

  function onChange(i, state) {
    value[i] = state ? "" : options[i];
  }
</script>
