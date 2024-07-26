import React, { useState } from "react";
import "./Style.css";
import { useAuth } from "./AuthContext";
import Loader from "../../components/loader/Loader";

const Authentication = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setNameSignUp] = useState("");
    const [emailSignUp, setEmailSignUp] = useState("");
    const [passwordSignUp, setPasswordSignUp] = useState("");
    const [password_confirmation, setPasswordConfirmationSignUp] = useState("");
    const { loginUser, signupUser, loading } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);

    const handleInputChange = (e, type) => {
        const { name, value } = e.target;
        if (type === "login") {
            setLoginData({ ...loginData, [name]: value });
        } else {
            setSignupData({ ...signupData, [name]: value });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        await loginUser(formData);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", emailSignUp);
        formData.append("password", passwordSignUp);
        formData.append("password_confirmation", password_confirmation);

        await signupUser(formData);
    };

    return (
        <div className="container mt-10">
            <div className="w-1/2 mx-auto">
                <div className="flex justify-between mb-4">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`w-1/2 py-2 ${
                            isLogin
                                ? "bg-sky-300 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`w-1/2 py-2 ${
                            !isLogin
                                ? "bg-sky-300 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        Signup
                    </button>
                </div>
                <div className="relative w-full h-96 overflow-hidden">
                    <div
                        className={`absolute w-full transition-transform duration-500 ${
                            isLogin
                                ? "transform translate-x-0"
                                : "transform -translate-x-full"
                        }`}
                    >
                        <form onSubmit={handleLogin}>
                            <h2 className="text-2xl font-bold mb-4 text-sky-300 text-center">
                                Login Form
                            </h2>
                            {error && (
                                <div className="text-red-600 mb-4 text-center">
                                    {error}
                                </div>
                            )}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-sky-300 hover:bg-sky-500 duration-300 text-white py-2 rounded flex justify-center"
                            >
                                {loading ? <Loader /> : "Login"}
                            </button>
                        </form>
                    </div>
                    <div
                        className={`absolute w-full transition-transform duration-500 ${
                            !isLogin
                                ? "transform translate-x-0"
                                : "transform translate-x-full"
                        }`}
                    >
                        <form onSubmit={handleSignup}>
                            <h2 className="text-2xl font-bold mb-4 text-sky-300 text-center">
                                Signup Form
                            </h2>
                            {error && (
                                <div className="text-red-600 mb-4 text-center">
                                    {error}
                                </div>
                            )}
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setNameSignUp(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={emailSignUp}
                                onChange={(e) => setEmailSignUp(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={passwordSignUp}
                                onChange={(e) =>
                                    setPasswordSignUp(e.target.value)
                                }
                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                            />
                            <input
                                type="password"
                                name="password_confirmation"
                                placeholder="Password Confirmation"
                                value={password_confirmation}
                                onChange={(e) =>
                                    setPasswordConfirmationSignUp(
                                        e.target.value
                                    )
                                }
                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-sky-300 hover:bg-sky-500 duration-300 text-white py-2 rounded flex justify-center"
                            >
                                {loading ? <Loader /> : "Signup"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
