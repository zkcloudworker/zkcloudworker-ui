# S7. Web app 

**For billing panel and workers deployments and status**

## Issues

### July 12 

- PRIORITY - `TODO` Fix BALANCE according to current status ...

### June 24 (meeting recap)

**Tables and Indexes**

`accounts` table = `id` here is the `userId`, which is also user's publicKey in MINA

`charges` index: `id` corresponds to the `userId`

`zk-jobs` index: `id` corresponds to the `userId`

`transactions` index: will add `id` (related to userId) and `jobId` 

`workers` table:  `id` corresponds to the `userId`

**MyWorkers:**

A given user can have workers deployed by himself and workers deployed by others that he used. 

- `DONE` Deployed by me: workers he "deployed". Path = userId > workers.id > workers.repo
- `DONE` Used by me: workers he "used". Path =  userId > jobs.id > jobs.repo > workers.repo
- `DONE` We will show the two and provide a filter: All | Deployed | Used
- `DONE` Clicking on a worker sends to MyJobs filtered by the worker repo.

**MyJobs:**

 NOTE: ONLY shows jobs I run, either deployed by me or by others.

- Path = userId > jobs.id. 
- `DONE` We will provide filter: "All | Deployed by me | Deployed by others".
- `DONE` "Deployed by me": will show jobs where the repo is one of my deployed repos,
- `DONE` "Deployed by others": will show jobs where the repo is NOT one of my deployed repos.
- `DONE` We can filter by repo using the search input.
- `DONE` We will show transactions related to a job by expanding/clicking the job, and each transaction will have the corresponding minascan url and the related metadata. 
- `?` Needs a filter for Dates ?
- Needs a filter by chain

**Explorer:**

- `DONE` NOTE: Explorer lets explore jobs "run by other people", with workers that could have been deployed by me or other people. 
- `DONE` Will show all jobs from all users and repos, BUT not my own jobs.
- `DONE` We will provide filter: "All | Deployed by".
- `DONE` "Deployed by me": shows jobs of workers he "deployed" but others are using. Path = userId > workers.id > workers.repo > jobs.repo
- Needs a filter for Dates ?
- `DONE` We will show transactions related to a job by expanding/clicking the job, and each transaction will have the corresponding minascan url and the related metadata
- `?` Needs a filter for Dates ?
- Needs a filter by chain

**Topup:**

- `DONE`Topup will transfer funds from the userId account to our MINA account: `B62qqYBxenUcYTRmf4gE3nEjMVHnpqFNHfiHWFDLGm6EKuR6XhYUWXd`
- `DONE`Changes in balance may take some minutes (~ 10 Mins?). Give warning about this !

**Billings**

- `DONE` `charges`index now includes `amount`, calculated by `MS_PER_MINA = 1000000`, meaning that 1 MINA will pay for 1_000_000 ms of billedTime.
- `DONE` Add Topup here.

**Profile**

- `DONE` Add Discord id in the Profile page
- `DONE` Always sign with wallet both for login and signup.
- `DONE` Add JWT generation 

**Dashboard**

- `DONE` Fix BALANCE and cards according to current status ...

### Support

- `DONE`Add discord channels
- `DONE`Add email support@zkcloudworker.com
- `DONE`Refer to documents site for FAQ.
