
import { createQuery } from '@tanstack/svelte-query'
import { getMyCredentials, getCommunityCredentials, getCredential, getCredentialOnchainData } from '$lib/api/queries';
import type { Credential, OnchainCredentialData } from '$lib/types/credential';

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

export function useGetCredentialOnchainData(claimUid: string) {
  return createQuery<OnchainCredentialData, Error>({
      queryKey: ['get_credential_onchain_data'],
      queryFn: () => getCredentialOnchainData({ claimUid: claimUid }),
    })
}
