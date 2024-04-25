import { createQuery, useQueryClient, createMutation } from '@tanstack/svelte-query'
import { getMyCommunities, getAllCommunities, getCommunity } from '$lib/api/queries';
import type { Community, NewCommunity } from '$lib/types/community';
import { createCommunity } from '$lib/api/communities-api';

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

export function useGetMyAdminedCommunities() {
    return createQuery<Community[], Error>({
        queryKey: ['get_my_admined_communities'],
        queryFn: () => getMyCommunities({ admined: true }),
      })
}

export function useGetAllCommunities() {
    return createQuery<Community[], Error>({
        queryKey: ['get_all_communities'],
        queryFn: () => getAllCommunities({ notJoined: true }),
      })
}

export function useCreateCommunity() {
  const client = useQueryClient();
  return createMutation({
    mutationFn: createCommunity,
    // Always refetch after error or success:
    onSettled: () => {
      client.invalidateQueries({ queryKey: ['get_my_communities'] })
      client.invalidateQueries({ queryKey: ['get_all_communities'] })
      client.invalidateQueries({ queryKey: ['get_my_admined_communities'] })
    },
  })
}