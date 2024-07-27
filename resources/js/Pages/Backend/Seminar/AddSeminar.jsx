import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";

const AddSeminar = ({ isOpen, onClose, updateSeminarData }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [seminar_date, setSeminarDate] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [image, setImage] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [previewUrl, setPreviewUrl] = useState("");
    const inputFile = useRef(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [errors, setErrors] = useState({});

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

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    const handleSeminarDate = (e) => {
        setSeminarDate(e.target.value);
    };
    const handleLocation = (e) => {
        setLocation(e.target.value);
    };
    const handlePrice = (e) => {
        setPrice(e.target.value);
    };
    const handleCapacity = (e) => {
        setCapacity(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
    };
    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("seminar_date", seminar_date);
        formData.append("location", location);
        formData.append("price", price);
        formData.append("capacity", capacity);
        formData.append("category_id", category_id);
        formData.append("image", image);

        try {
            const response = await axios.post("/api/seminar", formData, {
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });

            if (response.status === 200) {
                setToastMessage("Data Added Successfully");
                setShowToast(true);
                onClose();
                updateSeminarData();
                resetForm();
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Error:", error);
            }
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setSeminarDate("");
        setPrice("");
        setLocation("");
        setCapacity("");
        setPreviewUrl("");
        setImage(null);
        setErrors({});
        setCategoryId("");
        if (inputFile.current) {
            inputFile.current.value = "";
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <>
            <RockModal isOpen={isOpen} onClose={handleClose}>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Add Data Seminar
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
                                onChange={handleTitle}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                            {errors.title && (
                                <div className="text-white text-sm mt-1">
                                    {errors.title}
                                </div>
                            )}
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
                                onChange={handleCategoryChange}
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
                            {errors.category_id && (
                                <div className="text-white text-sm mt-1">
                                    {errors.category_id}
                                </div>
                            )}
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
                                name="description"
                                id="description"
                                value={description}
                                onChange={handleDescription}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                            {errors.description && (
                                <div className="text-white text-sm mt-1">
                                    {errors.description}
                                </div>
                            )}
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
                                onChange={handleSeminarDate}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                            {errors.seminar_date && (
                                <div className="text-white text-sm mt-1">
                                    {errors.seminar_date}
                                </div>
                            )}
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
                                onChange={handlePrice}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                            {errors.price && (
                                <div className="text-white text-sm mt-1">
                                    {errors.price}
                                </div>
                            )}
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
                                onChange={handleLocation}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                            {errors.location && (
                                <div className="text-white text-sm mt-1">
                                    {errors.location}
                                </div>
                            )}
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
                                onChange={handleCapacity}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                            {errors.capacity && (
                                <div className="text-white text-sm mt-1">
                                    {errors.capacity}
                                </div>
                            )}
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
                            />
                            {errors.image && (
                                <div className="text-white text-sm mt-1">
                                    {errors.image}
                                </div>
                            )}
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
                                    alt="Image Preview"
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

export default AddSeminar;
