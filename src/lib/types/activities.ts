
export { 
  type Activity,
  ActivityScope,
  ActivityType 
}

interface Activity {
    uid: string
    scope: ActivityScope // all, community, private
    type: ActivityType // transaction, message, request
    text: string
    state: number
    createdUTC: Date
    metadata: string
}

enum ActivityType {
  transaction,// involves some MINA transaction
  message,    // just informative
  request     // needs some action from user or admin
}

enum ActivityScope {
  all,
  group,
  private
}
