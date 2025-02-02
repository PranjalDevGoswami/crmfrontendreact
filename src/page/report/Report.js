import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import FilterProject from "../../project/FilterProject";
import Shimmer from "../../Atom/Shimmer";
import ProjectNameAndFilter from "../../project/ProjectNameAndFilter";
import { FilterContext } from "../../ContextApi/FilterContext";
import { DataTableContext } from "../../ContextApi/DataTableContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReportData } from "../../../utils/tableData/reportData";
import { toggleViewMultipleCpiSample } from "../../../utils/slices/MultipleSampleCpiRecordsSlice";
import { useDispatch } from "react-redux";
import Popup from "../../Atom/Popup";
import ViewMultipleSampleCpi from "../../project/projectCRUDOperations/ViewMultipleSampleCpi";
import { addPageNumber, addPageSize } from "../../../utils/slices/ProjectSlice";
import ViewAddlnFee from "../../project/projectCRUDOperations/ViewAddlnFee";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import columns1 from "../../../utils/tableData/dataTableColumnsReport";
import ViewSowUploadList from "../../project/projectCRUDOperations/ViewSowUploadList";
// import { TableColumnReport } from "../../../utils/tableData/dataTableColumnsReport";

const Report = () => {
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const buttonRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, setIsLoading, setActiveTabValue } =
    useContext(FilterContext);
  const {
    showSowList,
    sowList,
    setShowSowList,
    setSowList,
    toggledClearRows,
    isDrawerOpen,
  } = useContext(DataTableContext);
  const { totalRows, projects, page_size } = useSelector(
    (store) => store.projectData
  );
  const [multipleCpiSample, setMultipleCpiSample] = useState([]);
  const [addlnFee, setAddlnFee] = useState([]);
  const isMultipleCpiSample = useSelector(
    (store) => store.MultiSampleCpiRecord.isViewMultipleSampleCpiRecords
  );
  const [isAddlnFee, setisAddlnFee] = useState(false);
  useEffect(() => {
    setActiveTabValue("all");
  }, []);

  const handleViewCpi = (row) => {
    const viewSampleCpi = projects?.filter((item) => item?.id === row?.id);
    setMultipleCpiSample(viewSampleCpi);
    dispatch(toggleViewMultipleCpiSample(true));
  };
  const handleViewAddnl = (row) => {
    setisAddlnFee(true);
    const addlnfee1 = {
      setupFee: row.set_up_fee,
      otherFee: row.other_cost,
      translationFee: row.transaction_fee,
    };

    setAddlnFee(addlnfee1);
  };

  const handleViewSow = (data) => {
    setShowSowList(true);
    setSowList(data);
  };
  const handleGetInvoice = () => {};
  const handlePerRowsChange = (e) => {
    dispatch(addPageSize(e));
  };
  const handlePageChange = (e) => {
    dispatch(addPageNumber(e));
  };

  const data = ReportData();

  const columns = useMemo(
    () =>
      columns1({
        handleViewCpi,
        handleViewAddnl,
        handleViewSow,
        handleGetInvoice,
      }),
    []
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: useMemo(() => getCoreRowModel(), []),
    getFilteredRowModel: useMemo(() => getFilteredRowModel(), []),
  });

  return (
    <div
      className={`${
        darkMode ? "bg-black border-white border" : "bg-white"
      } p-4 rounded-md mt-8 shadow-lg w-full`}
    >
      <div className="w-full">
        <div
          className={`${
            isDrawerOpen ? "opacity-30 relative overflow-hidden" : "opacity-100"
          }`}
        >
          <ProjectNameAndFilter
            data={data}
            ProjectHeading={"Report"}
            NoProjectHeading={"No Project Found"}
          />
          <div className="text-right flex justify-end m-2">
            <FilterProject />
          </div>
          <div className="">
            <div className="relative overflow-x-scroll">
              <table className="w-full border border-gray-300 shadow-lg rounded-lg ">
                <thead className="bg-red-800 text-white">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border border-gray-600">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="px-4 py-3 border border-gray-600 text-left text-sm font-semibold"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-300 bg-white">
                  {table.getRowModel().rows.map((row, rowIndex) => (
                    <tr
                      key={row.id}
                      className={`border border-gray-300 ${
                        rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200 transition duration-200`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-2 border border-gray-300 text-sm text-gray-800"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
      {isMultipleCpiSample && (
        <Popup>
          <ViewMultipleSampleCpi viewRecord={multipleCpiSample} />
        </Popup>
      )}
      {isAddlnFee && (
        <Popup>
          <ViewAddlnFee viewRecord={addlnFee} setisAddlnFee={setisAddlnFee} />
        </Popup>
      )}
      {showSowList && (
        <Popup>
          <h1>This is Sow List</h1>
          <ViewSowUploadList viewRecord={sowList} />
        </Popup>
      )}
    </div>
  );
};

export default Report;
{
  /* <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted()] ?? null}
                              {header.column.getCanFilter() ? (
                                <div>
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
                                </div>
                              ) : null}
                            </div> */
}
