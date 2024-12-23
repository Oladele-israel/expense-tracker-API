import useModalStore from "../../store";

const Modal = () => {
  const { isModalOpen, closeModal, modalContent } = useModalStore();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {modalContent?.title}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-4 py-6 text-gray-700">
          {modalContent?.description}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end px-4 py-3 border-t space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-600 text-gray-100 rounded-md hover:bg-red-800"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
