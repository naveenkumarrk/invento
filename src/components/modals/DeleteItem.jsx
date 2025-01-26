import React, { useState } from 'react';
import { X } from 'lucide-react';

const DeleteItem = ({ item, onDelete, onClose }) => {
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
            onClick={()=>{
              onDelete()
              onClose();
            }} 
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

  export default DeleteItem