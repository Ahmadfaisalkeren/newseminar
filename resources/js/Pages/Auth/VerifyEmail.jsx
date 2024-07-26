import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const { id, token } = useParams();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(
                    `/api/verify-email/${id}/${token}`
                );
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response.data.error);
            }
        };

        verifyEmail();
    }, [id, token]);

    return (
        <div>
            <h1>Email Verification</h1>
            <p>{message}</p>
        </div>
    );
};

export default VerifyEmail;
