// app/notes/filter/@sidebar/default.tsx

import Link from "next/link";
import type { Tag } from "@/types/note";
import css from "./SidebarNotes.module.css";

const allTags: Tag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "All",
];

export default function SidebarNotes() {
  return (
    <div>
      <h3>Фільтры</h3>
      <ul className={css.menuList}>
        {allTags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={
                tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`
              }
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
