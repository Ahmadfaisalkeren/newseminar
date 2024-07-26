import React, { useEffect, useState } from "react";
import TableContainer from "../../../components/rocktable/TableContainer/TableContainer";
import axios from "axios";
import Loader from "../../../components/loader/Loader";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [banUser, setBanUser] = useState(null);
    const [banUserModal, setBanUserModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        updateUsersData();
    }, []);

    const updateUsersData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/users");
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error Update Users Data", error.message);
        }
        setLoading(false);
    };

    const handleBanUser = (user) => {
        setBanUser(user);
        setBanUserModal(true);
    };

    const columns = [
        {
            header: "No",
            accessor: "sequenceNumber",
            width: "50px",
        },
        {
            header: "Name",
            accessor: "name",
            width: "300px",
        },
        {
            header: "Email",
            accessor: "email",
            width: "300px",
        },
    ];

    return (
        <div className="py-5">
            <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <h1 className="font-semibold justify-end text-xl text-sky-600">
                    Users Data
                </h1>
                {loading ? (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <TableContainer
                        columns={columns}
                        data={users}
                        exportPDF={true}
                    />
                )}
            </div>
        </div>
    );
};

export default Users;
