import type { APIResponse } from "$lib/api";
import { ActivityType } from "$lib/types";

export let activities: APIResponse = { 
  error: undefined,
  data: [
    {
      scope: 'group',
      type: ActivityType.message,
      text: 'Community X has a new member'+
        '<br>👋 Say hi to Luis Pperino Pomodoro !',
      createdUTC: new Date('2024-06-05T12:30:00.000Z'),
      state: 0,
      metadata: '{}'
    },
    {
      scope: 'private',
      type: ActivityType.transaction,
      text: `Payment sent for claim: '01234...6789'`
        +'<br>Please wait for confirmation',
      createdUTC: new Date('2024-06-05T12:30:00.000Z'),
      state: 9,
      metadata: `{ 
        "hash": "5Ju8dUC3NDZ2hNgrGS8ykBQHx7Mu76EUE3UZ2RxPm1UT7Sys9MCc", 
        "type": "zk-tx", 
        "net": "devnet"
      }`
    },
    {
      scope: 'private',
      type: ActivityType.transaction,
      text: `Payment failed for claim: '01234...6789'`
        +'<br>Please try again !',
      createdUTC: new Date('2024-06-05T12:30:00.000Z'),
      state: 12,
      metadata: `{ 
        "hash": "5Ju8dUC3NDZ2hNgrGS8ykBQHx7Mu76EUE3UZ2RxPm1UT7Sys9MCc", 
        "type": "zk-tx", 
        "net": "devnet"
      }`
    },
    {
      scope: 'private',
      type: ActivityType.transaction,
      text: `Payment received for claim <b>01234...6789</b> 
        <br>Your claim has been succesfully submitted !'`,
      createdUTC: new Date('2024-06-05T12:30:00.000Z'),
      state: 10,
      metadata: `{ 
        "hash": "5Ju8dUC3NDZ2hNgrGS8ykBQHx7Mu76EUE3UZ2RxPm1UT7Sys9MCc", 
        "type": "zk-tx", 
        "net": "devnet"
      }`
    },
    {
      scope: 'private',
      type: ActivityType.message,
      text: `Community X has a new member
        <br>👋 Say hi to Luis Pperino Pomodoro !
      `,
      createdUTC: new Date('2024-06-05T12:30:00.000Z'),
      state: 0,
      metadata: '{}'
    },
    {
      scope: 'private',
      type: ActivityType.message,
      text: 'Community X has a new member: '
        +'👋 Say hi to Luis Pperino Pomodoro !',
      createdUTC: new Date('2024-06-05T12:30:00.000Z'),
      state: 0,
      metadata: '{}'
    },
  ]
};  
