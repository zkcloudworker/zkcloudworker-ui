
export { 
  type Activity,
  ActivityScope,
  ActivityType 
}

interface Activity {
    uid: string
    scope: ActivityScope // all, community, private
    type: ActivityType // transaction, message
    text: string
    state: number
    createdUTC: Date
    metadata: string
}

enum ActivityType {
  transaction = "Transaction", 
  message = "Message"
}

enum ActivityScope {
  "all",
  "group",
  "private"
}
