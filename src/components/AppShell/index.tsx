import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";
import { useEffect, useState } from "react";
import { getPreferredHouse } from "../../state/preferences";

const houseToAccent: Record<string, string> = {
  Gryffindor: "220 38 38", // red-600
  Slytherin: "22 163 74", // green-600
  Hufflepuff: "245 158 11", // amber-500
  Ravenclaw: "37 99 235", // blue-600
};

export function AppShell() {
  const [house, setHouse] = useState(getPreferredHouse());

  useEffect(() => {
    const accent = houseToAccent[house] ?? "245 158 11";
    document.documentElement.style.setProperty("--accent", accent);
  }, [house]);

  return (
    <div className="min-h-screen">
      <NavBar currentHouse={house} onHouseChange={setHouse} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-10 text-sm text-zinc-400">
        <div className="mt-10 border-t border-zinc-800 pt-6">HP - Project</div>
      </footer>
    </div>
  );
}
