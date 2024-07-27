import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaBars, FaBell, FaUser } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { useAuth } from "../../../Auth/AuthContext";
import echo from "../../../../echo";
import axios from "axios";

const Navbar = ({ toggleSidebar }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { logoutUser } = useAuth();
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("/api/notifications");
                setNotifications(response.data.notifications);
                setNotificationCount(
                    response.data.notifications.filter((n) => !n.is_read).length
                );
            } catch (error) {
                console.error("Error Fetching Notifications:", error.message);
            }
        };

        fetchNotifications();

        const channel = echo.channel("admin-notifications");

        channel.listen("OrderPaid", (data) => {
            setNotifications((prevNotifications) => [
                {
                    id: data.order.id,
                    message: `${data.order.user.name} has successfully ordered ${data.order.seminar.title}`,
                    is_read: false,
                },
                ...prevNotifications,
            ]);
            setNotificationCount((prevCount) => prevCount + 1);
        });

        return () => {
            channel.stopListening("OrderPaid");
        };
    }, []);

    const handleBellClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleMarkAsRead = async () => {
        try {
            await axios.put("/api/notification/markAllAsRead");
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) => ({
                    ...notification,
                    is_read: true,
                }))
            );
            setNotificationCount(0);
        } catch (error) {
            console.error("Error marking notifications as read", error);
        }
    };

    return (
        <div className="flex">
            <div className="w-full bg-white p-2 h-[45px] shadow-md text-sky-600 rounded-xl text-xl">
                <div className="flex justify-between">
                    <button onClick={toggleSidebar}>
                        <FaBars size={25} />
                    </button>
                    <div className="flex relative">
                        <div className="relative">
                            <button
                                onClick={handleBellClick}
                                className="mr-2 relative"
                            >
                                <FaBell size={25} />
                                {notificationCount > 0 && (
                                    <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-red-600 rounded-full border border-red-900">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-7 right-0 w-64 bg-white rounded-lg shadow-lg z-50">
                                    <div className="p-2">
                                        <p className="text-gray-600 text-base text-center font-semibold">
                                            Notifications
                                        </p>
                                        <ul className="">
                                            {notifications.length === 0 ? (
                                                <li className="p-2 text-sm text-center text-gray-500">
                                                    No notification found
                                                </li>
                                            ) : (
                                                notifications.map(
                                                    (notification, index) => (
                                                        <li
                                                            key={index}
                                                            className={`px-2 py-1 text-sm rounded-lg ${
                                                                notification.is_read
                                                                    ? "bg-white"
                                                                    : "bg-gray-200"
                                                            }`}
                                                        >
                                                            {
                                                                notification.message
                                                            }
                                                            <div className="w-full h-[1px] bg-gray-300"></div>
                                                        </li>
                                                    )
                                                )
                                            )}
                                        </ul>
                                        {notifications.length > 0 && (
                                            <button
                                                onClick={handleMarkAsRead}
                                                className={`mt-2 w-full py-1 text-white text-sm rounded-lg ${
                                                    notificationCount > 0
                                                        ? "bg-blue-500 hover:bg-blue-600"
                                                        : "bg-blue-300"
                                                }`}
                                                disabled={
                                                    notificationCount === 0
                                                }
                                            >
                                                Mark All as Read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="mr-2"
                            >
                                <FaUser size={25} />
                            </button>
                            {isOpen && (
                                <ul className="text-sm font-medium bg-white rounded-lg shadow-lg p-1 absolute top-[55px] right-0">
                                    <li className="">
                                        <a
                                            href="#"
                                            className="flex items-center text-sky-600 rounded-lg hover:bg-sky-300 duration-300 p-2"
                                        >
                                            <span className="mr-1">
                                                <FaPerson />
                                            </span>
                                            Profile
                                        </a>
                                    </li>
                                    <li className="">
                                        <button
                                            onClick={logoutUser}
                                            className="flex items-center text-sky-600 rounded-lg hover:bg-sky-300 duration-300 p-2 w-full text-left"
                                        >
                                            <span className="mr-1">
                                                <FaArrowLeft />
                                            </span>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
