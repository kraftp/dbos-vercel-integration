"use server";

import { DBOSClient } from "@dbos-inc/dbos-sdk";

export async function runDBOSWorkflow() {
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
