"use client";

import React, { useState } from "react";
import { LuUserRoundSearch, LuFileSpreadsheet } from "react-icons/lu";
import { GoPersonAdd } from "react-icons/go";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiFoldersDuotone } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { BsDownload } from "react-icons/bs";

const Employees = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleSuccess = (data) => {
    setIsUploaded(true);
    setEmployeeData(data);
    setFilteredEmployees(data);
    setModalOpen(false);
    debugger;
  };

  // const handleFileUpload = (files) => {
  //   const validFiles = Array.from(files).filter(
  //     (file) =>
  //       file.type === "application/vnd.ms-excel" || file.type === "text/csv"
  //   );

  //   if (validFiles.length) {
  //     const file = validFiles[0];
  //     const reader = new FileReader();

  //     reader.onload = (event) => {
  //       const csvText = event.target.result;
  //       const data = parseCSV(csvText);
  //       handleSuccess(data);
  //       setUploadSuccess(true);
  //       setTimeout(() => setUploadSuccess(false), 2000);
  //     };

  //     reader.readAsText(file);
  //   } else {
  //     alert("Only .xls and .csv files are allowed.");
  //   }
  // };

  const handleFileUpload = (filesOrPath) => {
    let file;

    if (typeof filesOrPath === "string") {
      // If a file path is passed
      fetch(filesOrPath)
        .then((response) => response.text())
        .then((csvText) => {
          const data = parseCSV(csvText);
          handleSuccess(data);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 2000);
        })
        .catch(() => alert("Failed to load file from the provided path."));
      return;
    } else {
      // If File objects are passed (e.g., from drag-and-drop or input)
      const validFiles = Array.from(filesOrPath).filter(
        (file) =>
          file.type === "application/vnd.ms-excel" || file.type === "text/csv"
      );

      if (!validFiles.length) {
        alert("Only .xls and .csv files are allowed.");
        return;
      }
      file = validFiles[0];
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target.result;
      const data = parseCSV(csvText);
      handleSuccess(data);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvText) => {
    const rows = csvText.split("\n").map((row) => row.trim());
    const headers = rows.shift().split(","); // Get the headers
    return rows
      .filter((row) => row) // Remove empty rows
      .map((row) => {
        const values = row.split(",");
        return headers.reduce((obj, header, index) => {
          obj[header.trim()] = values[index]?.trim() || "";
          return obj;
        }, {});
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = employeeData.filter((employee) =>
      employee.Name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleExport = () => {
    const csvData = [
      ["ID", "Name", "Email", "Role", "Status", "Nationality", "Type"],
      ...filteredEmployees.map((row, index) => [
        index + 1,
        row.Name || "Unknown",
        row.Email || "Unknown",
        row.Role || "Unknown",
        row.Status || "Unknown",
        row.Nationality || "Unknown",
        row.Type || "Unknown",
      ]),
    ];

    const csvContent = csvData.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "employees.csv";
    link.click();
  };

  const stats = {
    nationality: employeeData.reduce((acc, emp) => {
      acc[emp.Nationality] = (acc[emp.Nationality] || 0) + 1;
      return acc;
    }, {}),
    type: employeeData.reduce((acc, emp) => {
      acc[emp.Type] = (acc[emp.Type] || 0) + 1;
      return acc;
    }, {}),
    status: employeeData.reduce((acc, emp) => {
      acc[emp.Status] = (acc[emp.Status] || 0) + 1;
      return acc;
    }, {}),
  };

  return (
    <div className="w-full min-h-screen bg-[#F9FCFC] flex flex-col">
      <div className="h-24 bg-white flex items-center border-b-2 border-gray-100">
        <div className="px-10 text-3xl font-semibold text-gray-800">
          Employees
        </div>
      </div>

      <div className="w-full min-h-screen bg-gray-100">
        {isUploaded ? (
          <div className="w-full min-h-screen bg-gray-100 p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Employee Dashboard</h1>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Upload File
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Nationality</h2>
                <ul>
                  {Object.entries(stats.nationality).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Employee Type</h2>
                <ul>
                  {Object.entries(stats.type).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Employee Status</h2>
                <ul>
                  {Object.entries(stats.status).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by name"
                  className="border border-gray-300 rounded-md p-2 w-1/3"
                />
                <button
                  onClick={handleExport}
                  className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center gap-2"
                >
                  <BsDownload /> Export
                </button>
              </div>

              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Role</th>
                    <th className="border border-gray-300 p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {employee.Name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {employee.Email}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {employee.Role}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {employee.Status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-3/5 w-full items-center justify-center mt-10 mx-10 bg-white border-2 border-gray-300 rounded-3xl">
            <div className="m-2 flex flex-col items-center justify-center">
              <LuUserRoundSearch className="my-2 text-9xl" />
              <h1 className="my-2 text-3xl font-bold text-gray-700">
                Start Building Your Team
              </h1>
              <p className="my-2 text-lg text-gray-500">
                Upload a CSV file to get started. Drag and drop your file into
                the upload area or click the button below to select a file from
                your computer.
              </p>
              <button
                className="mt-5 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setModalOpen(true)}
              >
                Upload File
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Upload Employee Data</h2>
            <p className="text-gray-500 mb-4">
              Drag and drop your CSV file here or click to select one.
            </p>
            <div className="flex flex-col items-center justify-center mt-10">
              {/* File Upload Button */}
              <button
                onClick={() =>
                  document.getElementById("fileUploadInput").click()
                }
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Upload File
              </button>

              {/* Hidden File Input */}
              <input
                id="fileUploadInput"
                type="file"
                accept=".csv, .xls"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {uploadSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          File uploaded successfully!
        </div>
      )}
    </div>
  );
};

export default Employees;

// "use client";

// import React, { useContext, useState } from "react";
// import FileUploadModal from "@/components/FileUploadModal";
// import EmployeesPreUpload from "@/components/PreUploadEmployee";
// import EmployeePostUpload from "@/components/PostUploadDashboard";

// const Employees = () => {
//   const [isUploaded, setIsUploaded] = useState(false); // Toggle between views
//   const [employeeData, setEmployeeData] = useState([]); // Store parsed data
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state

//   const handleSuccess = (data) => {
//     setIsUploaded(true);
//     setEmployeeData(data);
//     setIsUploaded(true); // Show dashboard after success
//     setModalOpen(false);
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#F9FCFC] flex flex-col">
//       {/* Header */}
//       <div className="h-24 bg-white flex items-center border-b-2 border-gray-100">
//         <div className="px-10 text-3xl font-semibold text-gray-800">
//           Employees
//         </div>
//       </div>
//       <div className="w-full min-h-screen bg-gray-100">

//         {isUploaded ? (
//           <EmployeePostUpload data={employeeData} />
//         ) : (
//           <EmployeesPreUpload onUploadClick={() => setModalOpen(true)} />
//         )}

//         {isModalOpen &&(
//           <FileUploadModal
//             onClose={() => setModalOpen(false)}
//             onSuccess={handleSuccess}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Employees;
