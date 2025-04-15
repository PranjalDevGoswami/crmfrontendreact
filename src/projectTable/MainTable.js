import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableColumn } from "./TableColumn";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableData } from "./TableData";
import Popup from "../Atom/Popup";
import ViewMultipleSampleCpi from "../project/view/ViewMultipleSampleCpi";
import ViewSowUploadList from "../project/view/ViewSowUploadList";
import Pagination from "./Pagination";
import ProjectSampleEditRequest from "../operation/projectSampleEditRequest/projectSampleEditRequest";
import AddManDaysInduvisual from "../operation/addManDays/AddManDaysInduvisual";
import UpdateStatus from "../operation/updateStatus/UpdateStatus";
import UpdateSow from "../sales/updateSow/UpdateSow";
import { addPageNumber, addPageSize } from "../../utils/slices/projectSlice";
import RaiseCbr from "../operation/raiseCbr/RaiseCbr";
import ViewCbr from "../project/view/ViewCbr";
import TableColumnFilter from "../components/TableColumnFilter";
import SpinnerLoader from "../components/SpinnerLoader";

const MainTable = () => {
  const dispatch = useDispatch();
  const { isViewMultipleSampleCpiRecords } = useSelector(
    (store) => store.addMultipleSampleCpi
  );
  const {
    showSowList,
    isEdit,
    changeProjectStatus,
    isAddManDays,
    isUploadSow,
    isRaiseCbr,
    isViewCbr,
  } = useSelector((store) => store.dataTable);
  const { page_size, page_number, projects, totalRows } = useSelector(
    (store) => store.projectData
  );
  const { selectedOptions, openFilterDrawer, filterOption } = useSelector(
    (store) => store.filterSlice
  );
  const [pagination, setPagination] = useState({
    page_number,
    page_size,
  });
  const [columnFilters, setColumnFilters] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const listInnerRef = useRef();
  const [rowSelection, setRowSelection] = useState([]);
  const [tableHeight, setTableHeight] = useState(0);

  const currentDate = new Date().toISOString().split("T")[0];

  const data = TableData();
  const columns = TableColumn();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: (row) => {
      let enableDate =
        new Date(row.original.tentative_end_date) >= new Date(currentDate);
      let enableStatus =
        row.original.status !== "CBR Raised" &&
        row.original.status !== "Completed" &&
        row.original.status !== "On Hold" &&
        row.original.status !== "Cancelled";
      return enableDate && enableStatus;
    },
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    filterFns: {},
    onColumnFiltersChange: setColumnFilters,
    state: {
      rowSelection,
      pagination,
      columnFilters,
    },
    onRowSelectionChange: setRowSelection,
    getRowCanSelect: (row) => {
      let enableDate =
        new Date(row.original.tentative_end_date) >= new Date(currentDate);
      let enableStatus =
        row.original.status !== "CBR Raised" ||
        row.original.status !== "Completed";
      return enableDate && enableStatus;
    },
  });

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      // Subtract some offset for pagination/footer (e.g., 100px)
      const availableHeight = Math.max(vh - 200, 300); // min 300px
      setTableHeight(availableHeight);
    };

    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isFilterApplied =
    !!filterOption.searchText ||
    !!filterOption.selectedOption.length ||
    !!filterOption.dateRange.startDate ||
    !!filterOption.dateRange.endDate;

  const onScrollLoadProjectData = () => {
    if (!isFilterApplied) {

      if (listInnerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          if (totalRows !== projects.length) {
            dispatch(addPageNumber(page_number + 1));
          }
        }
      }
    }
  };

  if(projects.length === 0){
    return <SpinnerLoader />
  }

  return (
    <div className="rounded-sm overflow-visible">
      {/* <div
        className={`mb-2 ${
          data.length > 20
            ? "h-[70vh] overflow-auto"
            : "h-auto overflow-visible"
        } `}
        onScroll={onScrollLoadProjectData}
        ref={listInnerRef}
      > */}
      <div
        className="mb-2 overflow-auto"
        style={{
          height: data.length > 20 ? `${tableHeight}px` : "auto",
        }}
        onScroll={onScrollLoadProjectData}
        ref={listInnerRef}
      >
        <table className="rounded-sm text-xs w-full h-full text-center overflow-visible relative">
          <thead className="sticky top-0 z-30">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border border-gray-300  primary_color text-white"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border border-gray-300 p-3">
                    {header.isPlaceholder ? null : (
                      // flexRender(
                      //     header.column.columnDef.header,
                      //     header.getContext()
                      //   )
                      <>
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <TableColumnFilter column={header.column} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-300 bg-white overflow-visible">
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`border border-gray-300 ${
                  rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-400 text-black transition duration-200`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-2 py-1 border border-gray-300 text-xs text-gray-800"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
      {isLoadingMore && (
        <div className="text-center py-4 text-sm text-gray-500">
          Loading more...
        </div>
      )}
      {totalRows === projects.length && (
        <div className="text-center py-4 text-sm text-gray-500">
          You’ve reached the end of the list!
        </div>
      )}

      {isViewMultipleSampleCpiRecords && (
        <Popup>
          <ViewMultipleSampleCpi />
        </Popup>
      )}
      {showSowList && (
        <Popup>
          <ViewSowUploadList />
        </Popup>
      )}
      {isEdit && (
        <Popup>
          <ProjectSampleEditRequest />
        </Popup>
      )}
      {isAddManDays && (
        <Popup>
          <AddManDaysInduvisual />
        </Popup>
      )}
      {changeProjectStatus && (
        <Popup>
          <UpdateStatus />
        </Popup>
      )}
      {isUploadSow && (
        <Popup>
          <UpdateSow />
        </Popup>
      )}
      {isRaiseCbr && (
        <Popup className={"!w-2/3"}>
          <RaiseCbr />
        </Popup>
      )}
      {isViewCbr && (
        <Popup>
          <ViewCbr />
        </Popup>
      )}
    </div>
  );
};

export default MainTable;
