export type State = {
    name: string
    value: number,
    badgeType?: "info" | "success" | "danger"
}

export const States: State[] = [
    {
        name: 'None',
        value: 0,
        badgeType: "info"
    },  
    {
        name: 'Draft',
        value: 1,
        badgeType: "info"
    },
    {
        name: 'Cancelled',
        value: 2,
        badgeType: "danger"
    },
    {
        name: 'Revision',
        value: 3,
        badgeType: "info"
    },
    {
        name: 'Claimed',
        value: 4,
        badgeType: "success"
    },
    {
        name: 'Voting',
        value: 6,
        badgeType: "info"
    },
    {
        name: 'Assigned',
        value: 7,
        badgeType: "success"
    },
    {
        name: 'Active',
        value: 8,
        badgeType: "success"
    },
    {
        name: 'Waiting',
        value: 9,
        badgeType: "info"
    }, 
    {
        name: 'Done',
        value: 10,
        badgeType: "success"
    },
    {
        name: 'Ignored',
        value: 11,
        badgeType: "danger"
    },
    {
        name: 'Unpaid',
        value: 12,
        badgeType: "danger"
    },
    {
        name: "Failed",
        value: 13,
        badgeType: "danger"
    },
    {
        name: 'Rejected',
        value: 19,
        badgeType: "danger"
    },
    {
        name: 'Approved',
        value: 20 ,
        badgeType: "success"
    },
    {
        name: "Tallying",
        value: 21,
        badgeType: "info"
    },
    {
        name: "Unknown",
        value: 99,
        badgeType: "info"
    }
]

export function toState(state: number) {
    return States.find(s => s.value === state)
}