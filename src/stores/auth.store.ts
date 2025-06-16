import { create } from "zustand";

interface AuthState {
  token: string | null;
  exprTime: number | null;
  isLogin: boolean;
  setLogin: (token: string, exprTime: number) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  exprTime: null,
  isLogin: false,
  setLogin: (token, exprTime) => set({ isLogin: true, token, exprTime }),
  setLogout: () => set({ isLogin: false, token: null, exprTime: null })
}));