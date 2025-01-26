import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useInventory } from "../../hooks/useInventory";
import InventoryTable from "./InventoryTable";
import AddItem from "../modals/AddItem";
import EditItem from "../modals/EditItem";
import DeleteItem from "./../modals/DeleteItem";
import SortDropdown from "./../filters/SortDropDown";
import SearchFilter from "../filters/SearchFilter";
import Categories from "./../filters/Categories";

const Inventory = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "quantity",
    direction: "asc",
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  // const [itemOffset, setItemOffset] = useState(0);

  const {
    inventory,
    categories,
    addItem,
    editItem: updateItem,
    deleteItem: removeItem,
    filterInventory,
    sortInventory,
  } = useInventory();

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * 8) % inventory.length;
  //   setItemOffset(newOffset);
  // };

  // const currentItems = inventory.slice(itemOffset, itemOffset + 8);
  // const pageCount = Math.ceil(inventory.length / 8);
  // const endOffset = itemOffset + 8;
  // const itemStart = itemOffset + 1;

  const sortOptions = [
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
  ];

 

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
    setShowSortDropdown(false);
  };

  const filteredInventory = filterInventory(inventory, search, filter);
  const sortedInventory = sortInventory(filteredInventory, sortConfig);

  const closeModal = () => {
    setShowAddForm(false);
    setEditItem(null);
    setDeleteItem(null);
  };

  const categoryCounts = inventory.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

    const inventoryCounts = inventory.length

  return (
    <div className="w-full h-full relative">
      <div className="h-[98vh] bg-[#f1f3f4] m-2 rounded-[20px] p-5">
        <div className="h-15 flex b-0 items-center gap-5">
          <h1 className="font-bold text-4xl mb-4 font-mono">Inventory</h1>
          <p className="text-[15px] text-gray-700 w-full font-mono">
            Add, delete, edit products
          </p>
        </div>

        <div className="flex flex-col w-full h-52 bg-white rounded-[20px] p-5 shadow-md gap-2">
          <SearchFilter
            search={search}
            filter={filter}
            categories={categories}
            categoryCounts={categoryCounts}
            onSearchChange={(e) => setSearch(e.target.value)}
            onFilterChange={(e) => setFilter(e.target.value)}
          />
          <div className="flex justify-between">
            <Categories
              filter={filter}
              categories={categories}
              categoryCounts={categoryCounts}
              onFilterChange={(e) => setFilter(e.target.value)}
            />
            <SortDropdown
              sortConfig={sortConfig}
              sortOptions={sortOptions}
              showSortDropdown={showSortDropdown}
              onToggleDropdown={() => setShowSortDropdown(!showSortDropdown)}
              onSort={handleSort}
            />
          </div>
        </div>

        <InventoryTable
          sortedInventory={sortedInventory}
          onEditItem={setEditItem}
          onDeleteItem={setDeleteItem}
          inventoryCounts = {inventoryCounts}
          setShowAddForm = {setShowAddForm}
          // handlePageClick={handlePageClick}
          // pageCount={pageCount}
        />
      </div>

      {/* Modal Container */}
      {(showAddForm || editItem || deleteItem) && (
        <div
          className="fixed inset-0 bg-black/5 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 shadow-lg"
          onClick={closeModal}
        >
          <div
            className="bg-white p-10 rounded-lg shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {showAddForm && <AddItem onAdd={addItem} onClose={closeModal} />}

            {editItem && (
              <EditItem
                item={editItem}
                onEdit={updateItem}
                onClose={closeModal}
              />
            )}

            {deleteItem && (
              <DeleteItem
                item={deleteItem}
                onDelete={() => removeItem(deleteItem)}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
