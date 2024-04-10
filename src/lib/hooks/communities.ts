
import { createQuery } from '@tanstack/svelte-query'
import { getMyCommunities, getAllCommunities } from '$lib/api/queries';

export function useGetMyCommunities() {
    return createQuery({
      queryKey: ['my_communities'],
      queryFn: () => getMyCommunities({}),
      refetchOnMount: 'always'
    })
}

export function useGetAllCommunities() {
    return createQuery({
      queryKey: ['all_communities'],
      queryFn: () => getAllCommunities({ notJoined: true }),
      refetchOnMount: 'always'
    })
}