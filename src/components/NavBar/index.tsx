import { NavLink } from "react-router-dom";
import { HousePicker } from "../HousePicker";
import type { House } from "../../types";
import { setPreferredHouse } from "../../state/preferences";

function linkClass({ isActive }: { isActive: boolean }) {
  return [
    "rounded-full px-3 py-1 text-sm transition",
    isActive
      ? "bg-zinc-900 text-white ring-1 ring-accent"
      : "text-zinc-300 hover:bg-zinc-900 hover:text-white",
  ].join(" ");
}

export function NavBar({
  currentHouse,
  onHouseChange,
}: {
  currentHouse: House;
  onHouseChange: (h: House) => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-baseline gap-3">
          <div className="hidden text-xl text-zinc-400 md:block">
            Harry Potter Characters & Spells
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/characters" className={linkClass}>
            Characters
          </NavLink>
          <NavLink to="/students" className={linkClass}>
            Students
          </NavLink>
          <NavLink to="/staff" className={linkClass}>
            Staff
          </NavLink>
          <NavLink to="/spells" className={linkClass}>
            Spells
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <HousePicker
            value={currentHouse}
            onChange={(h) => {
              setPreferredHouse(h);
              onHouseChange(h);
            }}
          />
          <div className="md:hidden">
            <NavLink to="/characters" className={linkClass}>
              Browse
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
