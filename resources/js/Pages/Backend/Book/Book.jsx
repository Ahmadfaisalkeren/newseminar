import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import TableContainer from "../../../components/rocktable/TableContainer/TableContainer";
import AddBook from "./AddBook";
import axios from "axios";
import UpdateBook from "./UpdateBook";
import DeleteBook from "./DeleteBook";

const Book = () => {
    const [books, setBooks] = useState([]);
    const [addBookModal, setAddBookModal] = useState(false);
    const [updateBookModal, setUpdateBookModal] = useState(false);
    const [deleteBookModal, setDeleteBookModal] = useState(false);
    const [updateBook, setUpdateBook] = useState(null);
    const [deleteBook, setDeleteBook] = useState(null);

    useEffect(() => {
        axios
            .get("/api/books")
            .then((response) => {
                if (response.status === 200) {
                    setBooks(response.data.books);
                }
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the books data!",
                    error
                );
            });
    }, []);

    const updateBookData = async () => {
        try {
            const response = await axios.get(`/api/books`);
            setBooks(response.data.books);
        } catch (error) {
            console.error("Error Update Book Data", error.message);
        }
    };

    const handleEdit = (books) => {
        setUpdateBook(books);
        setUpdateBookModal(true);
    };

    const handleDelete = (books) => {
        setDeleteBook(books);
        setDeleteBookModal(true);
    };

    const columns = [
        {
            header: "No",
            accessor: "sequenceNumber",
            width: "45px"
        },
        {
            header: "Title",
            accessor: "title",
            width: "150px"
        },
        {
            header: "Author",
            accessor: "author",
            width: "100px"
        },
        {
            header: "Description",
            accessor: "description",
            width: "400"
        },
        {
            header: "Price",
            accessor: "price",
            width: "150px"
        },
        {
            header: "Stock",
            accessor: "stock",
            width: "100px"
        },
        {
            header: "Image",
            accessor: (item) => item.image,
            render: (item) => (
                <img
                    src={item.image}
                    alt="Image Not Found"
                    className="w-20 h-20"
                />
            ),
            width: "120px"
        },
    ];

    return (
        <div className="py-5">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-9">
                    <div className="pb-3 flex items-center justify-between">
                        <p className="text-lg font-semibold text-sky-600">
                            Data Buku
                        </p>
                        <button onClick={() => setAddBookModal(true)} className="flex text-sm px-2 py-1 rounded-md border text-white bg-sky-600 hover:bg-white hover:text-sky-600 hover:border-sky-600 duration-300">
                            <FaPlus className="mr-1 mt-1" />
                            <span className="text-base">Tambah Data</span>
                        </button>
                    </div>
                    <TableContainer
                        data={books}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        exportPDF={true}
                    />
                </div>
            </div>
            <AddBook
                isOpen={addBookModal}
                onClose={() => setAddBookModal(false)}
                updateBookData={updateBookData}
            />
            {updateBook && (
                <UpdateBook
                    isOpen={updateBookModal}
                    onClose={() => setUpdateBookModal(false)}
                    bookData={updateBook}
                    updateBookData={updateBookData}
                />
            )}
            {deleteBook && (
                <DeleteBook
                    isOpen={deleteBookModal}
                    onClose={() => setDeleteBookModal(false)}
                    bookData={deleteBook}
                    updateBookData={updateBookData}
                />
            )}
        </div>
    );
};

export default Book;
