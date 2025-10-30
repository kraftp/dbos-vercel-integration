"use client";

import { runDBOSWorkflow } from "./actions";

export default function Home() {
  const handleClick = async () => {
    await runDBOSWorkflow();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Run DBOS Workflow
      </button>
    </div>
  );
}
