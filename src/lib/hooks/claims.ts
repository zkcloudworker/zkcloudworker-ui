
import { createQuery } from '@tanstack/svelte-query'
import { getMyClaims, getClaim } from '$lib/api/queries';
import type { Claim } from '$lib/types/claim';
import type { Plan } from "$lib/types/plan";

export function useGetMyClaims() {
  return createQuery<Claim[], Error>({
    queryKey: ['get_my_claims'],
    queryFn: () => getMyClaims({}),
  })
}

export function useGetClaim(
  uid: string,
  plan?: Plan
) {
  return createQuery<Claim, Error>({
    queryKey: ['get_claim'],
    queryFn: () => getClaim({ uid: uid, plan: plan }),
  })
}
