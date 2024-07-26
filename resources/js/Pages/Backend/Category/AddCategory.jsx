import axios from "axios";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";

const AddCategory = ({ isOpen, onClose, updateCategoryData }) => {
    const [category_name, setCategoryName] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [errors, setErrors] = useState({});

    const handleCategoryName = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("category_name", category_name);

        try {
            const response = await axios.post("/api/category", formData, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });
            if (response.status === 200) {
                setToastMessage(response.data.message);
                setShowToast(true);
                onClose();
                updateCategoryData();
                setCategoryName("");
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Error:", error);
            }
        }
    };

    const handleClose = () => {
        setCategoryName("");
        onClose();
    };
    return (
        <>
            <RockModal isOpen={isOpen} onClose={handleClose}>
                <div className="p-4">
                    <h2 className="texl-xl font-bold mb-4 text-white">
                        Add Category
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="category_name"
                                className="text-base text-white font-medium"
                            >
                                Category Name
                            </label>
                            <input
                                type="text"
                                name="category_name"
                                id="category_name"
                                value={category_name}
                                onChange={handleCategoryName}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.title && (
                                <div className="text-white text-sm mt-1">
                                    {errors.title}
                                </div>
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

export default AddCategory;
