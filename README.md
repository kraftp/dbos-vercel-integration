This is a reference showing how to run durable background tasks on Vercel using DBOS.

## How it Works

The Next.js app uses a [DBOS Client](https://docs.dbos.dev/typescript/reference/client) (backed by Postgres) to enqueue workflows and display workflow status.

Periodically, a worker running in a Vercel function checks if there are any enqueued workflows and runs them.
This worker is triggered automatically by a Vercel cron, but can also be triggered through a button in the app.

## How to Run

Import this repository as a Vercel project and connect it to a Supabase database. It should just work!
