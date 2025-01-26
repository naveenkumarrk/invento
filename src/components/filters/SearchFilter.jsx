import React from 'react';
import { Search } from 'lucide-react';

const SearchFilter = ({ search, onSearchChange }) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <h1 className="text-[18px] font-semibold font-mono">Search for products</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={onSearchChange}
          className="w-full p-2 pl-10 rounded-[11px] border-2 border-gray-400 "
          />
             
     {/*   // className="p-2 w-[11rem] border-2 border-gray-400 rounded-xl flex items-center justify-between 
        // bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 
        // text-gray-700 font-medium" */}
    
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
      </div>
    </div>
  );
};

export default SearchFilter;
