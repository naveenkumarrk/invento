import { useState, useEffect } from "react";

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];

    setInventory(savedInventory);
    setCategories(savedCategories);
  }, []);

  // Save data to localStorage whenever inventory or categories change
  useEffect(() => {
    if (inventory.length > 0) {
      localStorage.setItem("inventory", JSON.stringify(inventory));
    }
    if (categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [inventory, categories]);

  const addItem = (item) => {
    const newInventory = [...inventory, { ...item, id: Date.now() }];
    setInventory(newInventory);

    if (!categories.includes(item.category)) {
      setCategories([...categories, item.category]);
    }
  };

  const editItem = (updatedItem) => {
    const updatedInventory = inventory.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setInventory(updatedInventory);

    if (!categories.includes(updatedItem.category)) {
      setCategories([...categories, updatedItem.category]);
    }
  };

  const deleteItem = (itemToDelete) => {
    const updatedInventory = inventory.filter(
      (item) => item.id !== itemToDelete.id
    );

    const categoryExists = updatedInventory.some(
      (item) => item.category === itemToDelete.category
    );

    let updatedCategories = [...categories];
    if (!categoryExists) {
      updatedCategories = updatedCategories.filter(
        (category) => category !== itemToDelete.category
      );
    }

    setInventory(updatedInventory);
    setCategories(updatedCategories);
  };

  const filterInventory = (inventory, search, filter) => {
    return inventory
      .filter((item) => (filter ? item.category === filter : true))
      .filter((item) =>
        item.product.toLowerCase().includes(search.toLowerCase())
      );
  };

  const sortInventory = (inventory, sortConfig) => {
    return [...inventory].sort((a, b) => {
      if (sortConfig.key === "quantity") {
        return sortConfig.direction === "asc"
          ? a.quantity - b.quantity
          : b.quantity - a.quantity;
      }
      if (sortConfig.key === "price") {
        return sortConfig.direction === "asc"
          ? a.price - b.price
          : b.price - a.price;
      }
      return 0;
    });
  };

  const lowStockItems =(inventory) => {
    return inventory.filter(item => item.quantity < 10)  
  }

  const maxStock = (inventory) => {
    const maxproduct =  Math.max(...inventory.map(item => item.quantity))
    return inventory.filter(item => item.quantity === maxproduct)
  }


  return {
    inventory,
    categories,
    addItem,
    editItem,
    deleteItem,
    filterInventory,
    sortInventory,
    lowStockItems, 
    maxStock
  };
};
