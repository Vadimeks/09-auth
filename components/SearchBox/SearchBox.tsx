/* components/SearchBox/SearchBox.tsx */
"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  initialQuery = "",
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search query.");
      return;
    }
    onSearch(query);
    setQuery("");
  };

  return (
    <div className={css.search}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search notes..."
          value={query}
          onChange={handleInputChange}
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Find
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
