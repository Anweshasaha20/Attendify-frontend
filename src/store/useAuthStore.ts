import { create } from "zustand";
import instance from "@/lib/axios";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,

  signUp: async (data: any) => {
    set({ isSigningUp: true });
    const { data: user } = await instance.post("/auth/register", data);
    set({ authUser: user, isSigningUp: false });
  },
  login: async (data: any) => {
    set({ isLoggingIn: true });
    const { data: user } = await instance.post("/auth/login", data);
    set({ authUser: user, isLoggingIn: false });
  },
  logout: async () => {
    await instance.get("/auth/logout");
    set({ authUser: null });
  },
}));
