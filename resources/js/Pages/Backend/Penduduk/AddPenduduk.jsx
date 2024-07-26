import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {RockModal} from "rockmodal";
import {RockToast} from "rocktoast";

const AddPenduduk = ({ isOpen, onClose, updatePendudukData }) => {
    const [name, setName] = useState("");
    const [pob, setPob] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const inputFile = useRef(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handlePob = (e) => {
        setPob(e.target.value);
    };
    const handleDob = (e) => {
        setDob(e.target.value);
    };
    const handleGender = (e) => {
        setGender(e.target.value);
    };
    const handleAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("pob", pob);
        formData.append("dob", dob);
        formData.append("gender", gender);
        formData.append("address", address);
        formData.append("image", image);

        try {
            const response = await fetch("/api/penduduk", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: formData,
            });

            setToastMessage("Data Stored Successfully");
            setShowToast(true);
            onClose();
            updatePendudukData();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClose = () => {
        setName("");
        setPob("");
        setDob("");
        setGender("");
        setAddress("");
        setPreviewUrl("");
        setImage(null);
        if (inputFile.current) {
            inputFile.current.value = "";
        }
        onClose();
    };

    return (
        <>
            <RockModal isOpen={isOpen} onClose={handleClose} color="coral">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Add Data Penduduk
                    </h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="text-base text-white font-medium"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={handleName}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="pob"
                                className="text-base text-white font-medium"
                            >
                                POB
                            </label>
                            <input
                                type="text"
                                name="pob"
                                id="pob"
                                value={pob}
                                onChange={handlePob}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="dob"
                                className="text-base text-white font-medium"
                            >
                                DOB
                            </label>
                            <input
                                type="date"
                                name="dob"
                                id="dob"
                                value={dob}
                                onChange={handleDob}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="gender"
                                className="text-base text-white font-medium"
                            >
                                Gender
                            </label>
                            <div className="mt-1 flex">
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender === "male"}
                                        onChange={handleGender}
                                        className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-white">
                                        Male
                                    </span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={handleGender}
                                        className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-white">
                                        Female
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="address"
                                className="text-base text-white font-medium"
                            >
                                Address
                            </label>
                            <textarea
                                rows={10}
                                type="text"
                                name="address"
                                id="address"
                                value={address}
                                onChange={handleAddress}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-white"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImage}
                                ref={inputFile}
                                className="block w-full text-sm text-white
                file:mr-4 file:py-2 file:px-4 file:rounded-md
                file:border-0 file:text-sm file:font-semibold
                file:bg-pink-50 file:text-pink-700
                hover:file:bg-pink-100 mt-1"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="imagePreview"
                                className="text-base text-white font-medium"
                            >
                                Image Preview
                            </label>
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt="Image Broken"
                                    className="mt-2 flex"
                                    width="150px"
                                />
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 duration-300 text-white py-1 px-2 rounded flex items-center space-x-1"
                            >
                                <FaPlus className="mr-1" />
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </RockModal>
            {showToast && (
                <RockToast
                    message={toastMessage}
                    duration={1500}
                    onClose={() => setShowToast(false)}
                    position="top-left"
                />
            )}
        </>
    );
};

export default AddPenduduk;
