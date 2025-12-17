import type { Character } from "../../types";
import { CharacterCard } from "../CharacterCard";

export function CharacterGrid({
  items,
  favorites,
  onToggleFavorite,
}: {
  items: Character[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}) {
  const favSet = new Set(favorites);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <CharacterCard
          key={c.id}
          character={c}
          isFav={favSet.has(c.id)}
          onToggleFav={() => onToggleFavorite(c.id)}
        />
      ))}
    </div>
  );
}
