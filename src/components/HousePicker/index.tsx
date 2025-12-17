import type { House } from "../../types";
import { Houses } from "../../state/preferences";

export function HousePicker({
  value,
  onChange,
}: {
  value: House;
  onChange: (h: House) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 ring-1 ring-zinc-800">
      <span className="text-xs text-zinc-400">House</span>
      <select
        className="bg-transparent text-sm text-white outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value as House)}
      >
        {Houses.map((h) => (
          <option key={h} value={h} className="bg-zinc-900">
            {h}
          </option>
        ))}
      </select>
    </label>
  );
}
