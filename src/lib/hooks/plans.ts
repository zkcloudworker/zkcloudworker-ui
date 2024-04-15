
import { createQuery } from '@tanstack/svelte-query'
import { getPlan, getAdminedPlans} from '$lib/api/queries';
import type { Plan } from '$lib/types/plan';

export function useGetPlan(uid: string) {
    return createQuery<Plan, Error>({
        queryKey: ['get_my_claims'],
        queryFn: () => getPlan({uid}),
      })
}

export function useGetAdminedPlans() {
  return createQuery<Plan[], Error>({
      queryKey: ['get_admined_plans'],
      queryFn: () => getAdminedPlans(),
    })
}
