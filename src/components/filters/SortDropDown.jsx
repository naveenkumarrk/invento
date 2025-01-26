import React from 'react';
import { ChevronsUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const SortDropdown = ({ 
  sortConfig, 
  sortOptions, 
  showSortDropdown, 
  onToggleDropdown, 
  onSort 
}) => {
  return (
    <div className="flex flex-col relative">
      <h1 className="text-[18px] font-semibold mb-1 text-gray-800 font-mono">Sort</h1>

      <button
        onClick={onToggleDropdown}
        className="p-2 w-[11rem] border-2 border-gray-400 rounded-xl flex items-center justify-between 
        bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 
        text-gray-700 font-medium"
      > 
        <span>Sort by</span>
        <ChevronsUpDown className="ml-2 text-gray-500" size={16} />
      </button>
      
      {showSortDropdown && (
        <div className="absolute top-full right-0 mt-2 w-full bg-white 
        border rounded-lg shadow-lg z-10 overflow-hidden 
        animate-dropdown-slide-down">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => onSort(option.key)}
              className="w-full text-left px-4 py-3 
              hover:bg-gray-100 transition-colors 
              flex justify-between items-center
              text-gray-700 hover:text-black"
            >
              <span>{option.label}</span>
              {sortConfig.key === option.key && (
                sortConfig.direction === 'asc' 
                  ? <ArrowUp size={16} className="text-gray-500" /> 
                  : <ArrowDown size={16} className="text-gray-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;