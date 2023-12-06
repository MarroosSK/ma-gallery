import { create } from "zustand";

type SidebarStore = {
  isUpdated: boolean;
  onUpdate: () => void;
  onDoneUpdate: () => void;
};

export const useSidebarUpdate = create<SidebarStore>((set) => ({
  isUpdated: false,
  onUpdate: () => set({ isUpdated: true }),
  onDoneUpdate: () => set({ isUpdated: false }),
}));
