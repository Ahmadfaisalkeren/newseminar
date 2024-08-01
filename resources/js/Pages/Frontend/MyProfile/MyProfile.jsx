import React, { useEffect, useState } from "react";
import { useAuth } from "../../Auth/AuthContext";
import defaultProfile from "../../../assets/defaultProfile.png";
import ChangeProfile from "./ChangeProfile";
import { useParams } from "react-router-dom";
import axios from "axios";
import RockToast from "../../../components/rocktoast/RockToast";

const MyProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [changeProfileModal, setChangeProfileModal] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
        }
    }, [user]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`/api/user/${id}`);
            setUser(response.data.user);
        } catch (error) {
            console.error("Error Fetch User:", error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", name);

        try {
            const response = await axios.post(
                `/api/user/${user.id}`,
                formData,
                {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                }
            );
            setUser(response.data.user);
            setToastMessage("Data Updated Successfully");
            setShowToast(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mx-auto py-5">
            <div className="grid grid-cols-3 gap-3">
                <div className="p-5 rounded-md shadow-lg">
                    <p className="text-md font-semibold text-primary">
                        My Profile
                    </p>
                    <img
                        src={user?.image ? user.image : defaultProfile}
                        alt="Image not found"
                        className="w-[150px] h-[150px] rounded-full border border-tertiary shadow-md justify-center mx-auto mt-10"
                    />
                    <button
                        onClick={() => setChangeProfileModal(true)}
                        className="flex mx-auto px-2 py-1 text-xs rounded-md bg-white border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 duration-300 mt-5"
                    >
                        Change Profile Image
                    </button>
                </div>
                <div className="p-5 rounded-md shadow-lg h-[50vh]">
                    <form onSubmit={handleSubmit}>
                        <label
                            className="text-md font-semibold text-primary"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-2 py-1 mt-2"
                        />
                        <button
                            type="submit"
                            className="flex mx-auto px-2 py-1 text-xs rounded-md bg-white border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 duration-300 mt-5"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
            <ChangeProfile
                isOpen={changeProfileModal}
                onClose={() => setChangeProfileModal(false)}
                user={user}
                updateProfileData={fetchUser}
            />
            {showToast && (
                <RockToast
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                    duration={2000}
                    position="top-left"
                />
            )}
        </div>
    );
};

export default MyProfile;
