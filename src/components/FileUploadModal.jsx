import React, { useState } from "react";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuFileSpreadsheet } from "react-icons/lu";
import { PiFoldersDuotone } from "react-icons/pi";

export default function FileUploadModal({ onClose, onSuccess, onFileUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // const handleFileUpload = (data) => {
  //   const parsedData = data.map((row, index) => ({
  //     id: index + 1,
  //     name: row.Name || "Unknown",
  //     email: row.Email || "Unknown",
  //     role: row.Role || "Unknown",
  //     status: row.Status || "Unknown",
  //     nationality: row.Nationality || "Unknown",
  //     type: row.Type || "Unknown",
  //   }));
  // };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    validateAndProcessFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    validateAndProcessFiles(files);
  };

  const validateAndProcessFiles = (files) => {
    const validFiles = Array.from(files).filter(
      (file) =>
        file.type === "application/vnd.ms-excel" || file.type === "text/csv"
    );

    if (validFiles.length) {
      const file = validFiles[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const csvText = event.target.result;
        const data = parseCSV(csvText);

        onFileUpload(data); // Pass parsed data to parent
        setUploadSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 1000);
      };

      reader.readAsText(file);
    } else {
      alert("Only .xls and .csv files are allowed.");
    }
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[40rem] h-[38rem] p-6 rounded-xl shadow-lg flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload File</h2>
          <button onClick={onClose} className="text-center text-2xl">
            ×
          </button>
        </div>

        {!uploadSuccess ? (
          <>
            <div className="flex flex-col">
              <label
                className={`py-20 w-full border-2 border-dashed rounded-2xl bg-gray-100 flex flex-col gap-4 items-center justify-center ${
                  dragActive && "border-[#02B9B0]"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <PiFoldersDuotone className="text-6xl text-gray-500" />
                <p className="text-gray-500 text-center">
                  Drag and drop your files here <br /> or click to upload.
                </p>
                <input
                  type="file"
                  accept=".xls,.csv"
                  className="hidden"
                  id="fileInput"
                  onChange={handleFileSelect}
                />
              </label>
              <div className="flex flex-row justify-between text-sm font-medium text-gray-300">
                <p>Supported formats: XLS, CSV</p>
                <p>Maximum file size: 25MB</p>
              </div>
              <div className="flex flex-1 items-center justify-center gap-4 overflow-hidden bg-gray-100 rounded-2xl my-6 p-2">
                <LuFileSpreadsheet className="m-1 flex-shrink-0 text-5xl text-gray-500" />
                <div className="flex-1 text-sm w-[300px]">
                  <h1 className=" my-1 text-gray-500 font-bold">
                    Table Example
                  </h1>
                  <p className="text-gray-500 break-words">
                    You can download the attached example and use them as a
                    starting point for your file.
                  </p>
                </div>
                <button className="p-1 px-3 flex items-center text-sm gap-2 rounded-xl  bg-white border-2 border-gray-300">
                  <LiaDownloadSolid className="text-lg" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 border-4 border-green-500 rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-green-500 mt-4">
              File Uploaded Successfully!
            </p>
          </div>
        )}

        <div className="flex flex-row justify-end gap-4 mt-6">
          {!uploadSuccess && (
            <button
              onClick={onClose}
              className="p-2 px-4 rounded-xl flex items-center bg-gray-100 gap-2 border-2 border-gray-300"
            >
              Cancel
            </button>
          )}
          {!uploadSuccess && (
            <label
              htmlFor="fileInput"
              className="p-2 px-4 flex items-center text-center bg-[#02B9B0] text-white rounded-lg cursor-pointer"
            >
              Continue
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

// <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//   <div className="bg-white w-[40rem] h-[38rem] p-6 rounded-xl shadow-lg flex flex-col justify-between content-between">
//     <div className="flex justify-between items-center mb-4">
//       <h2 className="text-xl font-semibold">Upload File</h2>
//       <button onClick={onClose} className="text-center text-2xl top-0">
//         ×
//       </button>
//     </div>
//     <div className="flex flex-col">
//       <div
//         className={`py-20 w-full border-2 border-dashed rounded-2xl bg-gray-100 flex flex-col gap-4 items-center justify-center ${
//           dragActive && "border-[#02B9B0] bg-gray-100"
//         }`}
//         onDragEnter={handleDrag}
//         onDragOver={handleDrag}
//         onDragLeave={handleDrag}
//         onDrop={handleDrop}
//       >
//         <PiFoldersDuotone className="text-6xl text-gray-500" />
//         <p className="text-gray-500 text-center">
//           Drag and drop your files here <br /> or click to upload.
//         </p>
//         <input
//           type="file"
//           accept=".xls,.csv"
//           className="hidden"
//           id="fileInput"
//           onChange={handleFileSelect}
//         />
//       </div>
//       <div className=" flex flex-row justify-between text-sm font-medium text-gray-300">
//         <p>Supported formats: XLS,CSV</p>
//         <p>Maximum file size: 25MB</p>
//       </div>
//     </div>
//     <div className="flex flex-1 items-center justify-center gap-4 overflow-hidden bg-gray-100 rounded-2xl my-6 p-2">
//       <LuFileSpreadsheet className="m-1 flex-shrink-0 text-5xl text-gray-500" />
//       <div className="flex-1 text-sm w-[300px]">
//         <h1 className=" my-1 text-gray-500 font-bold">Table Example</h1>
//         <p className="text-gray-500 break-words">
//           You can download the attached example and use them as a starting
//           point for your file.
//         </p>
//       </div>
//       <button className="p-1 px-3 flex items-center text-sm gap-2 rounded-xl  bg-white border-2 border-gray-300">
//         <LiaDownloadSolid className="text-lg" />
//         <span>Download</span>
//       </button>
//     </div>

//     <div className="flex flex-row justify-end gap-4 mt-6">
//       <button
//         onClick={onClose}
//         className=" p-2 px-4 shover:bg-gray-400 rounded-xl flex items-center bg-gray-100 gap-2 border-2 border-gray-300"
//       >
//         Cancel
//       </button>
//       <label
//         htmlFor="fileInput"
//         className="p-2 px-4 flex items-center text-center bg-[#02B9B0] text-white rounded-lg cursor-pointer"
//       >
//         Continue
//       </label>
//     </div>
//   </div>
// </div>
