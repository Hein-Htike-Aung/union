import { create } from "zustand";

type State = {
  user: User | null;
};

type Action = {
  updateUser: (user: State["user"]) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user: user })),
}));
