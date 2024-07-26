import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import TableContainer from "../../../components/rocktable/TableContainer/TableContainer";
import axios from "axios";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";
import Loader from "../../../components/loader/Loader";

const Category = () => {
    const [category, setCategory] = useState([]);
    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const [updateCategory, setUpdateCategory] = useState(null);
    const [deleteCategory, setDeleteCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        updateCategoryData();
    }, []);

    const updateCategoryData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/categories`);
            setCategory(response.data.categories);
        } catch (error) {
            console.error("Error Update Category Data", error.message);
        }
        setLoading(false);
    };

    const handleEdit = (category) => {
        setUpdateCategory(category);
        setUpdateCategoryModal(true);
    };

    const handleDelete = (category) => {
        setDeleteCategory(category);
        setDeleteCategoryModal(true);
    };

    const columns = [
        {
            header: "No",
            accessor: "sequenceNumber",
            width: "45px",
        },
        {
            header: "Category Name",
            accessor: "category_name",
            width: "500px",
        },
        {
            header: "Actions",
            accessor: "actions",
            render: (item) => (
                <div className="flex">
                    <button
                        onClick={() => handleEdit(item)}
                        className="flex text-xs px-2 py-1 rounded-md bg-white border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 duration-300 mb-1 mr-1"
                    >
                        <FaPencilAlt className="icon" />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={() => handleDelete(item)}
                        className="flex text-xs px-2 py-1 rounded-md bg-white border border-red-600 text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 duration-300 mb-1"
                    >
                        <FaTrash className="icon" />
                        <span>Delete</span>
                    </button>
                </div>
            ),
            width: "150px",
        },
    ];

    return (
        <div className="py-5">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-9">
                    <div className="pb-3 flex items-center justify-between">
                        <p className="text-lg font-semibold text-sky-600">
                            Category Data
                        </p>
                        <button
                            onClick={() => setAddCategoryModal(true)}
                            className="flex text-sm px-2 py-1 rounded-md border text-white bg-sky-600 hover:bg-white hover:text-sky-600 hover:border-sky-600 duration-300"
                        >
                            <FaPlus className="mr-1 mt-1" />
                            <span className="text-base">Tambah Data</span>
                        </button>
                    </div>
                    {loading ? (
                        <div className="flex justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <TableContainer
                            columns={columns}
                            data={category}
                            exportPDF={true}
                        />
                    )}
                </div>
            </div>
            <AddCategory
                isOpen={addCategoryModal}
                onClose={() => setAddCategoryModal(false)}
                updateCategoryData={updateCategoryData}
            />
            {updateCategory && (
                <UpdateCategory
                    isOpen={updateCategoryModal}
                    onClose={() => setUpdateCategoryModal(false)}
                    categoryData={updateCategory}
                    updateCategoryData={updateCategoryData}
                />
            )}
            {deleteCategory && (
                <DeleteCategory
                    isOpen={deleteCategoryModal}
                    onClose={() => setDeleteCategoryModal(false)}
                    categoryData={deleteCategory}
                    updateCategoryData={updateCategoryData}
                />
            )}
        </div>
    );
};

export default Category;
