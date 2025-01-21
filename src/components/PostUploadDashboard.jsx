import React, { useState } from "react";
import { BsDownload } from "react-icons/bs";
import FileUploadModal from "@/components/FileUploadModal";

const EmployeePostUpload = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  debugger;
  //not working infact should not work
  const handleFileUpload = (data) => {
    const parsedData = data.map((row, index) => ({
      id: index + 1,
      name: row.Name || "Unknown",
      email: row.Email || "Unknown",
      role: row.Role || "Unknown",
      status: row.Status || "Unknown",
      nationality: row.Nationality || "Unknown",
      type: row.Type || "Unknown",
    }));
    setEmployees(parsedData);
    setFilteredEmployees(parsedData);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  //for Downloading
  const handleExport = () => {
    const csvData = [
      ["ID", "Name", "Email", "Role", "Status", "Nationality", "Type"],
      ...filteredEmployees.map((row) => [
        row.id,
        row.name,
        row.email,
        row.role,
        row.status,
        row.nationality,
        row.type,
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
    nationality: employees.reduce((acc, emp) => {
      acc[emp.nationality] = (acc[emp.nationality] || 0) + 1;
      return acc;
    }, {}),
    type: employees.reduce((acc, emp) => {
      acc[emp.type] = (acc[emp.type] || 0) + 1;
      return acc;
    }, {}),
    status: employees.reduce((acc, emp) => {
      acc[emp.status] = (acc[emp.status] || 0) + 1;
      return acc;
    }, {}),
  };

  return (
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

      {isModalOpen && (
        <FileUploadModal
          onClose={() => setModalOpen(false)}
          onFileUpload={handleFileUpload}
        />
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Nationality Stats</h2>
          <ul>
            {Object.entries(stats.nationality).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Employee Type Stats</h2>
          <ul>
            {Object.entries(stats.type).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Status Stats</h2>
          <ul>
            {Object.entries(stats.status).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Filters and Table Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name"
            className="border border-gray-300 rounded-md p-2 w-1/3"
          />
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded-md p-2">
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Invite Sent">Invite Sent</option>
              <option value="Payroll Only">Payroll Only</option>
            </select>
            <select className="border border-gray-300 rounded-md p-2">
              <option value="">Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <button
              onClick={handleExport}
              className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center gap-2"
            >
              <BsDownload /> Export
            </button>
          </div>
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
            {filteredEmployees.map((employee) => (
              <tr>
                <td className="border border-gray-300 p-2">{employee.id}</td>
                <td className="border border-gray-300 p-2">{employee.name}</td>
                <td className="border border-gray-300 p-2">{employee.email}</td>
                <td className="border border-gray-300 p-2">{employee.role}</td>
                <td className="border border-gray-300 p-2">
                  {employee.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePostUpload;
