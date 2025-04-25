"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <h2 className="font-semibold text-red-800">Something went wrong</h2>
      <p>{error.message}</p>
    </div>
  );
}
