import React from 'react'

const TableColumnFilter = ({column}) => {
    const columnFilterValue = column.getFilterValue();
    const { filterVariant } = column.columnDef.meta ?? {};

    return filterVariant === "select" ? (
      <select
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
        className="text-black p-1 rounded-md mt-1"
      >
        {/* See faceted column filters example for dynamic select options */}
        <option value="">All</option>
        <option value="Project Initiated">Project Initiated</option>
        <option value="To Be Started">To Be Started</option>
        <option value="In Progress">In Progress</option>
        <option value="CBR Raised">CBR Raised</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    ) : (
      <span></span>
    );
}

export default TableColumnFilter