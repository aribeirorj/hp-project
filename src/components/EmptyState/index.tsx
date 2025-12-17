export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-2xl bg-zinc-900/60 p-6 ring-1 ring-zinc-800">
      <div className="font-medium text-zinc-100">{title}</div>
      {hint ? <div className="mt-2 text-sm text-zinc-400">{hint}</div> : null}
    </div>
  );
}
