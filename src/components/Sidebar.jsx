"use client";

import React, { useState } from "react";
import Image from "next/image";

import { LuHouse } from "react-icons/lu";
import { LiaWalletSolid } from "react-icons/lia";
import { GoPeople } from "react-icons/go";
import { PiBuildingsBold } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
import { CiCalendar, CiDollar } from "react-icons/ci";
import { RiNotification3Line } from "react-icons/ri";
import { FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";
import Logo from "../../public/logo.svg";

const Sidebar = () => {
  const [isOrganizationOpen, setIsOrganizationOpen] = useState(false); // State for dropdown
  const progressPercentage = 10; // Example: Progress bar completion (dynamic)

  return (
    <div className="h-screen w-80 bg-white border-r-2 text-lg border-gray-200 text-slate-600 flex flex-col px-4">
      <div className="my-4 mx-2 p-2 flex items-center">
        <Image src={Logo} alt="Logo" width={100} height={100} priority />
      </div>

      <nav className="flex text-lg flex-col justify-between h-full py-4 px-2">
        <div className="flex flex-col space-y-4">
          <div className="px-2 flex text-lg items-center gap-2">
            <LuHouse className="text-2xl" />
            <span>Dashboard</span>
          </div>

          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsOrganizationOpen(!isOrganizationOpen)}
            >
              <span className="px-2 text-slate-500 text-base font-semibold my-3">
                ORGANIZATION
              </span>
              {isOrganizationOpen ? (
                <FaChevronUp className="text-sm" />
              ) : (
                <FaChevronDown className="text-sm" />
              )}
            </div>
            <ul
              className={`mt-2 space-y-2 text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
                isOrganizationOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <li className="px-2 flex items-center gap-2">
                <PiBuildingsBold className="text-2xl"/>
                <span>Kelick</span>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <div className="px-2 text-slate-500 text-base font-semibold my-3">
              MANAGE
            </div>
            <ul className="mt-2 space-y-2">
              {[
                { label: "Employees", icon: <GoPeople /> },
                { label: "Payroll", icon: <CiDollar /> },
                { label: "Leaves", icon: <CiCalendar /> },
                { label: "Claims", icon: <GoPeople /> },
                { label: "More", icon: <IoIosMore /> },
              ].map((item, index) => (
                <li key={index}>
                  <button className="flex items-center gap-2 w-full py-2 px-2 rounded-xl border-2 border-transparent hover:border-[#02B9B0] hover:bg-[#F9FCFC]">
                    <div className="text-2xl">{item.icon}</div>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <hr className="border-slate-300" />

          <div className="space-y-2 text-lg text-slate-600">
            <button className="flex items-center gap-2 w-full p-2 rounded-xl border-2 border-transparent hover:border-[#02B9B0] hover:bg-[#F9FCFC]">
              <LiaWalletSolid className="text-2xl" />
              <span>Free Plan</span>
            </button>

            <div>1/10 Employees</div>
            <div className="relative w-full h-1 bg-slate-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-1 bg-[#02B9B0] rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <hr className="border-slate-300" />

          <div className="flex items-center justify-between space-x-2 cursor-pointer text-slate-600">
            <div className="flex flex-row">
              <RiNotification3Line className="text-2xl" />
              <span className="px-2">Notifications</span>
            </div>
            <div className=" h-2 w-2 bg-red-400 rounded-full" />
          </div>

          <div className="flex items-center p-4 mt-auto space-x-4 border-t border-slate-200">
            <FaUserCircle className="text-3xl text-slate-500" />
            <div className="text-sm">
              <div className="font-medium text-slate-800">John Doe</div>
              <div className="text-slate-500">johndoe@example.com</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
