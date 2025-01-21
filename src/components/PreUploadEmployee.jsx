import React from "react";
import { LuUserRoundSearch } from "react-icons/lu";
import { GoPersonAdd } from "react-icons/go";
import { RiStickyNoteAddLine } from "react-icons/ri";

const EmployeesPreUpload = ({ onUploadClick }) => (
  <div className="flex flex-col h-3/5 w-full items-center justify-center mt-10 mx-10 bg-white border-2 border-gray-300 rounded-3xl ">
    <div className="m-2 flex flex-col items-center justify-center">
      <LuUserRoundSearch className="my-2 text-9xl" />
      <h1 className="my-2 text-3xl font-bold text-gray-700">
        Start Building Your Team
      </h1>
      <p className="my-2 text-lg text-gray-500">
        Add your first team member or import your entire team.
      </p>
    </div>
    <div className="my-2 flex justify-between gap-6">
      <button
        onClick={onUploadClick}
        className="p-2 px-4 my-2 rounded-xl flex items-center bg-[#f9fcfc] gap-2 border-2 border-gray-300"
      >
        <RiStickyNoteAddLine />
        <span>Bulk Upload</span>
      </button>
      <button className=" p-2 px-4 my-2 rounded-xl flex items-center gap-2 text-white border-none bg-[#02B9B0]">
        <GoPersonAdd />
        <span>Add Employee</span>
      </button>
    </div>
  </div>
);

export default EmployeesPreUpload;
