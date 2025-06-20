import { create } from "zustand";

interface AuthState {
  token: string | null;
  exprTime: number | null;
  isLogin: boolean;
  setLogin: (token: string) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  exprTime: null,
  isLogin: false,
  setLogin: (token) => set({ isLogin: true, token }),
  setLogout: () => set({ isLogin: false, token: null, exprTime: null })
}));