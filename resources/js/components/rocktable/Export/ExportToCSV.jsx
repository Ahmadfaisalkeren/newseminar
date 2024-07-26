import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

const exportToCSV = async (columns, data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Define the header row
    const headerRow = columns.map((col) => col.header);
    worksheet.addRow(headerRow);

    // Add data rows
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rowData = columns.map((col) => {
            if (col.accessor === "sequenceNumber") {
                return i + 1; // Sequence number
            } else {
                return typeof col.accessor === "function"
                    ? col.accessor(row)
                    : row[col.accessor];
            }
        });
        worksheet.addRow(rowData);
    }

    // Convert worksheet to CSV
    const csv = await workbook.csv.writeBuffer();

    // Save the CSV file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
};

export default exportToCSV;
