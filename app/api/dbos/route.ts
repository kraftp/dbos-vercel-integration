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
const exampleWorkflow = DBOS.registerWorkflow(exampleFunction, {
  name: "exampleWorkflow",
});

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
});
await DBOS.launch();

// const exampleQueue = new WorkflowQueue("exampleQueue");

export async function GET(request: Request) {
  await exampleWorkflow();
  return new Response(`Hello from ${request.url}, I ran a DBOS workflow!`);
}