import React from "react";
import "../styles/styles.css";

const SearchBar = ({
  handleSearch,
  searchInput,
  setSearchInput,
  handleSort,
}) => {
  return (
    <div>
      <input
        type="text"
        id="search-term"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {/*capturing the search term and passing it as a paramteter to handleSearch function*/}
      <button
        type="button"
        id="search-button"
        onClick={() => handleSearch(searchInput)}
      >
        Search
      </button>
      <label htmlFor="sort-by-menu" id="sort-by-label">
        sort by:{" "}
      </label>
      {/*capturing selected sort option and passing it as a parameter to handleSort function*/}
      <select
        name="sort-by-menu"
        id="sort-by-menu"
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="Name">Name</option>
        <option value="Base Price">Base Price</option>
      </select>
    </div>
  );
};
export default SearchBar;
