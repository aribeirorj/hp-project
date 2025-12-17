export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl bg-zinc-900/60 p-6 ring-1 ring-red-900/50">
      <div className="font-medium text-red-200">Something went wrong</div>
      <div className="mt-2 text-sm text-zinc-300">{message}</div>
    </div>
  );
}
