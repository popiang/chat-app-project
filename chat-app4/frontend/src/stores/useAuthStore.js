import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth: ", error.response.data.message);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        try {
            set({ isSigningUp: true });
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Signup successful");
        } catch (error) {
            console.log(
                "Error in signup method: ",
                error.response.data.message,
            );
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        try {
            set({ isLogginIn: true });
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Login successful");
        } catch (error) {
            console.log("Error in login method: ", error.response.data.message);
            toast.error(error.response.data.message);
        } finally {
            set({ isLogginIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successful");
        } catch (error) {
            console.log(
                "Error in logout method: ",
                error.response.data.message,
            );
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        try {
            set({ isUpdatingProfile: true });
            const updateResponse = await axiosInstance.put(
                "/auth/update-profile",
                data,
            );
            set({ authUser: updateResponse.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log(
                "Error in updateProfile method: ",
                error.response.data.message,
            );
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));
