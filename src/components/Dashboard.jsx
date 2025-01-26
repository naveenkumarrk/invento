import React from "react";
import { useInventory } from "../hooks/useInventory";
import InventoryBarChart from "./charts/InventoryBarChart";
import InventoryPieChart from "./charts/InventoryPieChart";
import { Plus } from "lucide-react";
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate()
  const {
    inventory,
    categories,
    addItem,
    editItem: updateItem,
    deleteItem: removeItem,
    filterInventory,
    sortInventory,
    lowStockItems,
    maxStock,
  } = useInventory();

  return (
    <div className="w-full h-full relative">
      <div className="h-full sm:h-[98vh] bg-[#f1f3f4]  rounded-[20px] p-4 sm:p-5">
        <div className="h-auto sm:h-20 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl font-mono">
            Dashboard
          </h1>
          <button 
                onClick={() => navigate("/inventory")}

          className="p-2 w-[11rem] border-2 font-mono border-gray-400 rounded-xl flex items-center justify-between 
        bg-white shadow-lg hover:bg-black hover:text-white hover:border-black transition-colors duration-200 
        text-gray-700 font-medium cursor-pointer"> 
                    <Plus className="mr-2" /> Add Product

        </button>
        </div>

        <div className="w-full flex flex-col lg:flex-row bg-white rounded-[20px] shadow-lg gap-5 p-5">
          <div className="w-full lg:w-1/3 flex flex-col p-2">
            <h2 className="text-xl sm:text-2xl font-bold pt-5">
              Total Products in the Inventory
            </h2>
            <span className="text-3xl sm:text-4xl font-bold">
              {inventory.length}
            </span>
            <p className="text-sm sm:text-[15px] mt-5 sm:mt-10">
              There are {categories.length} categories of products
            </p>
            <ol className="list-disc pl-5">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="text-xs sm:text-[14px] text-gray-700"
                >
                  {category}
                </li>
              ))}
            </ol>
          </div>
          <div className="w-full lg:w-1/3">
            <InventoryBarChart inventory={inventory} categories={categories} />
          </div>
          <div className="w-full lg:w-1/3 flex flex-col p-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold pt-5">
                Max Stocked product
              </h1>
              <ul>
                {maxStock(inventory).map((item) => (
                  <li key={item.id} className="text-base sm:text-xl pt-2">
                    {item.product}:{" "}
                    <span className="text-green-500">{item.quantity} </span>in
                    stock
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 mt-5 sm:mt-7">
          <div className="w-full h-[18rem] sm:h-[22rem] bg-white rounded-[20px] shadow-lg relative">
            <h1 className="absolute p-3 sm:p-5 text-xl sm:text-2xl font-bold">
              Number of products in category
            </h1>
            <InventoryPieChart inventory={inventory} categories={categories} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 w-full h-[18rem] sm:h-[22rem] bg-white rounded-[20px] shadow-lg p-5 sm:p-10 overflow-y-auto">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                stocks (less than 10)
              </h1>
              <span className="text-3xl sm:text-4xl font-bold">
                {lowStockItems(inventory).length}
              </span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Low stocks Items
              </h1>
              <span className="text-base sm:text-xl">
                <ol className="list-disc pl-5">
                  {lowStockItems(inventory).map((item, index) => (
                    <li key={index} className="text-red-400">
                      {item.product} ({item.quantity})
                    </li>
                  ))}
                </ol>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
