"use client";

import { runDBOSWorkflow } from "./actions";

export default function Home() {
  const handleClick = async () => {
    await runDBOSWorkflow();
  };

  const startWorkerFunction = async () => {
    const response = await fetch('/api/dbos');
    const data = await response.text();
    console.log('API response:', data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col gap-4">
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Run DBOS Workflow
        </button>
        <button
          onClick={startWorkerFunction}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Start worker function
        </button>
      </div>
    </div>
  );
}
