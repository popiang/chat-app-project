import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./stores/useAuthStore";
import { useThemeStore } from "./stores/useThemeStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const { theme } = useThemeStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div data-theme={theme}>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={authUser ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                    path="/signup"
                    element={authUser ? <Navigate to="/" /> : <SignupPage />}
                />
                <Route
                    path="/login"
                    element={authUser ? <Navigate to="/" /> : <LoginPage />}
                />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                    path="/profile"
                    element={authUser ? <ProfilePage /> : <Navigate to="/" />}
                />
            </Routes>

            <Toaster />
        </div>
    );
}

export default App;
