import React from "react";
import { Link } from "react-router-dom";
import Image404 from "../../assets/404.png"

const NotFound = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <img src={Image404} alt="404 Not Found" className="w-[100px] mb-4" />
            <h1 className="text-4xl font-bold text-black mb-4">
                404 - Page Not Found
            </h1>
            <p className="text-lg text-black mb-4">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link to="/home">
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                    Go to Home
                </button>
            </Link>
        </div>
    );
};

export default NotFound;
