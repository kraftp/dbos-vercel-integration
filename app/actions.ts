"use server";

import { DBOSClient } from "@dbos-inc/dbos-sdk";
import { Pool } from "pg";

export async function runDBOSWorkflow() {
  console.log("Calling runDBOSWorkflow");
  const databaseURL = process.env.POSTGRES_URL_NON_POOLING?.replace('?sslmode=require', '');
  if (!databaseURL) {
    throw Error("Database URL not defined");
  }
  console.log("Creating DBOSClient")
  let pool = new Pool({ connectionString: databaseURL });
  const client = await DBOSClient.create({systemDatabaseUrl: databaseURL, systemDatabasePool: pool});
  console.log("Enqueueing DBOS workflow")
  client.enqueue({
        workflowName: 'exampleWorkflow',
        queueName: 'exampleQueue',})
  console.log("Workflow enqueued!")
}
