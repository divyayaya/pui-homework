import React from "react";
import "../styles/styles.css";

const handleSearch = () => {
  const searchTerm = document.getElementById("search-term");
  for (const i = 0; i < names.length; i++) {
    if(searchTerm.toUpperCase()===names[i].toUpperCase())
        
  }
};
const SearchBar = ({ names }) => {
  return (
    <div>
      <input type="text" id="search-term" />
      <button type="button" id="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
export default SearchBar;
