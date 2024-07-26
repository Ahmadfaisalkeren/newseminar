import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";
import { IoIosRefresh } from "react-icons/io";
import axios from "axios";

const UpdateSeminar = ({ isOpen, onClose, updateSeminarData, seminarData }) => {
    const [title, setTitle] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [seminar_date, setSeminarDate] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [image, setImage] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const inputFile = useRef(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategoryData();
    }, []);

    const getCategoryData = async () => {
        try {
            const response = await axios.get("/api/categories");
            if (response.status === 200) {
                setCategories(response.data.categories);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (seminarData) {
            setTitle(seminarData.title);
            setCategoryId(seminarData.category_id);
            setDescription(seminarData.description);
            setSeminarDate(seminarData.seminar_date);
            setLocation(seminarData.location);
            setPrice(seminarData.price);
            setCapacity(seminarData.capacity);
            setImage(seminarData.image ? `${seminarData.image}` : null);
            setPreviewUrl(seminarData.image ? `${seminarData.image}` : null);
        }
    }, [seminarData]);

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
        formData.append("title", title);
        formData.append("category_id", category_id);
        formData.append("description", description);
        formData.append("seminar_date", seminar_date);
        formData.append("location", location);
        formData.append("price", price);
        formData.append("capacity", capacity);
        if (image instanceof File) {
            formData.append("image", image);
        }

        try {
            const response = await axios.post(
                `/api/seminar/${seminarData.id}`,
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

            setToastMessage("Data Updated Successfully");
            setShowToast(true);
            onClose();
            updateSeminarData();
        } catch (error) {
            console.error("Error:", error);
            setToastMessage("An error occurred");
            setShowToast(true);
        }
    };

    return (
        <>
            <RockModal isOpen={isOpen} onClose={onClose}>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Update Seminar Data
                    </h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="text-base text-white font-medium"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="category_id"
                                className="text-base text-white font-medium"
                            >
                                Category
                            </label>
                            <select
                                name="category_id"
                                id="category_id"
                                value={category_id}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="text-base text-white font-medium"
                            >
                                Description
                            </label>
                            <textarea
                                rows={5}
                                type="text"
                                name="description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="seminar_date"
                                className="text-base text-white font-medium"
                            >
                                Seminar Date
                            </label>
                            <input
                                type="date"
                                name="seminar_date"
                                id="seminar_date"
                                value={seminar_date}
                                onChange={(e) => setSeminarDate(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="price"
                                className="text-base text-white font-medium"
                            >
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="location"
                                className="text-base text-white font-medium"
                            >
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="capacity"
                                className="text-base text-white font-medium"
                            >
                                Capacity
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                id="capacity"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
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
                                className="bg-blue-500 hover:bg-blue-700
                                duration-300 text-white py-1 px-2 rounded flex items-center space-x-1"
                            >
                                <IoIosRefresh className="mr-1" />
                                Update
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

export default UpdateSeminar;
