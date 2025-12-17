import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { CharactersPage } from "../view/CharactersPage";
import { StudentsPage } from "../view/StudentsPage";
import { StaffPage } from "../view/StaffPage";
import { SpellsPage } from "../view/SpellsPage";
import { CharacterDetailsPage } from "../view/CharacterDetailsPage";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <CharactersPage /> },
      { path: "/characters", element: <CharactersPage /> },
      { path: "/students", element: <StudentsPage /> },
      { path: "/staff", element: <StaffPage /> },
      { path: "/spells", element: <SpellsPage /> },
      { path: "/characters/:id", element: <CharacterDetailsPage /> },
    ],
  },
]);
