"use server";

import { DBOSClient } from "@dbos-inc/dbos-sdk";

export async function enqueueWorkflow() {
  console.log("Enqueueing DBOS workflow");
  const databaseURL = process.env.POSTGRES_URL_NON_POOLING?.replace(
    "?sslmode=require",
    "",
  );
  if (!databaseURL) {
    throw Error("Database URL not defined");
  }
  const client = await DBOSClient.create({ systemDatabaseUrl: databaseURL });
  await client.enqueue({
    workflowName: "exampleWorkflow",
    queueName: "exampleQueue",
  });
  await client.destroy();
}

export async function listWorkflows() {
  console.log("Listing DBOS workflow");
  const databaseURL = process.env.POSTGRES_URL_NON_POOLING?.replace(
    "?sslmode=require",
    "",
  );
  if (!databaseURL) {
    throw Error("Database URL not defined");
  }
  const client = await DBOSClient.create({ systemDatabaseUrl: databaseURL });
  const workflows = await client.listWorkflows({workflowName: "exampleWorkflow", sortDesc: true});
  await client.destroy();
  return workflows;
}