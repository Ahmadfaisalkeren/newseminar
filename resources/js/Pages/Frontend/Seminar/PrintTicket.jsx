import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import TicketImage from "../../../assets/Tickets/ticket1.png";
import axios from "axios";
import { useParams } from "react-router-dom";

const PrintTicket = () => {
    const ticketRef = useRef();
    const iframeRef = useRef();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(true);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`/api/order/${id}`);
                setOrder(response.data.order);
            } catch (error) {
                console.error("Error fetching order data", error.message);
            }
        };

        fetchOrderData();
    }, [id]);

    useEffect(() => {
        if (order) {
            const generatePDF = async () => {
                const canvas = await html2canvas(ticketRef.current, {
                    useCORS: true,
                    scale: 2,
                });

                const imgData = canvas.toDataURL("image/png");

                const doc = new jsPDF({
                    orientation: "landscape",
                    unit: "px",
                    format: [415, 130], // Adjusted dimensions
                });

                doc.addImage(imgData, "PNG", 0, 0, 415, 130); // Adjusted dimensions

                const pdfBlob = doc.output("blob");
                const pdfUrl = URL.createObjectURL(pdfBlob);

                iframeRef.current.src = pdfUrl;

                setIsGeneratingPDF(false);
            };

            generatePDF();
        }
    }, [order]);

    return (
        <div>
            {order ? (
                <>
                    {isGeneratingPDF && (
                        <div ref={ticketRef} style={styles.ticket}>
                            <div style={styles.gradientBackground}></div>
                            <img
                                src={TicketImage}
                                style={styles.ticketImage}
                                alt="Ticket"
                            />
                            <div>
                                <h1
                                    style={{ ...styles.text, ...styles.header }}
                                >
                                    {order.seminar.title}
                                </h1>
                                <p style={{ ...styles.text, ...styles.date }}>
                                    {new Date(
                                        order.seminar.seminar_date
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <h1
                                    style={{
                                        ...styles.text,
                                        ...styles.location,
                                    }}
                                >
                                    {order.seminar.location}
                                </h1>
                                <p
                                    style={{
                                        ...styles.text,
                                        ...styles.attendee,
                                    }}
                                >
                                    {order.user.name} <br />
                                    {order.transaction_id}
                                </p>
                            </div>
                        </div>
                    )}
                    <iframe
                        ref={iframeRef}
                        style={{
                            width: "100%",
                            height: "100vh",
                            border: "none",
                        }}
                        title="Ticket Preview"
                    />
                </>
            ) : (
                <p>Loading ticket data...</p>
            )}
        </div>
    );
};

const styles = {
    ticket: {
        width: "415px", // Adjusted width
        height: "130px", // Adjusted height
        position: "relative",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
    },
    gradientBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, #0062ff, #da61ff)",
        zIndex: 0,
    },
    ticketImage: {
        position: "absolute",
        top: "5px", // Adjusted top
        left: "5px", // Adjusted left
        width: "405px", // Adjusted width
        height: "120px", // Adjusted height
        zIndex: 1,
    },
    text: {
        position: "absolute",
        color: "#000",
        zIndex: 2,
    },
    header: {
        top: "10px", // Adjusted top
        left: "143px", // Adjusted left
        fontSize: "12px", // Adjusted font size
        fontWeight: "600",
    },
    date: {
        top: "70px", // Adjusted top
        left: "170px", // Adjusted left
        fontSize: "8px", // Adjusted font size
        color: "#fff",
    },
    location: {
        top: "78px", // Adjusted top
        left: "170px", // Adjusted left
        fontSize: "10px", // Adjusted font size
        fontWeight: "500",
        color: "#fff",
    },
    attendee: {
        top: "40px", // Adjusted top
        left: "143px", // Adjusted left
        fontSize: "9px", // Adjusted font size
    },
    seat: {
        top: "70px", // Adjusted top
        left: "10px", // Adjusted left
        fontSize: "9px", // Adjusted font size
    },
};

export default PrintTicket;
