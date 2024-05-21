
import { createQuery } from '@tanstack/svelte-query'
import { getMyCredentials, getCommunityCredentials, getCredential, getCredentialDataOnChain } from '$lib/api/queries';
import type { Credential } from '$lib/types/credential';

export function useGetMyCredentials() {
  return createQuery<Credential[], Error>({
    queryKey: ['get_my_credentials'],
    queryFn: () => getMyCredentials({}),
  })
}

export function useGetCommunityCredentials(communityUid: string) {
  return createQuery<Credential[], Error>({
    queryKey: ['get_community_credentials', communityUid],
    queryFn: () => getCommunityCredentials(communityUid),
  })
}

export function useGetCredential(uid: string) {
  return createQuery<Credential, Error>({
    queryKey: ['get_credential', uid],
    queryFn: () => getCredential(uid),
  })
}

export function useGetCredentialDataOnChain(uid: string) {
  return createQuery<Credential, Error>({
    queryKey: ['get_credential_data_on_chain', uid],
    queryFn: () => getCredentialDataOnChain(uid),
  })
}
