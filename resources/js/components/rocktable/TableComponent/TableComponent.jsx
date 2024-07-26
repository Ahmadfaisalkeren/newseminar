import React from "react";
import "./TableComponent.scss";

const TableComponent = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="table-header">
              {col.header}
            </th>
          ))}
          <th className="table-header">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="table-cell">
                  {col.render
                    ? col.render(item[col.accessor], item)
                    : item[col.accessor]}
                </td>
              ))}
              <td className="table-cell">
                <div className="action-buttons">
                  <button onClick={() => onEdit(item)} className="edit-button">
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1} className="no-data">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
