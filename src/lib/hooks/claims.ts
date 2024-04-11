
import { createQuery } from '@tanstack/svelte-query'
import { getMyClaims } from '$lib/api/queries';
import type { Claim } from '$lib/types/claim';

export function useGetMyClaims() {
    return createQuery<Claim[], Error>({
        queryKey: ['get_my_claims'],
        queryFn: () => getMyClaims({}),
      })
}
