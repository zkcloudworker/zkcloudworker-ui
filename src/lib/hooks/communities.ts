import { createQuery } from '@tanstack/svelte-query'
import { getMyCommunities, getAllCommunities, getCommunity } from '$lib/api/queries';
import type { Community } from '$lib/types/community';

export function useGetCommunity(uid: string) {
  return createQuery<Community | null, Error>({
      queryKey: ['get_community'],
      queryFn: () => getCommunity({uid: uid}),
    })
}

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