import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RockToast } from "rocktoast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkUserStatus();
    }, []);

    useEffect(() => {
        let logoutTimer;

        const resetLogoutTimer = () => {
            clearTimeout(logoutTimer);
            logoutTimer = setTimeout(logoutUser, 60 * 60 * 1000);
        };

        const resetTimeOnActivity = () => {
            document.addEventListener("mousemove", resetLogoutTimer);
            document.addEventListener("keydown", resetLogoutTimer);
            resetLogoutTimer();
        };

        resetTimeOnActivity();

        return () => {
            clearTimeout(logoutTimer);
            document.removeEventListener("mousemove", resetLogoutTimer);
            document.removeEventListener("keydown", resetLogoutTimer);
        };
    }, [user]);

    const navigate = useNavigate();

    const loginUser = async (userInfo) => {
        setLoading(true);
        try {
            const response = await axios.post(`/login`, userInfo);
            const { access_token } = response.data;

            localStorage.setItem("access_token", access_token);

            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${access_token}`;

            setUser(response.data.user);
            navigate("/");
            setToastMessage("Login Successful");
            setShowToast(true);
        } catch (error) {
            console.error("Login failed:", error);
            setToastMessage("Login Failed");
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    const signupUser = async (userInfo) => {
        try {
            setLoading(true);
            const response = await axios.post(`/register`, userInfo);
            const { access_token } = response.data;

            localStorage.setItem("access_token", access_token);

            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${access_token}`;

            setUser(response.data.user);
            navigate("/");
            setToastMessage("Sign Up Successful");
            setShowToast(true);
        } catch (error) {
            console.error("Sign Up failed:", error);
            setToastMessage("Sign Up Failed");
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("access_token");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
        navigate("/");
        setToastMessage("Logged Out Successfully");
        setShowToast(true);
    };

    const checkUserStatus = async () => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${access_token}`;
            try {
                const response = await axios.get(`/geni/users`);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error Fetching User:", error);
                logoutUser();
            }
        }
    };

    const contextData = {
        user,
        loginUser,
        signupUser,
        logoutUser,
        loading,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
            {showToast && (
                <RockToast
                    message={toastMessage}
                    duration={3000}
                    onClose={() => setShowToast(false)}
                    position="top-left"
                />
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
