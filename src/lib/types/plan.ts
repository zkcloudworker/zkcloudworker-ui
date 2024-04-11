export type { Plan };

interface Plan {
    uid: string
    communityUid: string
    state: number
    name: string
    alias?: string
    description?: string
    image?: string
    template?: string
    evidence?: string
    strategy?: string
    createdUTC: Date
    updatedUTC: Date
    approvedUTC?: Date
    fee?: number
    rewardsShare?: number
    communityShare?: number
    protocolShare?: number
    total?: number
    available?: number
    expiration?: number
    revocable?: boolean
    startsUTC?: Date
    endsUTC?: Date
}