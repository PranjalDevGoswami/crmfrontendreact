import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPageNumber, addPageSize } from "../../utils/slices/projectSlice";

const Pagination = () => {
  const { page_size, page_number, totalRows,projects } = useSelector(
    (store) => store.projectData
  );
  const dispatch = useDispatch();
  return (
    <div className="flex justify-end items-center gap-2 m-2 text-xs">
      <div>
        Showing {projects.length} of {totalRows} projects
      </div>
      {/* <button
        className="border rounded p-1"
        onClick={() => dispatch(addPageNumber(1))}
        disabled={page_number === 1}
      >
        {"<<"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => dispatch(addPageNumber(page_number - 1))}
        disabled={page_number === 1}
      >
        {"<"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => dispatch(addPageNumber(page_number + 1))}
        disabled={page_number === Math.ceil(totalRows / page_size)}
      >
        {">"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() =>
          dispatch(addPageNumber(Math.ceil(totalRows / page_size)))
        }
        disabled={page_number === Math.ceil(totalRows / page_size)}
      >
        {">>"}
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {page_number} of {Math.ceil(totalRows / page_size)}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
          min="1"
          max={Math.ceil(totalRows / page_size)}
          defaultValue={page_number}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) : 1;
            dispatch(addPageNumber(page));
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={page_size}
        onChange={(e) => {
          dispatch(addPageSize(Number(e.target.value)));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default Pagination;
