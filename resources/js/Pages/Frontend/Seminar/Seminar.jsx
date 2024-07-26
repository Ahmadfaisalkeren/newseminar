import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Seminar = () => {
    const [upcomingSeminars, setUpcomingSeminars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSeminars();
    }, []);

    const fetchSeminars = async () => {
        try {
            const response = await axios.get("/api/upcomingSeminars");
            setUpcomingSeminars(response.data.upcomingSeminars);
        } catch (error) {
            console.error("Error Fetching Seminars", error.message);
        }
    };
    return (
        <div className="container mx-auto p-5 lg:p-0">
            <div className="flex justify-between mb-5 mt-5">
                <div className="flex items-center">
                    <div className="h-8 w-2 bg-secondary mr-2"></div>
                    <p className="text-center font-bold text-xl text-primary">
                        Upcoming Seminars
                    </p>
                </div>
            </div>
            {upcomingSeminars.map((seminar, index) => (
                <div
                    key={index}
                    className="grid md:grid-cols-3 sm:grid-cols-1 gap-6"
                >
                    <button
                        onClick={() => navigate(`/sd/${seminar.id}`)}
                        className="group relative items-center justify-center overflow-hidden hover:shadow-xl hover:shadow-black/30 transition-shadow rounded-3xl"
                    >
                        <div>
                            <img
                                className="h-[350px] w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
                                src={seminar.image}
                                alt="Image Not Found"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[25%] group-hover:translate-y-0 transition-all duration-500">
                            <h1 className="text-xl font-bold text-white">
                                {seminar.title}
                            </h1>
                            <p className="text-md font-medium text-white">
                                {seminar.seminar_date}
                            </p>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Seminar;
