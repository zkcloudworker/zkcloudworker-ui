import { createQuery } from '@tanstack/svelte-query'
import { getMyCommunities, getAllCommunities } from '$lib/api/queries';
import type { Community } from '$lib/types/community';

export function useGetMyCommunities() {
    return createQuery<Community[], Error>({
        queryKey: ['get_my_communities'],
        queryFn: () => getMyCommunities({}),
      })
}

export function useGetAllCommunities() {
    return createQuery<Community[], Error>({
        queryKey: ['get_all_communities'],
        queryFn: () => getAllCommunities({ notJoined: true }),
      })
}