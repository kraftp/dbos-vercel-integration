import { Sandbox } from '@vercel/sandbox';
 
async function main() {
  const sandbox = await Sandbox.create({
    source: {
      url: 'https://github.com/kraftp/dbos-vercel-integration.git',
      type: 'git',
    },
    timeout: 5 * 60 * 1000, // 5 minutes
    ports: [3000],
  });
 
  const echo = await sandbox.runCommand('echo', ['Hello sandbox!']);
  console.log(`Message: ${await echo.stdout()}`);
}
 
main().catch(console.error);