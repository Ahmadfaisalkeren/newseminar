import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GiArchiveRegister } from "react-icons/gi";
import axios from "axios";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useAuth } from "../../Auth/AuthContext";
import AuthModal from "../Navbar/AuthModal";
import Loader from "../../../components/loader/Loader";

const SeminarDetail = () => {
    const [seminar, setSeminar] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchSeminar = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`/api/seminar/${id}`);
                setSeminar(response.data.seminar);
            } catch (error) {
                console.error("Error Fetching Seminar", error.message);
            }
            setLoading(false)
        };

        const fetchOrders = async () => {
            try {
                if (user.id) {
                    const response = await axios.get(`/api/orders/${user.id}`);
                    setOrders(response.data.orders);
                }
            } catch (error) {
                console.error("Error Fetching Order", error.message);
            }
        };

        fetchSeminar();
        fetchOrders();
    }, [id, user.id]);

    const hasPurchased = orders.some(
        (order) =>
            order.seminar_id === parseInt(id) && order.status === "success"
    );

    const handleJoinClick = () => {
        if (!user.id) {
            setIsModalOpen(true);
        } else {
            navigate(`/sco/${seminar.id}`);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="rounded-lg shadow-lg border w-full p-4 mt-5">
                <div className="flex justify-between mb-5">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm border border-primary px-2 py-1 hover:bg-primary hover:text-white duration-300 text-primary bg-white rounded-md"
                    >
                        <MdKeyboardArrowLeft size={20} />
                    </button>
                    <h1 className="font-semibold text-xl text-primary">
                        Detail Seminar
                    </h1>
                </div>
                {loading ? (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-3 py-5">
                        <div className="col-span-4">
                            <img
                                src={seminar.image}
                                alt=""
                                className="w-60 flex mx-auto"
                            />
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold text-primary text-2xl mb-2 text-left">
                                {seminar.title}
                            </p>
                            <p className="font-medium text-primary text-base mb-2 text-left">
                                {seminar.description}
                            </p>
                            <p className="font-light text-primary text-base mb-2 text-left">
                                {new Date(
                                    seminar.seminar_date
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}{" "}
                                | {seminar.location}
                            </p>
                            <p className="font-medium text-primary text-base mb-2 text-left">
                                <span>
                                    IDR{" "}
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "decimal",
                                        minimumFractionDigits: 0,
                                    }).format(seminar.price)}
                                </span>
                            </p>
                            <p className="font-medium text-primary text-base mb-2 text-left">
                                Capacity Left : {seminar.capacity_left} /{" "}
                                {seminar.capacity}
                            </p>
                            <div className="py-2">
                                <button
                                    onClick={handleJoinClick}
                                    className={`flex rounded-md px-2 py-1 text-sm ${
                                        hasPurchased
                                            ? "bg-gray-400 text-gray-700"
                                            : "bg-white text-primary border border-tertiary hover:text-white hover:bg-sky-300"
                                    } duration-300 `}
                                    disabled={hasPurchased}
                                >
                                    <GiArchiveRegister className="mt-1 mr-1" />
                                    {hasPurchased
                                        ? "Already Joined"
                                        : "Join Seminar"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default SeminarDetail;
