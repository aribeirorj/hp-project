export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="rounded-2xl bg-zinc-900/60 p-6 ring-1 ring-zinc-800">
      <div className="animate-pulse text-zinc-300">{label}</div>
    </div>
  );
}
