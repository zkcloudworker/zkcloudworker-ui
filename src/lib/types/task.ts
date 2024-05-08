export { type Task };

interface Task {
    uid: string
    planUid: string
    claimUid: string
    assigneeUid: string
    state: number
    stateDescr: string
    assignedUTC?: Date
    completedUTC?: Date
    dueUTC?: Date
    rewarded?: number
    reason?: number
    result?: string
    elector?: string
    electorUid?: string
    claimer?: string
    claimerUid?: string
    community?: string
    communityUid?: string
    claimEvidenceData?: string
    claimAccountId?: string
    claimPositiveVotes?: number
    claimNegativeVotes?: number
    claimIgnoredVotes?: number
    claimRequiredVotes?: number
    claimRequiredPositives?: number
    plan?: string
    planImage?: string
}
