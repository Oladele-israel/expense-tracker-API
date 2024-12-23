import { Edit, Trash } from "lucide-react";
import useModalStore from "../store";
import { expiredProducts } from "../Data";

const ExpiredTable = () => {
  const { openModal } = useModalStore();

  const handleEditClick = (product) => {
    openModal({
      title: "Edit Product",
      description: `You are about to edit ${product.name}. Please confirm.`,
    });
  };

  const handleDeleteClick = (product) => {
    openModal({
      title: "Delete Product",
      description: `Are you sure you want to delete ${product.name}? This action cannot be undone.`,
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-8 lg:m-0 lg:mr-24 lg:mt-7 border lg:w-[90vw]">
      {/* Header: Expired Products and View All */}
      <div className="flex justify-between items-center mb-4 border-b p-2">
        <h2 className="text-2xl font-semibold text-gray-800">
          Expired Products
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Products
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Manufactured Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Expired Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {expiredProducts.map((product, index) => (
              <tr
                key={product.id}
                className={`${index % 2 === 0 ? "bg-gray-50" : ""} border-t`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.sku}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.manufactured}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.expired}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 flex space-x-4">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpiredTable;
