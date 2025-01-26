import React from 'react'
import Dashboard from './Dashboard';
import Inventory from './inventory/Inventory';

const Content = () => {
  return (
<div className="w-full h-full">
  <div className="h-[98vh] bg-[#f3f4ec] m-2 rounded-[20px] p-5">
    <Dashboard/>
  </div>
</div>
  )
}

export default Content