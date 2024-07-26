import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [seminars, setSeminars] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCountUsers();
        fetchCountSeminars();
        fetchCountCategories();
    }, []);

    const fetchCountUsers = async () => {
        try {
            const response = await axios.get("/api/countUsers");
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error Fetch User:", error.message);
        }
    };

    const fetchCountSeminars = async () => {
        try {
            const response = await axios.get("/api/countSeminars");
            setSeminars(response.data.seminars);
        } catch (error) {
            console.error("Error Fetch User:", error.message);
        }
    };

    const fetchCountCategories = async () => {
        try {
            const response = await axios.get("/api/countCategories");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Error Fetch User:", error.message);
        }
    };

    return (
        <div className="w-full h-full rounded-lg shadow-md bg-white mt-5">
            <div className="p-3 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-gradient-to-r from-indigo-400 to-cyan-400 min-h-[100px] relative">
                    <FaUser
                        className="absolute top-0 left-0 m-2 text-white opacity-30"
                        size={70}
                    />
                    <p className="p-2 text-white font-base text-base">
                        Users Data
                    </p>
                    <p className="p-2 text-white font-base text-3xl flex justify-end">
                        {users}
                    </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-purple-500 to-purple-900 min-h-[100px] relative">
                    <GiTeacher className="absolute top-0 left-0 m-2 text-white opacity-30" size={70} />
                    <p className="p-2 text-white font-base text-base">
                        Seminar Data
                    </p>
                    <p className="p-2 text-white font-base text-3xl flex justify-end">
                        {seminars}
                    </p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-blue-400 to-emerald-400 min-h-[100px]">
                    <p className="p-2 text-white font-base text-base">
                        Category Data
                    </p>
                    <p className="p-2 text-white font-base text-3xl flex justify-end">
                        {categories}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
