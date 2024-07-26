import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";
import { IoIosRefresh } from "react-icons/io";

const UpdateBook = ({ isOpen, onClose, updateBookData, bookData }) => {
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

    const [initialState, setInitialState] = useState({
        title: "",
        author: "",
        description: "",
        price: "",
        stock: "",
        image: "",
    });

    useEffect(() => {
        if (bookData) {
            setTitle(bookData.title);
            setAuthor(bookData.author);
            setDescription(bookData.description);
            setPrice(bookData.price);
            setStock(bookData.stock);
            setImage(bookData.image ? `${bookData.image}` : null);
            setPreviewUrl(bookData.image ? `${bookData.image}` : null);

            setInitialState({
                title: bookData.title,
                author: bookData.author,
                description: bookData.description,
                price: bookData.price,
                stock: bookData.stock,
                image: bookData.image ? `${bookData.image}` : null,
            });
        }
    }, [bookData]);

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
        formData.append("author", author);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        if (image instanceof File) {
            formData.append("image", image);
        }

        try {
            const response = await fetch(`/api/book/${bookData.id}`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: formData,
            });

            if (response.ok) {
                setToastMessage("Data Updated Successfully");
            } else {
                setToastMessage("Failed to update data");
            }
            setShowToast(true);
            onClose();
            updateBookData();
        } catch (error) {
            console.error("Error:", error);
            setToastMessage("An error occurred");
            setShowToast(true);
        }
    };

    const isFormChanged = () => {
        return (
            title !== initialState.title ||
            author !== initialState.author ||
            description !== initialState.description ||
            price !== initialState.price ||
            stock !== initialState.stock ||
            (image !== initialState.image && image !== null)
        );
    };

    return (
        <>
            <RockModal
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Update Book Data
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
                                onChange={(e) => setAuthor(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
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
                                onChange={(e) => setStock(e.target.value)}
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
                                disabled={!isFormChanged()}
                                className={`${
                                    isFormChanged()
                                        ? "bg-blue-500 hover:bg-blue-700"
                                        : "bg-gray-500 cursor-not-allowed"
                                } duration-300 text-white py-1 px-2 rounded flex items-center space-x-1`}
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

export default UpdateBook;
