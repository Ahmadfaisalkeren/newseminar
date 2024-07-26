import React from "react";

const Footer = () => {
    return (
        <footer className="bg-white text-gray-200 py-5 px-6 mt-5 shadow-lg">
            <div className="border-t-2 border-secondary md:text-left text-center container mx-auto">
                <p className="text-center text-primary font-semibold text-md">
                    &copy; {new Date().getFullYear()} Seminar. All Rights
                    Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
