// store.js
import { create } from "zustand";

const useModalStore = create((set) => ({
  isModalOpen: false,
  modalContent: null, // To distinguish between Edit or Delete action
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
}));

export default useModalStore;
