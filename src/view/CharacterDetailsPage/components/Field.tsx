export function Field({
  label,
  value,
}: {
  label: string;
  value?: string | number | boolean | null;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-zinc-950/40 px-4 py-2 ring-1 ring-zinc-800">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="text-sm text-zinc-100">
        {value === undefined || value === null || value === "" ? (
          <span className="text-zinc-400">—</span>
        ) : (
          String(value)
        )}
      </div>
    </div>
  );
}
