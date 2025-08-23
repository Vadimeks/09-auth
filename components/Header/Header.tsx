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
        <div className={css.navigation}>
          <TagsMenu allTags={allTags} />
          <Link href="/about" className={css.navigationLink}>
            About
          </Link>
          <AuthNavigation />
        </div>
      </nav>
    </header>
  );
};

export default Header;
