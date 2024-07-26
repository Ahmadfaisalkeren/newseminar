import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

const exportToXLSX = async (columns, data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Define the header row
    const headerRow = columns.map((col) => col.header);
    worksheet.addRow(headerRow);

    // Add data rows
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rowData = columns.map((col) => {
            if (col.accessor === "image") {
                return row[col.accessor]; // Placeholder for image
            } else if (col.accessor === "sequenceNumber") {
                return i + 1; // Sequence number
            } else {
                return typeof col.accessor === "function"
                    ? col.accessor(row)
                    : row[col.accessor];
            }
        });
        worksheet.addRow(rowData);
    }

    // Add images
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row.image) {
            const imageUrl = row.image;
            const image = await fetch(imageUrl)
                .then((res) => res.blob())
                .then((blob) => {
                    const reader = new FileReader();
                    return new Promise((resolve) => {
                        reader.onload = () => resolve(reader.result);
                        reader.readAsArrayBuffer(blob);
                    });
                });

            const imageId = workbook.addImage({
                buffer: image,
                extension: "png",
            });

            worksheet.addImage(imageId, {
                tl: { col: 6, row: i + 1 },
                ext: { width: 40, height: 40 },
            });
        }
    }

    // Save the workbook
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "data.xlsx");
};

export default exportToXLSX;
