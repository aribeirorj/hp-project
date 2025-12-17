import { useQuery } from "@tanstack/react-query";
import { hpApi } from "../../api";
import type { Character } from "../../types";
import { useMemo, useState } from "react";
import { CharacterGrid } from "../../components/CharacterGrid";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { EmptyState } from "../../components/EmptyState";
import { getFavorites, toggleFavorite } from "../../state/preferences";

export function CharactersPage() {
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [search, setSearch] = useState("");

  const q = useQuery({
    queryKey: ["characters", "all"],
    queryFn: hpApi.characters,
  });

  const filtered = useMemo(() => {
    const items = (q.data ?? []) as Character[];
    const favSet = new Set(favorites);

    return items
      .filter((c) => (onlyFavs ? favSet.has(c.id) : true))
      .filter((c) => c.name.toLowerCase().includes(search.toLowerCase().trim()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [q.data, favorites, onlyFavs, search]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl">Characters</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Browse all characters. Favorite the ones you like.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            className="w-full rounded-xl bg-zinc-900 px-3 py-2 text-sm text-zinc-100 ring-1 ring-zinc-800 outline-none focus:ring-2 focus:ring-accent sm:w-64"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={[
              "rounded-xl px-3 py-2 text-sm ring-1 transition",
              onlyFavs
                ? "bg-accent text-zinc-950 ring-accent"
                : "bg-zinc-900 text-zinc-200 ring-zinc-800 hover:bg-zinc-800",
            ].join(" ")}
            onClick={() => setOnlyFavs((v) => !v)}
            type="button"
          >
            {onlyFavs ? "Showing favorites" : "Show favorites"}
          </button>
        </div>
      </header>

      {q.isLoading ? <LoadingState label="Loading characters..." /> : null}
      {q.isError ? <ErrorState message={(q.error as Error).message} /> : null}

      {!q.isLoading && !q.isError && filtered.length === 0 ? (
        <EmptyState
          title="No results"
          hint="Try changing your search or favorites filter."
        />
      ) : null}

      {!q.isLoading && !q.isError && filtered.length > 0 ? (
        <CharacterGrid
          items={filtered}
          favorites={favorites}
          onToggleFavorite={(id) => setFavorites(toggleFavorite(id))}
        />
      ) : null}
    </div>
  );
}
