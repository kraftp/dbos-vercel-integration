import { DBOS, WorkflowQueue } from "@dbos-inc/dbos-sdk";
import 'dotenv/config';

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

const exampleQueue = new WorkflowQueue("exampleQueue");

async function main() {
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
}

main().catch(console.log);
