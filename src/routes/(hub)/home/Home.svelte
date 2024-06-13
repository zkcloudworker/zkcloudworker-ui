<script lang="ts">
  import { Card, Button } from "flowbite-svelte";
</script>

<div class="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">

  <Card size="none" padding="xl">
    <p class="text-sm text-gray-400">Your current balance</p>
    <div class="flex items-baseline justify-between text-gray-900 dark:text-white">
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Total</h5>
        <span class="text-5xl font-extrabold tracking-tight text-green-500">49</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400">$MINA</div>
      </div>
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Used</h5>
        <span class="text-xl font-semibold"></span>
        <span class="text-5xl font-extrabold tracking-tight text-red-500">30</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400">$MINA / month</div>
      </div>
    </div>
    <div class="mt-8">
      <Button class="no-w-full">Top up</Button>
    </div>
  </Card>

  <Card size="none" padding="xl">
    <p class="text-sm text-gray-400">Your monthly usage</p>
    <div class="flex items-baseline justify-between text-gray-900 dark:text-white">
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Memory</h5>
        <span class="text-5xl font-extrabold tracking-tight">49</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400">$MINA</div>
      </div>
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Elapsed Time</h5>
        <span class="text-xl font-semibold"></span>
        <span class="text-5xl font-extrabold tracking-tight">30</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400">$MINA / month</div>
      </div>
    </div>
    <div class="mt-8">
      &nbsp;
    </div>
  </Card>

  <Card size="none"  padding="xl">
    <p class="text-sm text-gray-400">Active workers</p>
    <div class="flex items-baseline justify-between text-gray-900 dark:text-white">
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Run</h5>
        <span class="text-5xl font-extrabold tracking-tight">2</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400">this month</div>
      </div>
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Deployed</h5>
        <span class="text-xl font-semibold"></span>
        <span class="text-5xl font-extrabold tracking-tight">4</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400"></div>
      </div>
    </div>
  </Card>

  <Card size="none" padding="xl">
    <p class="text-sm text-gray-400">Jobs</p>
    <div class="flex items-baseline justify-between text-gray-900 dark:text-white">
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Running</h5>
        <span class="text-5xl font-extrabold tracking-tight">12</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400">now</div>
      </div>
      <div>
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Finished</h5>
        <span class="text-xl font-semibold"></span>
        <span class="text-5xl font-extrabold tracking-tight">60</span>
        <div class="ms-1 text-xs font-normal text-gray-500 dark:text-gray-400">this month</div>
      </div>
    </div>
  </Card>
</div>
