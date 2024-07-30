import React, { useEffect, useState } from "react";
import { FaPlus, FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import TableContainer from "../../../components/rocktable/TableContainer/TableContainer";
import AddSeminar from "./AddSeminar";
import UpdateSeminar from "./UpdateSeminar";
import DeleteSeminar from "./DeleteSeminar";
import AttendanceSeminar from "./AttendanceSeminar";
import axios from "axios";
import Loader from "../../../components/loader/Loader";

const Seminar = () => {
    const [seminars, setSeminars] = useState([]);
    const [addSeminarModal, setAddSeminarModal] = useState(false);
    const [updateSeminarModal, setUpdateSeminarModal] = useState(false);
    const [deleteSeminarModal, setDeleteSeminarModal] = useState(false);
    const [attendanceSeminarModal, setAttendanceSeminarModal] = useState(false);
    const [updateSeminar, setUpdateSeminar] = useState(null);
    const [deleteSeminar, setDeleteSeminar] = useState(null);
    const [attendanceSeminar, setAttendanceSeminar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        updateSeminarData();
    }, []);

    const updateSeminarData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/seminars");
            setSeminars(response.data.seminars);
        } catch (error) {
            console.error("Error Update Seminar Data", error.message);
        }
        setLoading(false);
    };

    const handleEdit = (seminar) => {
        setUpdateSeminar(seminar);
        setUpdateSeminarModal(true);
    };

    const handleDelete = (seminar) => {
        setDeleteSeminar(seminar);
        setDeleteSeminarModal(true);
    };

    const handleAttendance = (seminar) => {
        setAttendanceSeminar(seminar);
        setAttendanceSeminarModal(true);
    };

    const columns = [
        {
            header: "No",
            accessor: "sequenceNumber",
            width: "55px",
        },
        {
            header: "Title",
            accessor: "title",
            width: "250px",
        },
        {
            header: "Category",
            accessor: "category.category_name",
            width: "100px",
        },
        {
            header: "Description",
            accessor: "description",
            width: "300",
        },
        {
            header: "Seminar Date",
            accessor: "seminar_date",
            render: (item) => (
                <span>
                    {new Date(item.seminar_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
            ),
            width: "200px",
        },
        {
            header: "Price",
            accessor: "price",
            width: "150px",
            render: (item) => (
                <span>
                    IDR{" "}
                    {new Intl.NumberFormat("id-ID", {
                        style: "decimal",
                        minimumFractionDigits: 0,
                    }).format(item.price)}
                </span>
            ),
        },
        {
            header: "Location",
            accessor: "location",
            width: "150px",
        },
        {
            header: "Capacity",
            accessor: "capacity",
            width: "100px",
        },
        {
            header: "Capacity Left",
            accessor: "capacity_left",
            width: "100px",
        },
        {
            header: "Image",
            accessor: (item) => item.image,
            render: (item) => (
                <img
                    src={item.image}
                    alt="Image Not Found"
                    className="w-20 h-20"
                />
            ),
            width: "150px",
        },
        {
            header: "Actions",
            accessor: "actions",
            render: (item) => (
                <div className="">
                    <button
                        onClick={() => handleEdit(item)}
                        disabled={item.capacity_left < item.capacity}
                        className={`flex text-xs px-2 py-1 rounded-md ${
                            item.capacity_left < item.capacity
                                ? "bg-gray-300 border border-gray-600 text-gray-600 cursor-not-allowed"
                                : "bg-white border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600"
                        } duration-300 mb-1`}
                    >
                        <FaPencilAlt className="icon" />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={() => handleDelete(item)}
                        disabled={item.capacity_left < item.capacity}
                        className={`flex text-xs px-2 py-1 rounded-md ${
                            item.capacity_left < item.capacity
                                ? "bg-gray-300 border border-gray-600 text-gray-600 cursor-not-allowed"
                                : "bg-white border border-red-600 text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600"
                        } duration-300 mb-1`}
                    >
                        <FaTrash className="icon" />
                        <span>Delete</span>
                    </button>
                    <button
                        onClick={() => handleAttendance(item)}
                        className="flex text-xs px-2 py-1 rounded-md bg-white border border-sky-600 text-sky-600 hover:text-white hover:bg-sky-600 hover:border-sky-600 duration-300"
                    >
                        <FaEye className="icon" />
                        <span>Attendance</span>
                    </button>
                </div>
            ),
            width: "150px",
        },
    ];

    return (
        <div className="py-5">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-9">
                    <div className="pb-3 flex items-center justify-between">
                        <p className="text-lg font-semibold text-sky-600">
                            Data Buku
                        </p>
                        <button
                            onClick={() => setAddSeminarModal(true)}
                            className="flex text-sm px-2 py-1 rounded-md border text-white bg-sky-600 hover:bg-white hover:text-sky-600 hover:border-sky-600 duration-300"
                        >
                            <FaPlus className="mr-1 mt-1" />
                            <span className="text-base">Tambah Data</span>
                        </button>
                    </div>
                    {loading ? (
                        <div className="flex justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <TableContainer
                            data={seminars}
                            columns={columns}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            exportPDF={true}
                        />
                    )}
                </div>
            </div>
            <AddSeminar
                isOpen={addSeminarModal}
                onClose={() => setAddSeminarModal(false)}
                updateSeminarData={updateSeminarData}
            />
            {updateSeminar && (
                <UpdateSeminar
                    isOpen={updateSeminarModal}
                    onClose={() => setUpdateSeminarModal(false)}
                    seminarData={updateSeminar}
                    updateSeminarData={updateSeminarData}
                />
            )}
            {deleteSeminar && (
                <DeleteSeminar
                    isOpen={deleteSeminarModal}
                    onClose={() => setDeleteSeminarModal(false)}
                    seminarData={deleteSeminar}
                    updateSeminarData={updateSeminarData}
                />
            )}
            {attendanceSeminar && (
                <AttendanceSeminar
                    isOpen={attendanceSeminarModal}
                    onClose={() => setAttendanceSeminarModal(false)}
                    seminarData={attendanceSeminar}
                    seminarId={attendanceSeminar.id}
                />
            )}
        </div>
    );
};

export default Seminar;
