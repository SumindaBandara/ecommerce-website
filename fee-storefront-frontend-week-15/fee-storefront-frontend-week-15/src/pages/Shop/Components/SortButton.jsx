import React from "react";

function SortButton({ sortOrder, handleSortChange }) {
  return (
    <div className="flex justify-end mb-4">
      <label htmlFor="sort" className="mr-2 text-lg font-semibold">Sort by: </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={(e) => handleSortChange(e.target.value)}
        className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Low to High">Low to High</option>
        <option value="High to Low">High to Low</option>
      </select>
    </div>
  );
}

export default SortButton;
