import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "bg-pink-200" : ""
            } flex gap-3  items-center border border-gray-300 border-r-0 px-3 py-3 rounded-l `
          }
        >
          <img className="h-5 w-5" src={assets.add_icon} alt="add" />
          <p className="hidden md:block font-medium text-lg">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `${
              isActive ? "bg-pink-200" : ""
            } flex gap-3  items-center border border-gray-300 border-r-0 px-3 py-3 rounded-l `
          }
        >
          <img className="h-5 w-5" src={assets.order_icon} alt="add" />
          <p className="hidden md:block font-medium text-lg">List Items</p>
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `${
              isActive ? "bg-pink-200" : ""
            } flex gap-3  items-center border border-gray-300 border-r-0 px-3 py-3 rounded-l `
          }
        >
          <img className="h-5 w-5" src={assets.order_icon} alt="add" />
          <p className="hidden md:block text-lg font-medium">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
