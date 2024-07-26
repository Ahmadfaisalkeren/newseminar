import React from "react";
import { FaFileExcel, FaFilePdf, FaFileCsv } from "react-icons/fa";
import exportToCSV from "./ExportToCSV";
import exportToXLSX from "./ExportToXLSX";
import exportToPDF from "./ExportToPDF";
import "./Export.scss";

const Export = ({ columns, data, exportPDF, exportXLSX, exportCSV }) => {
    // Filter out the actions column
    const filteredColumns = columns.filter(col => col.header !== "Actions");

    return (
        <div className="export-buttons">
            {exportCSV && (
                <button
                    onClick={() => exportToCSV(filteredColumns, data)}
                    className="csv-button"
                >
                    <FaFileCsv /> CSV
                </button>
            )}
            {exportXLSX && (
                <button
                    onClick={() => exportToXLSX(filteredColumns, data)}
                    className="xlsx-button"
                >
                    <FaFileExcel /> XLSX
                </button>
            )}
            {exportPDF && (
                <button
                    onClick={() => exportToPDF(filteredColumns, data)}
                    className="pdf-button"
                >
                    <FaFilePdf /> PDF
                </button>
            )}
        </div>
    );
};

export default Export;
