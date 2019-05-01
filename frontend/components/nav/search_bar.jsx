import React from 'react';
export default ()=>(
  <span className="searchbar">
    <i className="fas fa-search" />
    <input type="text" className="search-input" disabled={true} placeholder="Search" />
  </span>
);