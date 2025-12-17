// StaffPage.tsx
import { useQuery } from "@tanstack/react-query";
import { hpApi } from "../../api";
import { useMemo, useState } from "react";
import { CharacterGrid } from "../../components/CharacterGrid";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { EmptyState } from "../../components/EmptyState";
import { getFavorites, toggleFavorite } from "../../state/preferences";
import type { OutletContext } from "../../types";
import { useOutletContext } from "react-router-dom";

export function StaffPage() {
  const { house } = useOutletContext<OutletContext>();
  const [favorites, setFavorites] = useState<string[]>(getFavorites());

  const queryStaffPage = useQuery({
    queryKey: ["characters", "staff"],
    queryFn: hpApi.staff,
  });

  const items = useMemo(
    () =>
      (queryStaffPage.data ?? [])
        .filter((a) => a.house?.toLowerCase() === house.toLowerCase())
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name)),
    [house, queryStaffPage.data]
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl">Staff</h1>
        <p className="mt-1 text-sm text-zinc-400">Hogwarts staff list.</p>
      </header>

      {queryStaffPage.isLoading ? (
        <LoadingState label="Loading staff..." />
      ) : null}
      {queryStaffPage.isError ? (
        <ErrorState message={(queryStaffPage.error as Error).message} />
      ) : null}
      {!queryStaffPage.isLoading &&
      !queryStaffPage.isError &&
      items.length === 0 ? (
        <EmptyState title="No staff found" />
      ) : null}

      {!queryStaffPage.isLoading &&
      !queryStaffPage.isError &&
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
