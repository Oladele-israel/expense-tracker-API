import React from "react";
import {
  FileText,
  Filter,
  Trash2,
  Edit3,
  ChevronDown,
  Download,
  Search,
} from "lucide-react"; // Lucide icons for visuals
import ExpiredTable from "../components/ExpiredTable";

const ExpiredProduct = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen lg:w-[95vw]">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            Expired Products
          </h2>
          <p className="text-gray-600 mb-4">Manage your expired products</p>
        </div>

        <div className="">
          <button className="bg-red-500 text-white p-2 rounded-md mr-2">
            <FileText />
          </button>
          <button className="bg-green-500 text-white p-2 rounded-md">
            <Download />
          </button>
        </div>
      </div>

      {/* Search and Sort/Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-evenly gap-4 mb-6 mt-2">
        <div className="relative w-full md:w-1/3 mr-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        <div className="flex items-center gap-5">
          {/* <button className="bg-blue-50 text-gray-900 px-4 py-2 rounded-md flex items-center gap-2">
           
            Sort by Date
          </button> */}
          <select
            name=""
            id=""
            className="p-2 rounded-md bg-gray-100 text-gray-700 font-semibold"
          >
            <option value="">Expired</option>
            <option value="">Close to expiration</option>
            <option value="">New</option>
          </select>
        </div>
      </div>

      {/* Products Table */}

      <ExpiredTable />
    </div>
  );
};

export default ExpiredProduct;
