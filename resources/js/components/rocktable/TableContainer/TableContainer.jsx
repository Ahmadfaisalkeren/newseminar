import React, { useState } from "react";
import "./TableContainer.scss";
import ItemsPerPage from "../ItemsPerPage/ItemsPerPage";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Export from "../Export/Export";

const TableContainer = ({
    columns,
    data,
    exportPDF,
    exportXLSX,
    exportCSV,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    const getNestedValue = (obj, path) => {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    const filteredData =
        data && data.length > 0
            ? data.filter((item) =>
                  columns.some((column) => {
                      const value =
                          typeof column.accessor === "function"
                              ? column.accessor(item)
                              : getNestedValue(item, column.accessor);
                      return (
                          value &&
                          value
                              .toString()
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                      );
                  })
              )
            : [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const dataWithSequenceNumbers = currentData.map((item, index) => ({
        ...item,
        sequenceNumber: indexOfFirstItem + index + 1,
    }));

    return (
        <div className="table-container">
            <div className="table-container-header">
                <ItemsPerPage
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                />
                <Export
                    columns={columns}
                    data={filteredData}
                    exportPDF={exportPDF}
                    exportXLSX={exportXLSX}
                    exportCSV={exportCSV}
                />
                <Search searchQuery={searchQuery} handleSearch={handleSearch} />
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.header}
                                className="table-header"
                                style={{ width: column.width }}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataWithSequenceNumbers.length > 0 ? (
                        dataWithSequenceNumbers.map((item, index) => (
                            <tr key={index}>
                                {columns.map((column) => (
                                    <td
                                        key={column.header}
                                        className="table-cell"
                                        style={{ width: column.width }}
                                    >
                                        {typeof column.render === "function"
                                            ? column.render(item)
                                            : typeof column.accessor ===
                                              "function"
                                            ? column.accessor(item)
                                            : getNestedValue(
                                                  item,
                                                  column.accessor
                                              )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="no-data">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="table-container-footer">
                <div>
                    Showing {currentData.length} of {filteredData.length}{" "}
                    entries
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default TableContainer;
