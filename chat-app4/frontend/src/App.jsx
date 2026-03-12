import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

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
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={authUser ? <Home /> : <Navigate to="/" />}
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
        </div>
    );
}

export default App;
