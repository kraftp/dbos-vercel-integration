import { DBOS, WorkflowQueue } from "@dbos-inc/dbos-sdk";
import { waitUntil } from '@vercel/functions';

async function stepOne() {
  DBOS.logger.info("Step one completed!");
}

async function stepTwo() {
  DBOS.logger.info("Step two completed!");
}

async function exampleFunction() {
  await DBOS.runStep(() => stepOne(), { name: "stepOne" });
  await DBOS.runStep(() => stepTwo(), { name: "stepTwo" });
}
DBOS.registerWorkflow(exampleFunction, {
  name: "exampleWorkflow",
});
new WorkflowQueue("exampleQueue");

const databaseURL = process.env.POSTGRES_URL_NON_POOLING?.replace(
  "?sslmode=require",
  "",
);
if (!databaseURL) {
  throw Error("Database URL not defined");
}

DBOS.setConfig({
  name: "dbos-vercel-integration",
  systemDatabaseUrl: databaseURL,
  runAdminServer: false,
});
await DBOS.launch();

// Wait for either all enqueued workflows to complete or a timeout to be reached
async function waitForQueuedWorkflowsToComplete(timeoutMs: number): Promise<void> {
  const startTime = Date.now();
  const intervalMs = 1000;
  while (true) {
    if (Date.now() - startTime >= timeoutMs) {
      throw new Error(`Timeout reached after ${timeoutMs}ms - queued workflows still exist`);
    }
    const queuedWorkflows = await DBOS.listQueuedWorkflows({});
    if (queuedWorkflows.length === 0) {
      console.log('All queued workflows completed');
      return;
    }
    console.log(`${queuedWorkflows.length} workflows still queued, waiting...`);
    await new Promise<void>(resolve => setTimeout(resolve, intervalMs));
  }
}

export async function GET(request: Request) {
  waitUntil(waitForQueuedWorkflowsToComplete(60000).then(() => DBOS.shutdown()));
  return new Response(`Starting DBOS worker! Request URL: ${request.url}`);
}