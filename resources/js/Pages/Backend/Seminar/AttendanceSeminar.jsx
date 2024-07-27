import React, { useEffect, useState } from "react";
import RockModal from "../../../components/rockmodal/RockModal";
import TableContainer from "../../../components/rocktable/TableContainer/TableContainer";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const AttendanceSeminar = ({ isOpen, onClose, seminarData, seminarId }) => {
    const [orderBySeminarId, setOrderBySeminarId] = useState([]);

    useEffect(() => {
        if (seminarId) {
            fetchTransactions();
        }
    }, [seminarId]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(
                `/api/orderBySeminar/${seminarId}`
            );
            setOrderBySeminarId(response.data.orderBySeminarId);
        } catch (error) {
            console.log("Error fetching transactions:", error);
        }
    };

    const columns = [
        {
            header: "No",
            accessor: "sequenceNumber",
            width: "50px",
        },
        {
            header: "User Name",
            accessor: "user.name",
            width: "200px",
        },
        {
            header: "Transaction Id",
            accessor: "transaction_id",
            width: "200px",
        },
        {
            header: "Status",
            accessor: "status",
            width: "150px",
            render: (item) => (
                <div className="flex bg-green-500 text-white px-2 py-1 rounded-md w-24 text-center">
                    <FaCheck size={20} className="mr-2" />
                    {item.status}
                </div>
            ),
        },
        {
            header: "Amount",
            accessor: "amount",
            width: "150px",
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
    ];
    return (
        <>
            <RockModal
                type="solid"
                width={90}
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="p-4">
                    <h4 className="text-xl text-center font-medium text-primary mb-3">
                        Seminar Attendance Lists
                    </h4>
                    <TableContainer
                        exportPDF={true}
                        columns={columns}
                        data={orderBySeminarId}
                    />
                </div>
            </RockModal>
        </>
    );
};

export default AttendanceSeminar;
