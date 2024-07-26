import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsJournalBookmark } from "react-icons/bs";
import {
    FaPeopleRoof,
    FaArrowLeftLong,
    FaArrowRightLong,
} from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { TbCategory } from "react-icons/tb";
import { RiPresentationLine } from "react-icons/ri";
import { IoMdArrowDropleft, IoMdArrowDropup } from "react-icons/io";
import { useAuth } from "../../../Auth/AuthContext";
import { PiUsersThree } from "react-icons/pi";

const Sidebar = ({ isMinimized }) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const adminMenu = [
        {
            title: "Dashboard",
            link: "/dashboard",
            icon: <AiOutlineHome />,
        },
        {
            title: "Category",
            link: "/category",
            icon: <TbCategory />,
        },
        {
            title: "Seminar",
            link: "/seminar",
            icon: <RiPresentationLine />,
        },
        {
            title: "Users",
            link: "/users",
            icon: <PiUsersThree />,
        },
    ];

    const handleSetActiveMenu = (menuLink) => {
        setActiveMenu(menuLink);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div
            className={`min-h-screen bg-white text-white transition-all duration-300 ${
                isMinimized ? "w-[78px]" : "w-32"
            } shadow-2xl`}
            style={{ minWidth: isMinimized ? "78px" : "14rem" }}
        >
            <div
                className={`px-6 text-sky-600 text-xl font-semibold justify-center h-16 flex items-center ${
                    isMinimized && "justify-center"
                }`}
            >
                {!isMinimized && (
                    <a href="#" onClick={() => navigate("/")}>
                        NggaweDW
                    </a>
                )}
            </div>
            <nav className="mt-1">
                <ul>
                    {adminMenu.map(
                        (menu, index) => (
                            <li key={index} className="duration-300 mb-2 px-3">
                                <NavLink
                                    to={menu.link}
                                    exact="true"
                                    className={({ isActive }) =>
                                        `flex items-center text-sky-600 hover:bg-sky-300 rounded-lg hover:text-white py-2 pl-4 duration-300 ${
                                            isActive
                                                ? "bg-sky-600 text-white"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        handleSetActiveMenu(menu.link)
                                    }
                                >
                                    <span className="text-xl font-base mr-2 flex">
                                        {menu.icon}
                                    </span>
                                    {!isMinimized && (
                                        <span className="text-base font-medium">
                                            {menu.title}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        )
                    )}
                    {user?.role === "admin" && (
                        <li className="duration-300 mb-2 px-3">
                            <div
                                className={`flex items-center text-sky-600 hover:bg-sky-300 rounded-lg hover:text-white py-2 pl-4 duration-300 cursor-pointer ${
                                    location.pathname.includes("/transactions")
                                        ? "bg-sky-600 text-white"
                                        : ""
                                }`}
                                onClick={toggleDropdown}
                            >
                                <span className="text-xl font-base mr-2 flex">
                                    <GrTransaction />
                                </span>
                                <span className="flex text-base font-medium">
                                    {!isMinimized && "Transactions"}
                                    {isDropdownOpen ? (
                                        <IoMdArrowDropup className="ml-2 mt-1 transition-transform duration-300 transform" />
                                    ) : (
                                        <IoMdArrowDropleft className="ml-2 mt-1 transition-transform duration-300" />
                                    )}
                                </span>
                            </div>
                            <ul
                                className={`pl-3 mt-1 transition-max-height duration-300 overflow-hidden ${
                                    isDropdownOpen ? "max-h-40" : "max-h-0"
                                }`}
                            >
                                <li className="duration-300 mb-2">
                                    <NavLink
                                        to="/transactions/selling"
                                        exact="true"
                                        className={({ isActive }) =>
                                            `flex items-center text-sky-600 hover:bg-sky-300 rounded-lg hover:text-white py-2 duration-300 ${
                                                isActive
                                                    ? "bg-sky-600 text-white"
                                                    : ""
                                            }`
                                        }
                                        onClick={() =>
                                            handleSetActiveMenu(
                                                "/transactions/selling"
                                            )
                                        }
                                    >
                                        <span className="flex ml-2 text-base font-medium">
                                            <FaArrowLeftLong className="mt-1 mr-2" />
                                            {!isMinimized && "Selling"}
                                        </span>
                                    </NavLink>
                                </li>
                                <li className="duration-300 mb-2">
                                    <NavLink
                                        to="/transactions/buying"
                                        exact="true"
                                        className={({ isActive }) =>
                                            `flex items-center text-sky-600 hover:bg-sky-300 rounded-lg hover:text-white py-2 duration-300 ${
                                                isActive
                                                    ? "bg-sky-600 text-white"
                                                    : ""
                                            }`
                                        }
                                        onClick={() =>
                                            handleSetActiveMenu(
                                                "/transactions/buying"
                                            )
                                        }
                                    >
                                        <span className="flex ml-2 text-base font-medium">
                                            <FaArrowRightLong className="mt-1 mr-2" />
                                            {!isMinimized && "Buying"}
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
