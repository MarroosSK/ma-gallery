import { create } from "zustand";

type ImagePreviewStore = {
  url?: string;
  setUrl: (url: string | undefined) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const usePreviewImage = create<ImagePreviewStore>((set) => ({
  url: undefined,
  setUrl: (url: string | undefined) => set({ url }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
