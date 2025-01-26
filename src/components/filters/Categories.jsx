import React from "react";

const Categories = ({ onFilterChange, filter, categories, categoryCounts }) => {
  return (
    <div className="h-10">
      <h1 className="text-[18px] font-semibold mb-1 font-mono">Categories</h1>

      <select
        onChange={onFilterChange}
        value={filter}
        className="mr-2 p-3 border-2 border-gray-400 rounded-xl w-[11rem] font-semibold text-gray-700"
      >
        <option value="" >All</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category} ({categoryCounts[category] || 0})
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;
