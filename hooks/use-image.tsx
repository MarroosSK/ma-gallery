import { create } from "zustand";

type ImageStore = {
  url?: string;
  albumId?: string | undefined;
  setAlbumId: (id: string | undefined) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useImage = create<ImageStore>((set) => ({
  url: undefined,
  albumId: undefined,
  setAlbumId: (id: string | undefined) => set({ albumId: id }), // Tu nastavíme albumId
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
