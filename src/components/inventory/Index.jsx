import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X, ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ 
    key: 'quantity', 
    direction: 'asc' 
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const sortOptions = [
    { key: 'quantity', label: 'Quantity' },
    { key: 'price', label: 'Price' }
  ];

  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem('inventory')) || [];
    setInventory(savedInventory);

    const savedCategories = Array.from(new Set(savedInventory.map((item) => item.category)));
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const addItem = (item) => {
    const newInventory = [...inventory, item];
    setInventory(newInventory);

    // Update categories if new category is added
    if (!categories.includes(item.category)) {
      setCategories([...categories, item.category]);
    }
    
    setShowAddForm(false);
  };

  const handleEditItem = (updatedItem) => {
    const updatedInventory = inventory.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setInventory(updatedInventory);
    setEditItem(null);
  };

  const handleDeleteItem = () => {
    if (deleteItem) {
      const updatedInventory = inventory.filter(item => item.id !== deleteItem.id);
      setInventory(updatedInventory);
      setDeleteItem(null);
    }
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
    setShowSortDropdown(false);
  };

  const filteredInventory = inventory
    .filter((item) => (filter ? item.category === filter : true))
    .filter((item) => item.product.toLowerCase().includes(search.toLowerCase()));

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (sortConfig.key === 'quantity') {
      return sortConfig.direction === 'asc' 
        ? a.quantity - b.quantity 
        : b.quantity - a.quantity;
    }
    if (sortConfig.key === 'price') {
      return sortConfig.direction === 'asc'
        ? a.price - b.price
        : b.price - a.price;
    }
    return 0;
  });

  const closeModal = () => {
    setShowAddForm(false);
    setEditItem(null);
    setDeleteItem(null);
  };

  // Rest of the component remains the same as in the previous version

  return (
    <div className="w-full h-full relative">
      <div className="h-[98vh] bg-[#f3f4ec] m-2 rounded-[20px] p-5">
        <h1 className="font-impact text-3xl mb-4">Inventory Management</h1>
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mr-2 p-2 border flex-grow"
          />
          <select 
            onChange={(e) => setFilter(e.target.value)} 
            value={filter} 
            className="mr-2 p-2 border"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="p-2 border bg-blue-500 text-white flex items-center"
            >
              Sort by {sortConfig.key} 
              {sortConfig.direction === 'asc' ? ' (Asc)' : ' (Desc)'}
              <ChevronsUpDown className="ml-2" size={16} />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white border rounded shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleSort(option.key)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {option.label} 
                    {sortConfig.key === option.key && (
                      sortConfig.direction === 'asc' ? ' (Asc)' : ' (Desc)'
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="p-2 border bg-green-500 text-white flex items-center"
          >
            <Plus className="mr-2" /> Add Product
          </button>
        </div>

        <table className="w-full mt-4 border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">Product</th>
              <th className="border border-gray-400 p-2">Category</th>
              <th className="border border-gray-400 p-2">Quantity</th>
              <th className="border border-gray-400 p-2">Price</th>
              <th className="border border-gray-400 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedInventory.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-400 p-2">{item.product}</td>
                <td className="border border-gray-400 p-2">{item.category}</td>
                <td className="border border-gray-400 p-2">{item.quantity}</td>
                <td className="border border-gray-400 p-2">${item.price.toFixed(2)}</td>
                <td className="border border-gray-400 p-2 text-center">
                  <button 
                    onClick={() => setEditItem(item)}
                    className="mr-2 text-blue-500 hover:text-blue-700"
                  >
                    <Pencil size={20} />
                  </button>
                  <button 
                    onClick={() => setDeleteItem(item)}
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

      {/* Blur Overlay and Modal Container */}
      {(showAddForm || editItem || deleteItem) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {showAddForm && (
              <AddItemForm 
                onAdd={addItem} 
                onClose={closeModal}
              />
            )}

            {editItem && (
              <EditItemForm 
                item={editItem} 
                onEdit={handleEditItem} 
                onClose={closeModal}
              />
            )}

            {deleteItem && (
              <DeleteConfirmation 
                item={deleteItem} 
                onDelete={handleDeleteItem} 
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};


function AddItemForm({ onAdd, onClose }) {
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product || !category || quantity <= 0 || price <= 0) {
      alert('Please enter valid details.');
      return;
    }
    onAdd({
      id: Date.now(),
      product,
      category,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add New Product</h2>
        <button 
          type="button" 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded"
        required
        step="0.01"
      />
      <button 
        type="submit" 
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
}

function EditItemForm({ item, onEdit, onClose }) {
  const [product, setProduct] = useState(item.product);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product || !category || quantity <= 0 || price <= 0) {
      alert('Please enter valid details.');
      return;
    }
    onEdit({
      ...item,
      product,
      category,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Edit Product</h2>
        <button 
          type="button" 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded"
        required
        step="0.01"
      />
      <button 
        type="submit" 
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Item
      </button>
    </form>
  );
}

function DeleteConfirmation({ item, onDelete, onClose }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-red-600">Confirm Deletion</h2>
        <button 
          type="button" 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>
      <p className="mb-4">
        Are you sure you want to delete <strong>{item.product}</strong>?
      </p>
      <div className="flex space-x-4">
        <button 
          onClick={onDelete} 
          className="flex-1 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button 
          onClick={onClose} 
          className="flex-1 p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Inventory;