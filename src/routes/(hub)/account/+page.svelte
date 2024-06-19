<script lang="ts">
  import { MetaTag, H1, H1Subtitle } from "$lib/components";
  import ProfileForm from "./ProfileForm.svelte";
</script>

<MetaTag 
  path = '/account' 
  description = ''
  title = 'zkCloudWorker' 
  subtitle = 'Account'
/>

<main>
  <H1>Account</H1>
  <H1Subtitle>Your account info & preferences</H1Subtitle>
  <ProfileForm />
</main>
