This folder shows how to implement a DBOS worker in a Vercel sandbox instead of with Vercel functions.

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

4. Open your project page on Vercel and click "Enqueue Workflow" to start a background job with DBOS. You should see the job execute in your Vercel sandbox!
