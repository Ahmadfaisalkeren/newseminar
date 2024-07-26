import React, { useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "./RockModal.scss";
import { colorMap } from "./Color";

const RockModal = ({ isOpen, onClose, children, color, width, type }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleBodyOverflow = () => {
            document.body.style.overflow = isOpen ? "hidden" : "auto";
        };

        handleBodyOverflow();

        return () => {
            handleBodyOverflow();
        };
    }, [isOpen]);

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const backgroundColor = colorMap[color] || "#fff";
    const modalWidth = width ? `${width}%` : "80%";

    const modalStyle = {
        backgroundColor: type === 'solid' ? backgroundColor : `${backgroundColor}80`, // Adjust transparency
        width: modalWidth,
    };

    return (
        <div>
            <div
                className={`modal-overlay ${isOpen ? "open" : ""}`}
                onClick={onClose}
            >
                <div
                    className={`modal no-scrollbar ${isOpen ? "open" : ""}`}
                    ref={modalRef}
                    onClick={handleModalClick}
                    style={modalStyle}
                >
                    <button className="close-button" onClick={onClose}>
                        <IoMdClose />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default RockModal;
