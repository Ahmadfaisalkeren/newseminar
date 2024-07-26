import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TableContainer from "../../../components/rocktable/TableContainer/TableContainer";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import PaymentModal from "./PaymentModal";
import echo from "../../../echo";
import { CiCircleCheck, CiClock2, CiWarning } from "react-icons/ci";
import { BsPrinter } from "react-icons/bs";

const MySeminar = () => {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const [payOrder, setPayOrder] = useState(null);
    const [payOrderModal, setPayOrderModal] = useState(false);

    useEffect(() => {
        fetchMyTransaction();

        echo.channel(`orders.${id}`).listen("OrderStatusUpdated", (event) => {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.transaction_id === event.order.transaction_id
                        ? { ...order, status: event.order.status }
                        : order
                )
            );
        });
        return () => {
            echo.leaveChannel(`orders.${id}`);
        };
    }, [id]);

    const handlePayOrder = (order) => {
        setPayOrder(order);
        setPayOrderModal(true);
    };

    const fetchMyTransaction = async () => {
        try {
            const response = await axios.get(`/api/orders/${id}`);
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Error Fetching Transaction", error.message);
        }
    };

    const columns = [
        {
            header: "No",
            accessor: "sequenceNumber",
            width: "50px",
        },
        {
            header: "Seminar Name",
            accessor: "seminar.title",
        },
        {
            header: "Amount",
            accessor: "amount",
            render: (item) => (
                <span>
                    IDR{" "}
                    {new Intl.NumberFormat("id-ID", {
                        style: "decimal",
                        minimumFractionDigits: 0,
                    }).format(item.amount)}
                </span>
            ),
        },
        {
            header: "Order Time",
            accessor: "created_at",
            render: (item) => {
                const date = new Date(item.created_at);
                return (
                    <span>
                        {date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}{" "}
                        {date.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                );
            },
        },
        {
            header: "Payment Status",
            accessor: "status",
            render: (item) => (
                <div
                    className={`${
                        item.status === "success"
                            ? "text-white text-sm w-24 bg-green-500 px-1 py-1 rounded-md justify-center flex"
                            : item.status === "failed"
                            ? "text-white text-sm w-24 bg-red-500 px-1 py-1 rounded-md justify-center flex"
                            : "text-white text-sm w-24 bg-yellow-400 px-1 py-1 rounded-md justify-center flex"
                    }`}
                >
                    {item.status === "success" && (
                        <CiCircleCheck size={20} className="mr-2" />
                    )}
                    {item.status === "failed" && (
                        <CiWarning size={20} className="mr-2" />
                    )}
                    {item.status === "pending" && (
                        <CiClock2 size={20} className="mr-2" />
                    )}
                    {item.status}
                </div>
            ),
        },
        {
            header: "Action",
            accessor: "actions",
            render: (item) => (
                <div className="flex">
                    {item.status === "success" && (
                        <a
                            href={`/print-ticket/${item.id}`}
                            target="_blank"
                            className="flex mr-1 text-sm px-2 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 duration-300"
                        >
                            <BsPrinter size={20} />
                            <span className="ml-1">Print Ticket</span>
                        </a>
                    )}
                    {item.status === "success" || item.status === "failed" ? (
                        <button
                            className="flex text-sm px-2 py-1 rounded-md bg-gray-400 text-gray-700 cursor-not-allowed"
                            disabled
                        >
                            <RiMoneyDollarCircleLine size={20} />
                            <span className="ml-1">
                                {item.status === "success"
                                    ? "Paid"
                                    : "Order Expired"}
                            </span>
                        </button>
                    ) : (
                        <button
                            className="flex text-sm px-2 py-1 rounded-md bg-white border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 duration-300"
                            onClick={() => handlePayOrder(item)}
                        >
                            <RiMoneyDollarCircleLine size={20} />
                            <span className="ml-1">Pay Now</span>
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto py-5">
            <div className="rounded-lg shadow-lg border w-full p-4 mt-5 min-h-[50vh]">
                <div className="mb-5">
                    <p className="text-primary text-xl font-semibold">
                        My Seminar Transaction
                    </p>
                </div>
                <TableContainer columns={columns} data={orders} />
            </div>
            {payOrder && (
                <PaymentModal
                    isOpen={payOrderModal}
                    onClose={() => setPayOrderModal(false)}
                    orderData={payOrder}
                    updateOrderData={fetchMyTransaction}
                />
            )}
        </div>
    );
};

export default MySeminar;
