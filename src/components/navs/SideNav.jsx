import React from 'react'
import Sidebar, { SidebarItem } from './Sidebar'
import {
    BarChart3,
    Boxes,
    LayoutDashboard,
    LifeBuoy,
    Package,
    Receipt,
    Settings,
    UserCircle,
  } from "lucide-react";
  

const SideNav = () => {
  return (
  <div className="bg-[#191918] min-h-full">
    <Sidebar>
      <SidebarItem to="/" icon={<LayoutDashboard size={20} className="text-[#f3f4ec]"/>} text="Dashboard" />
      <SidebarItem to="/inventory"icon={<Boxes size={20} className="text-[#f3f4ec]"/>} text="Inventory" />
    </Sidebar>
  </div>
  )
}

export default SideNav