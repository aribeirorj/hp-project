export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-zinc-300 ring-1 ring-zinc-800">
      {children}
    </span>
  );
}
