import { useState } from "react";
import { PlusCircle, Clipboard } from "lucide-react";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    manufacturer: "",
    manufacturingDate: "",
    expiryDate: "",
    bestBeforeDate: "",
    quantity: "",
    packagingType: "pack",
    quantityPerPackage: "",
    barcode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-50 shadow-lg rounded-lg w-full mx-auto lg:w-[95vw] lg:h-[100vh] "
    >
      <h2 className="mb-10">breadcrums</h2>
      <h2 className="text-2xl font-semibold text-blue-800 mb-10 flex items-center">
        <Clipboard className="mr-2 m" /> Product Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product name"
          />
        </div>

        {/* SKU */}

        {/* Description */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product description"
            rows="2"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="flex items-center">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 flex-grow"
            >
              <option>Choose</option>
              <option>Category 1</option>
              <option>Category 2</option>
            </select>
            <PlusCircle className="ml-2 text-blue-600 cursor-pointer" />
          </div>
        </div>

        {/* Manufacturer */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Manufacturer
          </label>
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter manufacturer's name"
          />
        </div>

        {/* Manufacturing Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Manufacturing Date
          </label>
          <input
            type="date"
            name="manufacturingDate"
            value={formData.manufacturingDate}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Expiry Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Best Before Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Best Before Date
          </label>
          <input
            type="date"
            name="bestBeforeDate"
            value={formData.bestBeforeDate}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter total quantity"
          />
        </div>

        {/* Packaging Type */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Packaging Type
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="packagingType"
              value="pack"
              checked={formData.packagingType === "pack"}
              onChange={handleChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700">Pack</span>
            <input
              type="radio"
              name="packagingType"
              value="carton"
              checked={formData.packagingType === "carton"}
              onChange={handleChange}
              className="ml-4 form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700">Carton</span>
          </div>
        </div>

        {/* Quantity Per Package */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Quantity Per {formData.packagingType === "pack" ? "Pack" : "Carton"}
          </label>
          <input
            type="number"
            name="quantityPerPackage"
            value={formData.quantityPerPackage}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Enter quantity per ${formData.packagingType}`}
          />
        </div>

        {/* Barcode */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Barcode
          </label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter barcode"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6 md:col-span-2 lg:col-span-3">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-[80vw] ml-auto mr-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;
