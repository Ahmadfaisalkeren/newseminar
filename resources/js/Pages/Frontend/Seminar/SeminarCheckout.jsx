import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdOutlinePayments } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import axios from "axios";
import RockToast from "../../../components/rocktoast/RockToast";
import Loader from "../../../components/loader/Loader";

const SeminarCheckout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [seminar, setSeminar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        const fetchSeminar = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/seminar/${id}`);
                setSeminar(response.data.seminar);
            } catch (error) {
                console.error("Error Fetching Seminar", error.message);
            }
            setLoading(false);
        };

        fetchSeminar();
    }, [id]);

    const handleTransaction = async () => {
        setIsButtonDisabled(true); // Disable the button immediately
        try {
            const response = await axios.post("/api/invoice", {
                user_id: user.id,
                seminar_id: seminar.id,
                amount: seminar.price,
                email: user.email,
            });

            if (response.status === 200) {
                setShowToast(true);
                setToastMessage("Transaction Successful");
                navigate(`/myseminar/${user.id}`);
            }
        } catch (error) {
            console.error("Error creating order:", error.message);
            setIsButtonDisabled(false); // Re-enable the button if there's an error
        }
    };

    return (
        <div className="container mx-auto py-5">
            <div className="rounded-lg shadow-lg border w-full p-2 mt-5">
                <div className="flex justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm border border-sky-600 px-2 py-1 hover:bg-sky-600 hover:text-white duration-300 text-sky-600 bg-white rounded-md"
                    >
                        <MdKeyboardArrowLeft size={20} />
                    </button>
                    <h1 className="font-semibold text-xl text-sky-600">
                        Checkout Seminar
                    </h1>
                </div>
            </div>
            <div className="border border-sky-600 w-full mt-5"></div>
            {loading ? (
                <div className="flex justify-center">
                    <Loader />
                </div>
            ) : (
                seminar && (
                    <div className="grid grid-cols-3 gap-4 mt-5">
                        <div className="p-4 rounded-md shadow-lg border">
                            <div>
                                <p className="text-sky-600 font-semibold text-xl">
                                    Seminar Detail
                                </p>
                                <label
                                    htmlFor="name"
                                    className="text-sky-600 font-medium text-sm mt-2 block mb-2"
                                >
                                    Seminar Title
                                </label>
                                <input
                                    className="border border-sky-600 w-full p-2 rounded-md"
                                    value={seminar.title}
                                    disabled
                                />
                                <label
                                    htmlFor="name"
                                    className="text-sky-600 font-medium text-sm mt-2 block mb-2"
                                >
                                    Seminar Description
                                </label>
                                <input
                                    className="border border-sky-600 w-full p-2 rounded-md"
                                    value={seminar.description}
                                    disabled
                                />
                                <label
                                    htmlFor="name"
                                    className="text-sky-600 font-medium text-sm mt-2 block mb-2"
                                >
                                    Seminar Date
                                </label>
                                <input
                                    className="border border-sky-600 w-full p-2 rounded-md"
                                    value={new Date(
                                        seminar.seminar_date
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                    disabled
                                />
                                <label
                                    htmlFor="name"
                                    className="text-sky-600 font-medium text-sm mt-2 block mb-2"
                                >
                                    Seminar Location
                                </label>
                                <input
                                    className="border border-sky-600 w-full p-2 rounded-md"
                                    value={seminar.location}
                                    disabled
                                />
                                <label
                                    htmlFor="name"
                                    className="text-sky-600 font-medium text-sm mt-2 block mb-2"
                                >
                                    Seminar Price
                                </label>
                                <input
                                    className="border border-sky-600 w-full p-2 rounded-md"
                                    value={new Intl.NumberFormat("id-ID", {
                                        style: "decimal",
                                    }).format(seminar.price)}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="p-4 rounded-md shadow-lg border">
                            <div>
                                <p className="text-sky-600 font-semibold text-xl">
                                    User Detail
                                </p>
                                <label
                                    htmlFor="name"
                                    className="text-sky-600 font-medium text-sm mt-2 block mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    className="border border-sky-600 w-full p-2 rounded-md"
                                    value={user ? user.name : ""}
                                    disabled
                                />
                                <label
                                    htmlFor="email"
                                    className="text-sky-600 font-semibold text-sm mt-2 block mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    className="border border-sky-600 w-full p-2 rounded-md"
                                    value={user ? user.email : ""}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="p-4 rounded-md shadow-lg border">
                            <p className="text-sky-600 font-semibold text-xl mb-5">
                                Order Summary
                            </p>
                            <div className="flex flex-col justify-between h-[50vh]">
                                <div className="flex justify-between">
                                    <p>{seminar.title}</p>
                                    <p>
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "decimal",
                                        }).format(seminar.price)}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Total</p>
                                    <p>
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "decimal",
                                        }).format(seminar.price)}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        onClick={handleTransaction}
                                        disabled={isButtonDisabled}
                                        className={`flex justify-center px-3 py-2 text-sm w-full text-sky-600 bg-white border border-sky-600 hover:bg-sky-600 hover:text-white rounded-md duration-300 ${
                                            isButtonDisabled
                                                ? "cursor-not-allowed opacity-50"
                                                : ""
                                        }`}
                                    >
                                        <MdOutlinePayments
                                            size={20}
                                            className="mr-1"
                                        />
                                        Purchase Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
            {showToast && (
                <RockToast
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                    duration={2000}
                    position="top-right"
                />
            )}
        </div>
    );
};

export default SeminarCheckout;
