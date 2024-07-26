import React from "react";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { FaFileExcel, FaFilePdf, FaFileCsv } from "react-icons/fa";
import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
    pdf,
} from "@react-pdf/renderer";
import "./Export.scss";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: 30,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        fontSize: 10,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
    },
    tableHeader: {
        fontWeight: "bold",
        textAlign: "center",
    },
    tableCell: {
        textAlign: "center",
    },
    image: {
        width: 40,
        height: 40,
        marginVertical: 10,
    },
});

const Export = ({ columns, data }) => {
    const exportToCSV = async () => {
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

    const exportToXLSX = async () => {
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

    const convertImageToDataUrl = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    };

    const MyDocument = ({ data, columns }) => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        {columns.map((col, i) => (
                            <View
                                style={[
                                    styles.tableCol,
                                    { flex: col.flex || 1 },
                                ]}
                                key={i}
                            >
                                <Text style={styles.tableHeader}>
                                    {col.header}
                                </Text>
                            </View>
                        ))}
                    </View>
                    {data.map((row, index) => (
                        <View style={styles.tableRow} key={index}>
                            {columns.map((col, i) => {
                                const value =
                                    col.accessor === "sequenceNumber"
                                        ? index + 1
                                        : typeof col.accessor === "function"
                                        ? col.accessor(row)
                                        : row[col.accessor];

                                if (col.header === "Image" && value) {
                                    return (
                                        <View
                                            style={[
                                                styles.tableCol,
                                                { flex: col.flex || 1 },
                                            ]}
                                            key={i}
                                        >
                                            <Image
                                                style={styles.image}
                                                src={value}
                                            />
                                        </View>
                                    );
                                }

                                return (
                                    <View
                                        style={[
                                            styles.tableCol,
                                            { flex: col.flex || 1 },
                                        ]}
                                        key={i}
                                    >
                                        <Text style={styles.tableCell}>
                                            {value}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    const exportToPDF = async () => {
        // Convert images to data URLs
        const updatedData = await Promise.all(
            data.map(async (row) => {
                const updatedRow = { ...row };
                for (const col of columns) {
                    if (col.header === "Image Cover" && row[col.accessor]) {
                        updatedRow[col.accessor] = await convertImageToDataUrl(
                            row[col.accessor]
                        );
                    }
                }
                return updatedRow;
            })
        );

        const doc = <MyDocument data={updatedData} columns={columns} />;
        const asPdf = pdf([]); // Empty array to initialize pdf
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();
        const blobUrl = URL.createObjectURL(blob);

        // Open the PDF in a new tab
        const newWindow = window.open(blobUrl, "_blank");
        if (newWindow) {
            newWindow.focus();
        } else {
            alert("Please allow popups for this website");
        }
    };

    return (
        <div className="export-buttons">
            <button onClick={exportToCSV} className="csv-button">
                <FaFileCsv /> CSV
            </button>
            <button onClick={exportToXLSX} className="xlsx-button">
                <FaFileExcel /> XLSX
            </button>
            <button onClick={exportToPDF} className="pdf-button">
                <FaFilePdf /> PDF
            </button>
        </div>
    );
};

export default Export;
