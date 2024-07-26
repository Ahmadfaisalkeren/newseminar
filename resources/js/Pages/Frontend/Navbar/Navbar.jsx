import React, { useState, useEffect, useRef } from "react";
import Logo from "../../../assets/logo.png";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { FaBars, FaMoneyBill1Wave } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuth } from "../../Auth/AuthContext";
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import DefaultImage from "../../../assets/defaultProfile.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(false);
    const { user, logoutUser } = useAuth();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleNavLinkClick = (event, targetLink) => {
        event.preventDefault();
        navigate(targetLink);
        setIsOpen(false);
    };

    const handleLogout = () => {
        setIsDropdownOpen(false);
        logoutUser();
    };

    return (
        <div className="p-2 w-full shadow-lg bg-white">
            <div className="flex container mx-auto justify-between">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center"
                >
                    <img
                        src={Logo}
                        alt="Image Not Found"
                        className="w-[20px] h-[30px]"
                    />
                    <span className="mt-2 text-lg font-semibold text-primary">
                        eminar
                    </span>
                </button>
                {/* Sidebar Right Side */}
                <div className="hidden md:flex">
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex text-primary text-base mt-2 font-medium hover:text-sky-700 duration-300 mr-2"
                            >
                                {user.name}
                                <img
                                    src={user.image ? user.image : DefaultImage}
                                    alt="Invalid image"
                                    className="rounded-full w-7 h-7 ml-1 border border-tertiary"
                                />
                                {isDropdownOpen ? (
                                    <MdOutlineKeyboardArrowUp className="mt-1" />
                                ) : (
                                    <MdOutlineKeyboardArrowDown className="mt-1" />
                                )}
                            </button>
                            {isDropdownOpen && (
                                <ul className="text-sm w-40 font-medium bg-white rounded-lg shadow-lg p-1 absolute top-[40px] left-[-40px]">
                                    {user?.role === "admin" ? (
                                        <>
                                            <li className="">
                                                <button
                                                    onClick={() =>
                                                        navigate("/dashboard")
                                                    }
                                                    className="flex items-center text-primary rounded-lg hover:bg-sky-300 hover:text-white duration-300 p-2 w-full text-left"
                                                >
                                                    <span className="mr-1">
                                                        <FaMoneyBill1Wave />
                                                    </span>
                                                    Dashboard
                                                </button>
                                            </li>
                                            <li className="">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center text-primary rounded-lg hover:bg-sky-300 hover:text-white duration-300 p-2 w-full text-left"
                                                >
                                                    <span className="mr-1">
                                                        <FaArrowLeft />
                                                    </span>
                                                    Logout
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/myseminar/${user.id}`
                                                        )
                                                    }
                                                    className="flex items-center text-primary rounded-lg hover:bg-sky-300 hover:text-white duration-300 p-2 w-full text-left"
                                                >
                                                    <span className="mr-1">
                                                        <FaMoneyBill1Wave
                                                            size={20}
                                                        />
                                                    </span>
                                                    My Seminar
                                                </button>
                                            </li>
                                            <li className="">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/myprofile/${user.id}`
                                                        )
                                                    }
                                                    className="flex items-center text-primary rounded-lg hover:bg-sky-300 hover:text-white duration-300 p-2 w-full text-left"
                                                >
                                                    <span className="mr-2">
                                                        <CgProfile size={20} />
                                                    </span>
                                                    My Profile
                                                </button>
                                            </li>
                                            <li className="">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center text-primary rounded-lg hover:bg-sky-300 hover:text-white duration-300 p-2 w-full text-left"
                                                >
                                                    <span className="mr-2">
                                                        <FaArrowLeft
                                                            size={15}
                                                        />
                                                    </span>
                                                    Logout
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setAuthModal(true)}
                            className="text-primary text-base mt-2 hover:mt-1 hover:mr-1 font-medium hover:text-sky-700 duration-300 mr-2"
                        >
                            Login / Sign Up
                        </button>
                    )}
                </div>
                {/* Mobile Mode */}
                <div className="flex items-center md:hidden">
                    {isOpen ? (
                        <FaTimes
                            className="w-7 h-7 ml-2 text-primary cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    ) : (
                        <FaBars
                            className="w-7 h-7 ml-2 text-primary cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    )}
                </div>
                <div
                    className={`md:hidden absolute top-20 left-0 w-full bg-white z-10 overflow-hidden transition-all duration-300 ${
                        isOpen ? "h-auto opacity-100" : "h-0 opacity-0"
                    }`}
                >
                    <ul
                        className={`${
                            isOpen ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300`}
                    >
                        {user ? (
                            <ul>
                                <li className="">
                                    <button
                                        onClick={() => navigate("/home")}
                                        className="block py-2 px-4 text-primary"
                                    >
                                        Home
                                    </button>
                                </li>
                                <li className="">
                                    <button
                                        onClick={logoutUser}
                                        className="block py-2 px-4 text-primary"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        ) : (
                            <li>
                                <button
                                    onClick={() => setAuthModal(true)}
                                    className="block py-2 px-4 text-primary"
                                >
                                    Login / Sign Up
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
        </div>
    );
};

export default Navbar;
