import React, { useRef, useState } from "react";
import RockModal from "../../../components/rockmodal/RockModal";
import { useAuth } from "../../Auth/AuthContext";
import axios from "axios";

const ChangeProfile = ({ isOpen, onClose, user, updateProfileData }) => {
    const [image, setImage] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const inputFile = useRef(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
            setPreviewUrl(URL.createObjectURL(selectedImage));
        } else {
            setImage(null);
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PUT");
        if (image instanceof File) {
            formData.append("image", image);
        }

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
            updateProfileData();
            onClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <RockModal isOpen={isOpen} onClose={onClose} type="solid" width={50}>
            <h1 className="text-xl font-semibold text-center mb-6">
                Change Profile Picture
            </h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    ref={inputFile}
                    onChange={handleImageChange}
                    className="w-full h-full object-cover rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-tertiary-50 file:text-tertiary-700 hover:file:bg-tertiary-100"
                />
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Image Broken"
                        className="mt-2 flex"
                        width="150px"
                    />
                )}
                <button
                    type="submit"
                    className="px-2 py-1 mt-4 text-xs rounded-md bg-white border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 duration-300"
                >
                    Update Image Profile
                </button>
            </form>
        </RockModal>
    );
};

export default ChangeProfile;
