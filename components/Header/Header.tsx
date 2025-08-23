/* components/Header/Header.tsx */
"use client";

import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import type { Tag } from "@/types/note";
import css from "./Header.module.css";

interface HeaderProps {
  allTags: Tag[];
}

const Header = ({ allTags }: HeaderProps) => {
  return (
    <header className={css.header}>
      <nav aria-label="Main Navigation">
        <Link href="/" className={css.headerLink} aria-label="Home">
          NoteHub
        </Link>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <TagsMenu allTags={allTags} />
          </li>
          <li className={css.navigationItem}>
            <Link href="/about" className={css.navigationLink}>
              About
            </Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
