import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
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
        } catch (error) {
            console.log("Error in signup: ", error.response.data.message);
			toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

	login: async (data) => {
		try {
			set({isLoggingIn: true});
			const res = await axiosInstance.post("/auth/login", data);
			set({authUser: res.data});
			toast.success("Logged in successfully");
		} catch (error) {
			console.log("Error in login: ", error.response.data.message);
			toast.error(error.response.data.message);
		} finally {
			set({isLoggingIn: false});
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({authUser: null});
			toast.success("Logged out successfully");
		} catch (error) {
			console.log("Error in logout: ", error.response.data.message);
			toast.error(error.response.data.message);
		}
	}
}));
