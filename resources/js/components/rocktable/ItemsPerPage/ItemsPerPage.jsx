import React from "react";
import "./ItemsPerPage.scss";

const ItemsPerPage = ({ value, onChange }) => {
    return (
        <div className="items-per-page">
            <select
                className="items-per-page__select"
                value={value}
                onChange={onChange}
            >
                {[1, 5, 10, 25, 50, 100].map((perPage) => (
                    <option key={perPage} value={perPage}>
                        {perPage}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ItemsPerPage;
