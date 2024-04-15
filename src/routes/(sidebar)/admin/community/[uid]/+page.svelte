<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Breadcrumb, BreadcrumbItem, P } from 'flowbite-svelte';
  import { MetaTag, H1 } from "$lib/components";
  
  export let data: any;
 
  let uid: string = data.uid;
  let name: string = "This is some name";
</script>

<MetaTag 
  path="/admin/community" 
  title="Socialcap" 
  subtitle="Admin Community" 
  description="" 
/>

<div class="p-4">
  <Breadcrumb class="mb-5">
    <BreadcrumbItem home href="/home">Home</BreadcrumbItem>
    <BreadcrumbItem>Admin</BreadcrumbItem>
    <BreadcrumbItem>{name}</BreadcrumbItem>
  </Breadcrumb>

  <div>
    <H1>Community Uid: {uid}</H1>
  </div>

</div>
