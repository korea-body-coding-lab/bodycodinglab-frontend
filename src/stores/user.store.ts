import { create } from "zustand";

interface User {
  userId: bigint;
  role: string;
  username: string;
  name: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));