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

async function waitForQueuedWorkflowsToComplete(timeoutMs: number): Promise<void> {
  const startTime = Date.now();
  const intervalMs = 1000; // Poll every second

  while (true) {
    // Check if timeout has been reached
    if (Date.now() - startTime >= timeoutMs) {
      throw new Error(`Timeout reached after ${timeoutMs}ms - queued workflows still exist`);
    }

    // Get the list of queued workflows
    const queuedWorkflows = await DBOS.listQueuedWorkflows({});

    // If the list is empty, we're done
    if (queuedWorkflows.length === 0) {
      console.log('All queued workflows completed');
      return;
    }

    console.log(`${queuedWorkflows.length} workflows still queued, waiting...`);

    // Wait for 1 second before checking again
    await new Promise<void>(resolve => setTimeout(resolve, intervalMs));
  }
}

export async function GET(request: Request) {
  waitUntil(waitForQueuedWorkflowsToComplete(60000));
  return new Response(`Starting DBOS worker!`);
}