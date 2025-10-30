import { Sandbox } from '@vercel/sandbox';

async function main() {
  const sandbox = await Sandbox.create({
    source: {
      url: 'https://github.com/kraftp/dbos-vercel-integration.git',
      type: 'git',
      revision: "kraftp/integration",
    },
    timeout: 5 * 60 * 1000, // 5 minutes
    ports: [3000],
  });
 

  console.log(`Installing dependencies...`);
  const install = await sandbox.runCommand({
    cmd: 'npm',
    args: ['install'],
    stderr: process.stderr,
    stdout: process.stdout,
  });
  if (install.exitCode != 0) {
    console.log('Installing packages failed');
    process.exit(1);
  }
  console.log(`Starting a DBOS worker...`);
  const dbos = await sandbox.runCommand({
    cmd: 'node',
    args: ["--experimental-strip-types", "sandbox/dbos.ts"],
    stderr: process.stderr,
    stdout: process.stdout,
    env: {"POSTGRES_URL_NON_POOLING": process.env.POSTGRES_URL_NON_POOLING!}, 
  });
  if (dbos.exitCode != 0) {
    console.log('Installing packages failed');
    process.exit(1);
  } 
}
 
main().catch(console.error);