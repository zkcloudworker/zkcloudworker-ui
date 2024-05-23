<script lang="ts">
	import type { OnchainCredentialData } from "$lib/types";

    export let data: OnchainCredentialData;
</script>

<div class="p-4">
    <div class="block w-full border-1 rounded px-4">
        <div class="mb-5 leading-relaxed">
            <p>
                <span class="text-bold text-sm">Account: </span>
                <span class="mt-2 text-sm text-gray-500">{data.address}</span>
            </p>
            <p>
                <span class="text-bold text-sm">Claim ID: </span>
                <span class="mt-2 text-sm text-gray-500">{data.claimUid}</span>
            </p>
            <p>
                <span class="text-bold text-sm">Created by: </span>
                <span class="mt-2 text-sm text-gray-500">{data.applicantUid}</span>
            </p>
            <p>
                <span class="text-bold text-sm">Quorum: </span>
                <span class="mt-2 text-sm text-gray-500">{data.requiredQuorum} votes</span>
            </p>
            <p>
                <span class="text-bold text-sm">Required: </span>
                <span class="mt-2 text-sm text-gray-500">{data.requiredPositives} positives votes</span>
            </p>
            <p>
                <span class="text-bold text-sm">Account: </span>
                <span class="mt-2 text-sm text-gray-500">{data.address}</span>
            </p>
        </div>
    </div>
</div>