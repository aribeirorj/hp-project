import type { House } from "../types";
import { readJson, writeJson } from "../utils/storage";

const FAV_KEY = "hp:favorites:v1";
const HOUSE_KEY = "hp:house:v1";

export const Houses: House[] = [
  "Gryffindor",
  "Slytherin",
  "Hufflepuff",
  "Ravenclaw",
];

export function getFavorites(): string[] {
  return readJson<string[]>(FAV_KEY, []);
}

export function setFavorites(ids: string[]) {
  writeJson(FAV_KEY, ids);
}

export function toggleFavorite(id: string): string[] {
  const current = new Set(getFavorites());
  if (current.has(id)) current.delete(id);
  else current.add(id);
  const next = Array.from(current);
  setFavorites(next);
  return next;
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function getPreferredHouse(): House {
  return readJson<House>(HOUSE_KEY, "Gryffindor");
}

export function setPreferredHouse(house: House) {
  writeJson(HOUSE_KEY, house);
}
