// StudentsPage.tsx
import { useQuery } from "@tanstack/react-query";
import { hpApi } from "../../api";
import { useMemo, useState } from "react";
import { CharacterGrid } from "../../components/CharacterGrid";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { EmptyState } from "../../components/EmptyState";
import { getFavorites, toggleFavorite } from "../../state/preferences";

export function StudentsPage() {
  const [favorites, setFavorites] = useState<string[]>(getFavorites());

  const q = useQuery({
    queryKey: ["characters", "students"],
    queryFn: hpApi.students,
  });

  const items = useMemo(
    () => (q.data ?? []).slice().sort((a, b) => a.name.localeCompare(b.name)),
    [q.data]
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl">Students</h1>
        <p className="mt-1 text-sm text-zinc-400">Hogwarts students list.</p>
      </header>

      {q.isLoading ? <LoadingState label="Loading students..." /> : null}
      {q.isError ? <ErrorState message={(q.error as Error).message} /> : null}
      {!q.isLoading && !q.isError && items.length === 0 ? (
        <EmptyState title="No students found" />
      ) : null}

      {!q.isLoading && !q.isError && items.length > 0 ? (
        <CharacterGrid
          items={items}
          favorites={favorites}
          onToggleFavorite={(id) => setFavorites(toggleFavorite(id))}
        />
      ) : null}
    </div>
  );
}
