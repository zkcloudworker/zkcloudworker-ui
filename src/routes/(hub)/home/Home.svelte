<script lang="ts">
  import { Card, Button } from "flowbite-svelte";
</script>

<div class="mt-8 space-y-4">
  <Card padding="xl">
    <p class="text-sm text-gray-400">Your current balance</p>
    <div class="flex items-baseline justify-between text-gray-900 dark:text-white">
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Total</h5>
        <span class="text-5xl font-extrabold tracking-tight">49</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400">$MINA</div>
      </div>
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Used</h5>
        <span class="text-xl font-semibold"></span>
        <span class="text-5xl font-extrabold tracking-tight">30</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400">$MINA / month</div>
      </div>
    </div>
    <div class="mt-8">
      <Button class="w-full">Top up</Button>
    </div>
  </Card>

  <Card>
    Active workers
  </Card>

  <Card>
    Total Jobs (this month)
  </Card>

  <Card>
    Usage (this month)
  </Card>
</div>
