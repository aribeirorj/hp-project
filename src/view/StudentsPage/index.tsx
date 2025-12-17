// StudentsPage.tsx
import { useQuery } from "@tanstack/react-query";
import { hpApi } from "../../api";
import { useMemo, useState } from "react";
import { CharacterGrid } from "../../components/CharacterGrid";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { EmptyState } from "../../components/EmptyState";
import { getFavorites, toggleFavorite } from "../../state/preferences";
import { useOutletContext } from "react-router-dom";
import type { OutletContext } from "../../types";

export function StudentsPage() {
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const { house } = useOutletContext<OutletContext>();

  const queryStudentPage = useQuery({
    queryKey: ["characters", "students"],
    queryFn: hpApi.students,
  });

  const items = useMemo(
    () =>
      (queryStudentPage.data ?? [])
        .filter((a) => a.house?.toLowerCase() === house.toLowerCase())
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name)),
    [house, queryStudentPage.data]
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl">Students</h1>
        <p className="mt-1 text-sm text-zinc-400">Hogwarts students list.</p>
      </header>

      {queryStudentPage.isLoading ? (
        <LoadingState label="Loading students..." />
      ) : null}
      {queryStudentPage.isError ? (
        <ErrorState message={(queryStudentPage.error as Error).message} />
      ) : null}
      {!queryStudentPage.isLoading &&
      !queryStudentPage.isError &&
      items.length === 0 ? (
        <EmptyState title="No students found" />
      ) : null}

      {!queryStudentPage.isLoading &&
      !queryStudentPage.isError &&
      items.length > 0 ? (
        <CharacterGrid
          items={items}
          favorites={favorites}
          onToggleFavorite={(id) => setFavorites(toggleFavorite(id))}
        />
      ) : null}
    </div>
  );
}
