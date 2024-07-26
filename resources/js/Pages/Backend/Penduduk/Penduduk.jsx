import React, { useEffect, useState } from "react";
import AddPenduduk from "./AddPenduduk";
import UpdatePenduduk from "./UpdatePenduduk";
import DeletePenduduk from "./DeletePenduduk";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import TableContainer from "../../../components/rocktable/TableContainer/TableContainer";

const Penduduk = () => {
    const [penduduk, setPenduduk] = useState([]);
    const [addPendudukModal, setAddPendudukModal] = useState(false);
    const [updatePendudukModal, setUpdatePendudukModal] = useState(false);
    const [deletePendudukModal, setDeletePendudukModal] = useState(false);
    const [updatePenduduk, setUpdatePenduduk] = useState(null);
    const [deletePenduduk, setDeletePenduduk] = useState(null);

    useEffect(() => {
        axios
            .get("/api/penduduk")
            .then((response) => {
                if (response.status === 200) {
                    setPenduduk(response.data.penduduk);
                }
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the penduduk data!",
                    error
                );
            });
    }, []);

    const updatePendudukData = async () => {
        try {
            const response = await axios.get(`/api/penduduk`);
            setPenduduk(response.data.penduduk);
        } catch (error) {
            console.error("Error Update Penduduk Data", error.message);
        }
    };

    const handleEdit = (penduduk) => {
        setUpdatePenduduk(penduduk);
        setUpdatePendudukModal(true);
    };

    const handleDelete = (penduduk) => {
        setDeletePenduduk(penduduk);
        setDeletePendudukModal(true);
    };

    const columns = [
        { header: "No", accessor: "sequenceNumber", width: "45px" },
        { header: "Name", accessor: "name", width: "150px" },
        { header: "Place Of Birth", accessor: "pob", width: "150px" },
        {
            header: "Date Of Birth",
            accessor: (item) =>
                new Date(item.dob).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            width: "150px",
        },
        { header: "Gender", accessor: "gender", width: "100px" },
        { header: "Address", accessor: "address", width:"350px" },
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
            width: "150px"
        },
    ];

    return (
        <>
            <div className="py-5">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="">
                        <div className="p-9">
                            <div className="pb-3 flex items-center text-sky-600 justify-between">
                                <p className="text-lg font-semibold">
                                    Penduduk Data
                                </p>
                                <button
                                    onClick={() => setAddPendudukModal(true)}
                                    className="flex text-sm px-2 py-1 rounded-md border text-white bg-sky-600 hover:bg-white hover:text-sky-600 hover:border-sky-600 duration-300"
                                >
                                    <FaPlus className="mr-1 mt-1" />
                                    <span className="text-base">
                                        Tambah Data
                                    </span>
                                </button>
                            </div>
                            <TableContainer
                                data={penduduk}
                                columns={columns}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                exportPDF={true}
                            />
                        </div>
                    </div>
                    <AddPenduduk
                        isOpen={addPendudukModal}
                        onClose={() => setAddPendudukModal(false)}
                        updatePendudukData={updatePendudukData}
                    />
                    {updatePenduduk && (
                        <UpdatePenduduk
                            isOpen={updatePendudukModal}
                            onClose={() => setUpdatePendudukModal(false)}
                            pendudukData={updatePenduduk}
                            updatePendudukData={updatePendudukData}
                        />
                    )}
                    {deletePenduduk && (
                        <DeletePenduduk
                            isOpen={deletePendudukModal}
                            onClose={() => setDeletePendudukModal(false)}
                            pendudukData={deletePenduduk}
                            updatePendudukData={updatePendudukData}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Penduduk;
