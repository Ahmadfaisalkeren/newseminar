import React from "react";
import "./Search.scss";

const Search = ({ searchQuery, handleSearch }) => {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearch}
    />
  );
};

export default Search;
