import { Link } from "react-router-dom";
import type { Character } from "../../types";
import { Badge } from "../Badge";
import { FavoriteButton } from "../FavoriteButton";

export function CharacterCard({
  character,
  isFav,
  onToggleFav,
}: {
  character: Character;
  isFav: boolean;
  onToggleFav: () => void;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-zinc-900/60 ring-1 ring-zinc-800 shadow-soft">
      <Link to={`/characters/${character.id}`} className="block">
        <div className="relative h-44 bg-linear-to-br from-zinc-900 to-zinc-950">
          {character.image ? (
            <img
              src={character.image}
              alt={character.name}
              className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-400">
              No image
            </div>
          )}
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg leading-tight">
              {character.name}
            </h3>
            {character.house ? <Badge>{character.house}</Badge> : null}
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
            {character.hogwartsStudent ? <Badge>Student</Badge> : null}
            {character.hogwartsStaff ? <Badge>Staff</Badge> : null}
            {character.species ? <Badge>{character.species}</Badge> : null}
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 border-t border-zinc-800 p-4">
        <div className="text-xs text-zinc-400">
          {character.actor ? `Actor: ${character.actor}` : " "}
        </div>
        <FavoriteButton active={isFav} onClick={onToggleFav} />
      </div>
    </div>
  );
}
