import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme") || "synthwave",
    setTheme: (theme) => {
        localStorage.setItem("theme", theme);
        set({ theme });
    },
}));
