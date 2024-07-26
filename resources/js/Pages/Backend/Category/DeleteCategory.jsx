import axios from "axios";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";

const DeleteCategory = ({
    isOpen,
    onClose,
    categoryData,
    updateCategoryData,
}) => {
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleDelete = async (e) => {
        try {
            const response = await axios.delete(
                `/api/category/${categoryData.id}`,
                {
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                }
            );
            setShowToast(true);
            setToastMessage("Data Deleted Successfully");
            onClose();
            updateCategoryData();
        } catch (error) {
            console.error("Error Delete Data:", error.message);
        }
    };

    return (
        <>
            <RockModal isOpen={isOpen} onClose={onClose} color="danger">
                <div className="p-4 text-center">
                    <div className="text-white">
                        <h2 className="text-xl font-bold mb-4">Delete Category</h2>
                        <p className="font-semibold">
                            Are you sure want to delete the data ?
                        </p>
                        <p className="font-light">
                            Deleted data can't be revert
                        </p>
                    </div>
                    <button
                        className="bg-red-500 hover:bg-red-700 duration-300 shadow-lg text-white px-2 py-2 mt-5 rounded mr-2"
                        onClick={handleDelete}
                    >
                        <FaTrash className="inline-block mr-1" />
                        <span>Confirm Delete</span>
                    </button>
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

export default DeleteCategory;
