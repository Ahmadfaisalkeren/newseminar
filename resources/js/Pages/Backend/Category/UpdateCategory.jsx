import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosRefresh } from "react-icons/io";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";

const UpdateCategory = ({
    isOpen,
    onClose,
    categoryData,
    updateCategoryData,
}) => {
    const [category_name, setCategoryName] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setCategoryName(categoryData.category_name);
    }, [categoryData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("category_name", category_name);

        try {
            const response = await axios.post(
                `/api/category/${categoryData.id}`,
                formData,
                {
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setToastMessage("Data Updated Successfully");
            setShowToast(true);
            onClose();
            updateCategoryData();
        } catch (error) {
            console.error("Error Fetching Data:", error);
        }
    };

    const isFormChanged = () => {
        return category_name !== categoryData.category_name;
    };

    return (
        <>
            <RockModal isOpen={isOpen} onClose={onClose} color="blue">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Update Category
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="category_name"
                            className="text-base text-white font-medium"
                        >
                            Category Name
                        </label>
                        <input
                            id="category_name"
                            type="text"
                            value={category_name}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="mt-1 px-3 py-2 border rounded-md w-full"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 duration-300 text-white py-1 px-2 rounded flex items-center space-x-1"
                        >
                            <IoIosRefresh className="mr-1" />
                            Update
                        </button>
                    </div>
                </form>
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

export default UpdateCategory;
