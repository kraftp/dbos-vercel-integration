This is a reference showing how to run durable background tasks on Vercel using DBOS.

Requires Node>=22.6.0

## How it Works

There are three components:

1. A Next.js app, hosted on Vercel.

2. A worker that executes durable background tasks, hosted in a Vercel sandbox.

3. A Postgres database for durability, hosted on Supabase using the Vercel integration.

The Next.js app enqueues durable background tasks using a DBOS client (backed by Postgres). The worker runs DBOS, dequeueing and executing background tasks and recovering them if they fail.

## How to Run

1. Import this repository as a Vercel project. Connect it to a Supabase database.

2. Link this folder to your Vercel project and pull environment variables.

```
vercel link
vercel env pull .env
```

3. Launch a DBOS worker in a Vercel sandbox:

```
node --experimental-strip-types sandbox/sandbox.ts 
```

4. Open your project page on Vercel and click "Run DBOS Workflow" to start a background job with DBOS. You should see the job execute in your Vercel sandbox!