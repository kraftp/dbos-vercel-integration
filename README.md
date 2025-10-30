This is a reference showing how to run long-running durable background tasks on Vercel using DBOS.

Requires Node>=22.6.0

# How to Run

1. Import this repository as a Vercel project. Connect it to a Supabase database.

2. Link this folder to your Vercel project and pull environment variables.

```
vercel link
vercel pull env .env
```

3. Launch the DBOS worker in a Vercel sandbox:

```
node --experimental-strip-types sandbox/sandbox.ts 
```

4. Open your project page on Vercel and click "Run DBOS Workflow" to start a background job with DBOS. You should see the job execute in your Vercel sandbox!