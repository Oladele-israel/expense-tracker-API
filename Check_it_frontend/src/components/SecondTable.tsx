import { products } from "../Data";

const SecondTable = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-8 lg:m-0 lg:w-5/12 lg:mr-24">
      {/* Header: Recent Products and View All */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Recent Products
        </h2>
        <button className="text-blue-600 hover:underline">View All</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
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
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
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
                  {product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecondTable;
