import axios from "axios";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";

const AddBook = ({ isOpen, onClose, updateBookData }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const inputFile = useRef(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [errors, setErrors] = useState({});

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleAuthor = (e) => {
        setAuthor(e.target.value);
    };
    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    const handlePrice = (e) => {
        setPrice(e.target.value);
    };
    const handleStock = (e) => {
        setStock(e.target.value);
    };
    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);

        try {
            const response = await axios.post("/api/book", formData, {
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });

            if (response.status === 200) {
                setToastMessage(response.data.message);
                setShowToast(true);
                onClose();
                updateBookData();
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
        setAuthor("");
        setDescription("");
        setPrice("");
        setStock("");
        setPreviewUrl("");
        setImage(null);
        setErrors({});
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
                        Add Data Book
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
                                htmlFor="author"
                                className="text-base text-white font-medium"
                            >
                                Author
                            </label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                value={author}
                                onChange={handleAuthor}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                            {errors.author && (
                                <div className="text-white text-sm mt-1">
                                    {errors.author}
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
                                htmlFor="stock"
                                className="text-base text-white font-medium"
                            >
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                value={stock}
                                onChange={handleStock}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                            {errors.stock && (
                                <div className="text-white text-sm mt-1">
                                    {errors.stock}
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

export default AddBook;
