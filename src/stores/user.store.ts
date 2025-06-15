import { create } from "zustand";

interface UserState {
  name: string;
  isLogin: boolean;
  setLogin: (name: string) => void;
  setLogout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLogin: false,
  name: '',
  setLogin: (name) => set({ isLogin: true, name }),
  setLogout: () => set({ isLogin: false, name: '' })
}));