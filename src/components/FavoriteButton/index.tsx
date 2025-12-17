export function FavoriteButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm transition ring-1",
        active
          ? "bg-accent text-zinc-950 ring-accent"
          : "bg-zinc-900 text-zinc-200 ring-zinc-800 hover:bg-zinc-800",
      ].join(" ")}
      aria-label={active ? "Unfavorite" : "Favorite"}
      title={active ? "Unfavorite" : "Favorite"}
      type="button"
    >
      {active ? "★ Favorited" : "☆ Favorite"}
    </button>
  );
}
