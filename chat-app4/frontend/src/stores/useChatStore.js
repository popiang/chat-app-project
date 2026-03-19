import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        try {
            set({ isUsersLoading: true });
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            console.log(
                "Error in getUsers method: ",
                error.response.data.message,
            );
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        try {
            set({ isMessagesLoading: true });
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.log(
                "Error in getMessages method: ",
                error.response.data.message,
            );
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
}));
