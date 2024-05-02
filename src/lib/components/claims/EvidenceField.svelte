<script lang="ts">
	import { Label, Input, Textarea, Button, Modal, Checkbox, Helper } from 'flowbite-svelte';
  import { isValid, hasMessage } from './validations';
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import MultiChecksField from "./MultiChecksField.svelte";
  import Tags from "svelte-tags-input";
  import Markdown from 'svelte-exmarkdown';

  export let 
    field: any, 
    index: number, 
    data: any;

  const plugins = [gfmPlugin()];  
  let previewOn = false;
  let buffer = data[index].value;

  function validateField(e: any) {
    const value = e.target.value;
    const input = e.data;
    data[index].value = value;                  
    console.log("after: ", data[index].value);
    e.target.value = value;
  }

  /** Resize textareas **/

  function initialTextareaSize(value: any) {
    let lines = (value || "").split("\n");
    // console.log("initialTextareaSize", lines, lines.length);
    return (lines.length || 2) ; 
  }

  function resizeTextarea(inner: any) {
    inner.style.height = 'auto';
    inner.style.height = 4 + inner.scrollHeight + 'px';
    // console.log("resizeTextarea height=", inner, inner.style.height);
  };
</script>

<div class="no-border px-0 mb-6">
  {#if field.label}
    <Label for="exampleText" class="flex justify-between text-sm font-bold text-gray-900 pb-1">
      <span>
        {field.label}
        <span class="">
          {field.required ? "*" : ""}
        </span>
      </span>
    </Label>
  {/if}

  {#if field.type === "text"}
    <Input 
      notype="text" 
      id={field.sid} 
      name={field.sid} 
      bind:value={data[index].value}
      size="lg"
      class=""
      no-invalid={!isValid(field, data[index].value)}
      no-feedback={hasMessage(field, data[index].value)}
    />
  {/if}

  <!-- {#if field.type === "note"}
    <textarea 
      id={field.sid} 
      name={field.sid} 
      required={field.required}
      class="border-gray-400 text-lg block rounded-md leading-relaxed w-full"
      on:input={(e) => { validateField(e); resizeTextarea(field.inner); }}
      bind:value={buffer}
      />
      <!-- bind:inner={field.inner} 
        rows={initialTextareaSize(buffer)}
        bind:value={data[index].value}
      invalid={!isValid(field, data[index].value)}
      feedback={hasMessage(field, data[index].value)} 
  {/if} -->

  {#if field.type === "note"}
    <Textarea 
      size="lg" 
      id={field.sid} 
      name={field.sid} 
      bind:value={data[index].value}
      class="text-xl border-gray-400 py-8"
      rows={initialTextareaSize(data[index].value)}
      bind:inner={field.inner} 
      on:input={() => resizeTextarea(field.inner)}
      invalid={!isValid(field, data[index].value)}
      feedback={hasMessage(field, data[index].value)}
      />
  {/if}

  {#if field.type === "radio"}
    <div class="ms-4">
      {#each field.extras.options.split(',') as option, i}
        <Input
          id={`rd-${option}-${i}`}
          type="radio"
          value={option}
          label={option}
          bind:group={data[index].value}
          class="px-2 py-1 mt-1"
        />
      {/each}  
    </div> 
    {#if (!isValid(field, data[index].value))}
      <span class="text-danger mt-0 p-0 fs-sm">
        {hasMessage(field, data[index].value)}
      </span><br>
    {/if}
  {/if}

  {#if field.type === "checks"}
    <div class="ms-4">
      <MultiChecksField 
        field={field}
        bind:value={data[index].value}
        class="px-2 py-1 mt-1"
      />
    </div> 
    {#if (!isValid(field, data[index].value))}
      <span class="text-danger mt-0 p-0 fs-sm">
        {hasMessage(field, data[index].value)}
      </span><br>
    {/if}
  {/if}

  {#if field.type === "links"}
     <Tags 
      addKeys={[13,9]}
      id={field.sid} 
      name={field.sid} 
      allowPaste={true}
      bind:tags={data[index].value}
      class="rounded-1 px-2 py-1 mb-1  text-break word-wrap"
    />
    {#if (!isValid(field, data[index].value))}
      <span class="text-danger mt-0 p-0 fs-sm">
        {hasMessage(field, data[index].value)}
      </span><br>
    {/if}
  {/if}

  {#if field.type === "files"}
    <Tags 
      addKeys={[13,9]}
      id={field.sid} 
      name={field.sid} 
      allowPaste={true}
      bind:tags={data[index].value}
      class="rounded-1 px-2 py-1 mb-1"
    />
    {#if (!isValid(field, data[index].value))}
      <span class="text-danger mt-0 p-0 fs-sm">
        {hasMessage(field, data[index].value)}
      </span><br>
    {/if}
  {/if}

  {#if field.type === "images"}
    <Tags 
      addKeys={[13,9]}
      id={field.sid} 
      name={field.sid} 
      allowPaste={true}
      bind:tags={data[index].value}
      class="rounded-1 px-2 mb-1"
    />
    {#if (!isValid(field, data[index].value))}
      <span class="text-danger mt-0 p-0 fs-sm">
        {hasMessage(field, data[index].value)}
      </span><br>
    {/if}
  {/if}
  
  {#if field.description && field.type !== 'remark'}
    <span class="text-sm text-gray-500">
      {@html field.description}              
    </span>
  {/if}

  {#if field.type === 'remark'}
    <p class="text-gray-600 leading-relaxed">
      <Markdown md={field.description} {plugins} />
    </p>
  {/if}
</div>