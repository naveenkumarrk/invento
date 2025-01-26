import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const InventoryBarChart = ({ inventory, categories }) => {
  const data = categories.map((category) => ({
    category,
    quantity: inventory.filter((item) => item.category === category).length,
  }));

  return (
    <div className="w-[35rem] h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 50, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" name="Stock Quantity" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryBarChart;
