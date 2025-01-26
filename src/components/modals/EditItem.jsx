import React, { useState } from 'react';
import { X } from 'lucide-react';

const EditItem = ({ item, onEdit, onClose }) => {
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
      onClose()
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
        <div className="flex flex-col gap-10">
        <input
          type="text"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="w-[40rem] p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-[40rem] p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-[40rem] p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-[40rem] p-2 border rounded"
          required
          step="0.01"
        />
        <button 
          type="submit" 
          className="p-5 w-full border-2 font-mono border-gray-400 rounded-sm flex items-center justify-center
        bg-gray-400 shadow-lg hover:bg-black hover:text-white hover:border-black transition-colors duration-200 
        text-gray-700 font-medium cursor-pointer"
        >
          Update Item
        </button>
        </div>
      </form>
    );
  }
  
  export default EditItem