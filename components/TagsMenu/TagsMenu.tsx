// components/TagsMenu/TagsMenu.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tag } from "@/types/note";
import css from "./TagsMenu.module.css";

interface TagsMenuProps {
  allTags: Tag[];
}

const TagsMenu = ({ allTags }: TagsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof HTMLElement &&
        !document.querySelector(`.${css.menuContainer}`)?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const currentTag = pathname.split("/").pop();

  return (
    <div className={css.menuContainer}>
      <button onClick={handleToggleMenu} className={css.menuButton}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/All"
              className={`${css.menuLink} ${currentTag === "notes" || currentTag === "" ? css.active : ""}`}
              onClick={handleLinkClick}
            >
              All notes
            </Link>
          </li>
          {allTags.map((tag: Tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={`${css.menuLink} ${currentTag === tag ? css.active : ""}`}
                onClick={handleLinkClick}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
