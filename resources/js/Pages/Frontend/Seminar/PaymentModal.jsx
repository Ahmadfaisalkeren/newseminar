import React, { useEffect } from "react";
import RockModal from "../../../components/rockmodal/RockModal";

const PaymentModal = ({ isOpen, onClose, orderData, updateOrderData }) => {
    useEffect(() => {
        const handleMessage = (event) => {
            if (
                event.origin === "https://checkout-staging.xendit.co" ||
                event.origin === "https://checkout.xendit.co"
            ) {
                const data = event.data;
                if (data.status === "PAID") {
                    updateOrderData(); // Fetch updated orders
                    onClose(); // Close the modal
                }
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [onClose, updateOrderData]);

    return (
        <RockModal isOpen={isOpen} onClose={onClose} type="solid">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">
                    Payment for {orderData.seminar.title}
                </h2>
                <iframe
                    src={orderData.invoice_url}
                    title="Payment"
                    width="100%"
                    height="600px"
                    frameBorder="0"
                />
            </div>
        </RockModal>
    );
};

export default PaymentModal;
