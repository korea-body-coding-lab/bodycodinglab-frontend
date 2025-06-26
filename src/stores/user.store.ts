import { create } from "zustand";

interface User {
  userId: number;
  role: string;
  username: string;
  name: string;
  profileImageUrl: string | null;
  trainerStatus?: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  setName: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  setName: (name) => set((state) =>
      state.user ? { user: { ...state.user, name } } : {}
  ),
}));