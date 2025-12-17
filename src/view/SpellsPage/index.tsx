import { useQuery } from "@tanstack/react-query";
import { hpApi } from "../../api";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { useMemo, useState } from "react";

export function SpellsPage() {
  const [search, setSearch] = useState("");

  const querySpellsPage = useQuery({
    queryKey: ["spells"],
    queryFn: hpApi.spells,
  });

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    return (querySpellsPage.data ?? [])
      .filter((sp) => sp.name.toLowerCase().includes(s))
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [querySpellsPage.data, search]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl">Spells</h1>
          <p className="mt-1 text-sm text-zinc-400">
            A simple list of spells and descriptions.
          </p>
        </div>

        <input
          className="w-full rounded-xl bg-zinc-900 px-3 py-2 text-sm text-zinc-100 ring-1 ring-zinc-800 outline-none focus:ring-2 focus:ring-accent sm:w-72"
          placeholder="Search spells..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {querySpellsPage.isLoading ? (
        <LoadingState label="Loading spells..." />
      ) : null}
      {querySpellsPage.isError ? (
        <ErrorState message={(querySpellsPage.error as Error).message} />
      ) : null}

      {!querySpellsPage.isLoading && !querySpellsPage.isError ? (
        <div className="grid gap-3">
          {filtered.map((sp) => (
            <div
              key={sp.name}
              className="rounded-2xl bg-zinc-900/60 p-4 ring-1 ring-zinc-800"
            >
              <div className="font-medium text-zinc-100">{sp.name}</div>
              <div className="mt-1 text-sm text-zinc-300">{sp.description}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
