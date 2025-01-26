import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const InventoryPieChart = ({ inventory, categories }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D0ED57", "#A28BD8"];

  const data = categories.map((category) => ({
    category,
    value: inventory.filter((item) => item.category === category).length,
  }));

  return (
    <div className="w-[52rem] h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ category }) => category}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryPieChart;
