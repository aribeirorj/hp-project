import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { hpApi } from "../../api";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { FavoriteButton } from "../../components/FavoriteButton";
import { getFavorites, toggleFavorite } from "../../state/preferences";
import { useMemo, useState } from "react";
import { Badge } from "../../components/Badge";
import { Field } from "./components/Field";

export function CharacterDetailsPage() {
  const { id } = useParams();
  const [favorites, setFavorites] = useState<string[]>(getFavorites());

  const queryCharacter = useQuery({
    queryKey: ["character", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing character id");
      const arr = await hpApi.characterById(id);
      return arr[0];
    },
    enabled: !!id,
  });

  const isFav = useMemo(
    () => (id ? favorites.includes(id) : false),
    [favorites, id]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/characters"
          className="text-sm text-zinc-300 hover:text-white"
        >
          ← Back to list
        </Link>
        {id ? (
          <FavoriteButton
            active={isFav}
            onClick={() => setFavorites(toggleFavorite(id))}
          />
        ) : null}
      </div>

      {queryCharacter.isLoading ? (
        <LoadingState label="Loading character..." />
      ) : null}
      {queryCharacter.isError ? (
        <ErrorState message={(queryCharacter.error as Error).message} />
      ) : null}

      {queryCharacter.data ? (
        <div className="overflow-hidden rounded-2xl bg-zinc-900/60 ring-1 ring-zinc-800 shadow-soft">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="bg-linear-to-br from-zinc-900 to-zinc-950">
              {queryCharacter.data.image ? (
                <img
                  src={queryCharacter.data.image}
                  alt={queryCharacter.data.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-80 items-center justify-center text-zinc-400">
                  No image
                </div>
              )}
            </div>

            <div className="space-y-4 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h1 className="font-display text-3xl">
                  {queryCharacter.data.name}
                </h1>
                {queryCharacter.data.house ? (
                  <Badge>{queryCharacter.data.house}</Badge>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2">
                {queryCharacter.data.hogwartsStudent ? (
                  <Badge>Student</Badge>
                ) : null}
                {queryCharacter.data.hogwartsStaff ? (
                  <Badge>Staff</Badge>
                ) : null}
                {queryCharacter.data.species ? (
                  <Badge>{queryCharacter.data.species}</Badge>
                ) : null}
                {queryCharacter.data.wizard ? <Badge>Wizard</Badge> : null}
                {queryCharacter.data.alive === false ? (
                  <Badge>Deceased</Badge>
                ) : null}
              </div>

              <div className="grid gap-3 text-sm text-zinc-200">
                <Field label="Actor" value={queryCharacter.data.actor} />
                <Field label="Gender" value={queryCharacter.data.gender} />
                <Field label="Ancestry" value={queryCharacter.data.ancestry} />
                <Field label="Patronus" value={queryCharacter.data.patronus} />
                <Field
                  label="Date of birth"
                  value={queryCharacter.data.dateOfBirth}
                />
                <Field
                  label="Eye color"
                  value={queryCharacter.data.eyeColour}
                />
                <Field
                  label="Hair color"
                  value={queryCharacter.data.hairColour}
                />

                <div className="rounded-xl bg-zinc-950/40 p-4 ring-1 ring-zinc-800">
                  <div className="text-xs text-zinc-400">Wand</div>
                  <div className="mt-1 text-sm">
                    {queryCharacter.data.wand?.wood ||
                    queryCharacter.data.wand?.core ||
                    queryCharacter.data.wand?.length ? (
                      <>
                        {queryCharacter.data.wand?.wood
                          ? `Wood: ${queryCharacter.data.wand.wood}. `
                          : ""}
                        {queryCharacter.data.wand?.core
                          ? `Core: ${queryCharacter.data.wand.core}. `
                          : ""}
                        {typeof queryCharacter.data.wand?.length === "number"
                          ? `Length: ${queryCharacter.data.wand.length}"`
                          : ""}
                      </>
                    ) : (
                      <span className="text-zinc-400">No wand data</span>
                    )}
                  </div>
                </div>

                {queryCharacter.data.alternate_names?.length ? (
                  <div className="rounded-xl bg-zinc-950/40 p-4 ring-1 ring-zinc-800">
                    <div className="text-xs text-zinc-400">Alternate names</div>
                    <div className="mt-1 text-sm text-zinc-200">
                      {queryCharacter.data.alternate_names.join(", ")}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
