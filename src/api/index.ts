import type { Character, Spell, House } from "../types/index";

const BASE_URL = "https://hp-api.onrender.com";

async function http<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const hpApi = {
  characters: () => http<Character[]>("/api/characters"),
  students: () => http<Character[]>("/api/characters/students"),
  staff: () => http<Character[]>("/api/characters/staff"),
  characterById: (id: string) => http<Character[]>(`/api/character/${id}`),
  spells: () => http<Spell[]>("/api/spells"),
  house: (house: string) => http<House[]>(`/api/characters/house/${house}`),
};
