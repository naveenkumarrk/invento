import React from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import ReactPaginate from 'react-paginate';

const InventoryTable = ({ 
  sortedInventory, 
  onEditItem, 
  onDeleteItem,
  inventoryCounts,
  setShowAddForm, 
  handlePageClick, 
  pageCount
}) => {

  return (
  <>
  <div className="h-15 flex items-center my-2">
    <h1 className='text-lg w-full font-semibold font-mono'>Products Available: {inventoryCounts}</h1>
    <div className="w-full flex justify-end mr-5">
          <button
            onClick={() => setShowAddForm(true)}
            className="p-2 w-[11rem] border-2 font-mono border-gray-400 rounded-xl flex items-center justify-between 
        bg-white shadow-lg hover:bg-black hover:text-white hover:border-black transition-colors duration-200 
        text-gray-700 font-medium cursor-pointer"
          >
            <Plus className="mr-2" /> Add Product
          </button>
        </div>
    
  </div>
  <div className="bg-white rounded-[20px] h-[57vh] shadow-lg border border-gray-200 px-5 pb-5 overflow-y-auto">
    <table className="w-full mt-4 border-collapse rounded-table">
      <thead>
        <tr className="bg-gray-100 font-mono text-[15px]">
          <th className="p-3 text-left">Product</th>
          <th className="p-3 text-left">Category</th>
          <th className="p-3 text-left">Quantity</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedInventory.map((item, index) => (
          <tr 
            key={item.id} 
            className={`
              ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              hover:bg-gray-100 transition-colors duration-200
            `}
          >
            <td className="p-3">{item.product}</td>
            <td className="p-3">{item.category}</td>
            <td
                  className={`p-3 ${
                    item.quantity < 10 ? 'bg-red-100 text-red-600 font-semibold' : ''
                  }`}
                >
                  {item.quantity}
                </td>
            <td className="p-3">₹{item.price.toFixed(2)}</td>
            <td className="p-3 text-center">
              <button 
                onClick={() => onEditItem(item)}
                className="mr-2 text-blue-500 hover:text-blue-700"
              >
                <Pencil size={20} />
              </button>
              <button 
                onClick={() => onDeleteItem(item)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {/* <div className="flex justify-center mt-4">
        <ReactPaginate
          nextLabel="Next"
          previousLabel="Previous"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          className="flex justify-center gap-1 sm:gap-2 text-sm flex-wrap"
          pageClassName="block"
          pageLinkClassName="block px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100"
          previousClassName="block"
          previousLinkClassName="block px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100"
          nextClassName="block"
          nextLinkClassName="block px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100"
          activeClassName="bg-gray-600 text-black hover:bg-gray-700"
          disabledClassName="opacity-50 cursor-not-allowed"
          breakLabel="..."
          breakClassName="block"
          breakLinkClassName="block px-2 sm:px-3 py-2"
          renderOnZeroPageCount={null}
        />
      </div> */}
  </>
  );
};

export default InventoryTable;