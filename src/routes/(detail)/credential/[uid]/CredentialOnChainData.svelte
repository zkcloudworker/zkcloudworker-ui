<script lang="ts">
    export let data;
</script>

<div class="p-4">
    <div class="block w-full border-1 rounded px-4">
        <div class="mb-5 leading-relaxed">
            <p>
                <span class="text-bold text-sm">Account: </span>
                <span class="mt-2 text-sm text-gray-500">{data.account}</span>
            </p>
        </div>
    </div>
</div>