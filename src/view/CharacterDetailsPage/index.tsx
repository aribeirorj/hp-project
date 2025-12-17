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

  const queryCharacterDetails = useQuery({
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

      {queryCharacterDetails.isLoading ? (
        <LoadingState label="Loading character..." />
      ) : null}
      {queryCharacterDetails.isError ? (
        <ErrorState message={(queryCharacterDetails.error as Error).message} />
      ) : null}

      {queryCharacterDetails.data ? (
        <div className="overflow-hidden rounded-2xl bg-zinc-900/60 ring-1 ring-zinc-800 shadow-soft">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="bg-linear-to-br from-zinc-900 to-zinc-950">
              {queryCharacterDetails.data.image ? (
                <img
                  src={queryCharacterDetails.data.image}
                  alt={queryCharacterDetails.data.name}
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
                  {queryCharacterDetails.data.name}
                </h1>
                {queryCharacterDetails.data.house ? (
                  <Badge>{queryCharacterDetails.data.house}</Badge>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2">
                {queryCharacterDetails.data.hogwartsStudent ? (
                  <Badge>Student</Badge>
                ) : null}
                {queryCharacterDetails.data.hogwartsStaff ? (
                  <Badge>Staff</Badge>
                ) : null}
                {queryCharacterDetails.data.species ? (
                  <Badge>{queryCharacterDetails.data.species}</Badge>
                ) : null}
                {queryCharacterDetails.data.wizard ? (
                  <Badge>Wizard</Badge>
                ) : null}
                {queryCharacterDetails.data.alive === false ? (
                  <Badge>Deceased</Badge>
                ) : null}
              </div>

              <div className="grid gap-3 text-sm text-zinc-200">
                <Field label="Actor" value={queryCharacterDetails.data.actor} />
                <Field
                  label="Gender"
                  value={queryCharacterDetails.data.gender}
                />
                <Field
                  label="Ancestry"
                  value={queryCharacterDetails.data.ancestry}
                />
                <Field
                  label="Patronus"
                  value={queryCharacterDetails.data.patronus}
                />
                <Field
                  label="Date of birth"
                  value={queryCharacterDetails.data.dateOfBirth}
                />
                <Field
                  label="Eye color"
                  value={queryCharacterDetails.data.eyeColour}
                />
                <Field
                  label="Hair color"
                  value={queryCharacterDetails.data.hairColour}
                />

                <div className="rounded-xl bg-zinc-950/40 p-4 ring-1 ring-zinc-800">
                  <div className="text-xs text-zinc-400">Wand</div>
                  <div className="mt-1 text-sm">
                    {queryCharacterDetails.data.wand?.wood ||
                    queryCharacterDetails.data.wand?.core ||
                    queryCharacterDetails.data.wand?.length ? (
                      <>
                        {queryCharacterDetails.data.wand?.wood
                          ? `Wood: ${queryCharacterDetails.data.wand.wood}. `
                          : ""}
                        {queryCharacterDetails.data.wand?.core
                          ? `Core: ${queryCharacterDetails.data.wand.core}. `
                          : ""}
                        {typeof queryCharacterDetails.data.wand?.length ===
                        "number"
                          ? `Length: ${queryCharacterDetails.data.wand.length}"`
                          : ""}
                      </>
                    ) : (
                      <span className="text-zinc-400">No wand data</span>
                    )}
                  </div>
                </div>

                {queryCharacterDetails.data.alternate_names?.length ? (
                  <div className="rounded-xl bg-zinc-950/40 p-4 ring-1 ring-zinc-800">
                    <div className="text-xs text-zinc-400">Alternate names</div>
                    <div className="mt-1 text-sm text-zinc-200">
                      {queryCharacterDetails.data.alternate_names.join(", ")}
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
