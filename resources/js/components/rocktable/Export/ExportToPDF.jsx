import React from "react";
import { Document, Page, Text, View, Image, StyleSheet, pdf } from "@react-pdf/renderer";

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
        wordBreak: "break-word",
    },
    image: {
        width: 40,
        height: 40,
        marginVertical: 10,
    },
});

const getNestedProperty = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const MyDocument = ({ data, columns }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    {columns.map((col, i) => (
                        <View
                            key={i}
                            style={[
                                styles.tableCol,
                                { width: col.width || "auto" },
                            ]}
                        >
                            <Text style={styles.tableHeader}>{col.header}</Text>
                        </View>
                    ))}
                </View>
                {data.map((row, index) => (
                    <View style={styles.tableRow} key={index}>
                        {columns.map((col, i) => {
                            let value;
                            if (col.accessor === "sequenceNumber") {
                                value = index + 1;
                            } else if (typeof col.accessor === "function") {
                                value = col.accessor(row);
                            } else {
                                value = getNestedProperty(row, col.accessor);
                            }

                            if (col.header === "Image" && value) {
                                return (
                                    <View
                                        key={i}
                                        style={[
                                            styles.tableCol,
                                            { width: col.width || "auto" },
                                        ]}
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
                                    key={i}
                                    style={[
                                        styles.tableCol,
                                        { width: col.width || "auto" },
                                    ]}
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

const convertImageToDataUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
};

const exportToPDF = async (columns, data) => {
    const updatedData = await Promise.all(
        data.map(async (row) => {
            const updatedRow = { ...row };
            for (const col of columns) {
                if (
                    col.header === "Image" &&
                    typeof col.accessor === "function"
                ) {
                    updatedRow[col.accessor] = await convertImageToDataUrl(
                        col.accessor(row)
                    );
                } else if (col.header === "Image") {
                    const value = getNestedProperty(row, col.accessor);
                    if (value) {
                        updatedRow[col.accessor] = await convertImageToDataUrl(
                            value
                        );
                    }
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

    const newWindow = window.open(blobUrl, "_blank");
    if (newWindow) {
        newWindow.focus();
    } else {
        alert("Please allow popups for this website");
    }
};

export default exportToPDF;
