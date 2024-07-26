import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {RockModal} from "rockmodal";
import {RockToast} from "rocktoast";

const UpdatePenduduk = ({
    isOpen,
    onClose,
    pendudukData,
    updatePendudukData,
}) => {
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

    useEffect(() => {
        if (pendudukData) {
            setName(pendudukData.name);
            setPob(pendudukData.pob);
            setDob(pendudukData.dob);
            setGender(pendudukData.gender);
            setAddress(pendudukData.address);
            setImage(pendudukData.image ? `${pendudukData.image}` : null);
            setPreviewUrl(pendudukData.image ? `${pendudukData.image}` : null);
        }
    }, [pendudukData]);

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
        formData.append("name", name);
        formData.append("pob", pob);
        formData.append("dob", dob);
        formData.append("gender", gender);
        formData.append("address", address);
        if (image instanceof File) {
            formData.append("image", image);
        }

        try {
            const response = await fetch(`/api/penduduk/${pendudukData.id}`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: formData,
            });

            setToastMessage("Data Updated Successfully");
            setShowToast(true);
            onClose();
            updatePendudukData();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <RockModal isOpen={isOpen} onClose={onClose} color="cyan">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Update Data Penduduk
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
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
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
                                onChange={(e) => setPob(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
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
                                onChange={(e) => setDob(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
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
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
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
                                onChange={(e) => setAddress(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
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
                                onChange={handleImageChange}
                                ref={inputFile}
                                className="block w-full text-sm text-white
                file:mr-4 file:py-2 file:px-4 file:rounded-md
                file:border-0 file:text-sm file:font-semibold
                file:bg-pink-50 file:text-pink-700
                hover:file:bg-pink-100 mt-1"
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
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </RockModal>
            {showToast && (
                <RockToast
                    message={toastMessage}
                    duration={2000}
                    onClose={() => setShowToast(false)}
                    position="top-left"
                />
            )}
        </>
    );
};

export default UpdatePenduduk;
