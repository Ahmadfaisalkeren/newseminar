import React, { useState } from "react";
import RockModal from "../../../components/rockmodal/RockModal";
import { useAuth } from "../../Auth/AuthContext";
import Loader from "../../../components/loader/Loader";

const AuthModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setNameSignUp] = useState("");
    const [emailSignUp, setEmailSignUp] = useState("");
    const [passwordSignUp, setPasswordSignUp] = useState("");
    const [password_confirmation, setPasswordConfirmationSignUp] = useState("");
    const { loginUser, signupUser, loading, emailVerificationError } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        await loginUser(formData);

        setEmail("");
        setPassword("");
        onClose();
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", emailSignUp);
        formData.append("password", passwordSignUp);
        formData.append("password_confirmation", password_confirmation);

        await signupUser(formData);

        setEmailSignUp("");
        setPasswordSignUp("");
        setPasswordConfirmationSignUp("");
        setNameSignUp("");
        setSignupSuccess(true);
    };

    const handleClose = () => {
        setEmail("");
        setPassword("");
        setNameSignUp("");
        setEmailSignUp("");
        setPasswordSignUp("");
        setPasswordConfirmationSignUp("");
        setError(null);
        setSignupSuccess(false);
        onClose();
    };

    return (
        <>
            <RockModal
                width={40}
                isOpen={isOpen}
                onClose={handleClose}
                type="solid"
            >
                <div className="container mt-10">
                    <div className="mx-auto">
                        {!signupSuccess ? (
                            <>
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
                                            {emailVerificationError && (
                                                <div className="text-red-600 mb-4 text-center">
                                                    {emailVerificationError}
                                                </div>
                                            )}
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                                            />
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
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
                                                onChange={(e) =>
                                                    setNameSignUp(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={emailSignUp}
                                                onChange={(e) =>
                                                    setEmailSignUp(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                                            />
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={passwordSignUp}
                                                onChange={(e) =>
                                                    setPasswordSignUp(
                                                        e.target.value
                                                    )
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
                                                {loading ? (
                                                    <Loader />
                                                ) : (
                                                    "Signup"
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4 text-sky-300">
                                    Signup Successful
                                </h2>
                                <p className="text-lg text-gray-700">
                                    Please check your email to verify your
                                    account.
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="mt-4 bg-sky-300 hover:bg-sky-500 duration-300 text-white py-2 px-4 rounded"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </RockModal>
        </>
    );
};

export default AuthModal;
