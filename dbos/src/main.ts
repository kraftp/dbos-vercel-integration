import { DBOS } from "@dbos-inc/dbos-sdk";
import { Pool } from 'pg';


async function stepOne() {
  DBOS.logger.info("Step one completed!");
}

async function stepTwo() {
  DBOS.logger.info("Step two completed!");
}

async function exampleFunction() {
  await DBOS.runStep(() => stepOne(), {name: "stepOne"});
  await DBOS.runStep(() => stepTwo(), {name: "stepTwo"});
}
const exampleWorkflow = DBOS.registerWorkflow(exampleFunction);

async function main() {
  const databaseURL = process.env.POSTGRES_URL_NON_POOLING?.replace('?sslmode=require', '');;
  let pool = new Pool({ connectionString: databaseURL });
  DBOS.setConfig({
    "name": "dbos-vercel-integration",
    "systemDatabaseUrl": databaseURL,
    "systemDatabasePool": pool,
  });
  await DBOS.launch();
  await exampleWorkflow();
  await DBOS.shutdown();
}

main().catch(console.log);