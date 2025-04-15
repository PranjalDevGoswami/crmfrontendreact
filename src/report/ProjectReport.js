import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ProjectReportColumn from "./projectReport/ProjectReportColumn";
import { ProjectReportData } from "./projectReport/ProjectReportData";
import Popup from "../Atom/Popup";
import ViewMultipleSampleCpi from "../project/view/ViewMultipleSampleCpi";
import ViewSowUploadList from "../project/view/ViewSowUploadList";
import useProjectData from "../../utils/hooks/useProjectData";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ViewAddlnFee from "../project/view/VIewAddlnFee";
import ProjectReportFilterAndName from "./projectReport/ProjectReportFilterAndName";
import ProjectReportFilter from "./projectReport/ProjectReportFilter";
import ViewCbr from "../project/view/ViewCbr";
import TableColumnFilter from "../components/TableColumnFilter";

const ProjectReport = () => {
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const { isViewMultipleSampleCpiRecords } = useSelector(
    (store) => store.addMultipleSampleCpi
  );
  const { showSowList, showAddlnFee, isViewCbr } = useSelector(
    (store) => store.dataTable
  );
    const [columnFilters, setColumnFilters] = useState([]);
  

  useProjectData();

  const isDrawerOpen = false;

  const data = ProjectReportData();
  const columns = ProjectReportColumn();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: useMemo(() => getCoreRowModel(), []),
    getFilteredRowModel: useMemo(() => getFilteredRowModel(), []),
        filterFns: {},
        onColumnFiltersChange: setColumnFilters,
        state: {
          columnFilters,
        },
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
          <ProjectReportFilterAndName
            data={data}
            ProjectHeading={"Project Report"}
            NoProjectHeading={"No Project Found"}
          />
          <div className="text-right flex justify-end m-2">
            <ProjectReportFilter />
          </div>
          <div className="">
            <div className="relative overflow-x-scroll">
              <table className="w-full border border-gray-300 shadow-lg rounded-lg ">
                <thead className="primary_color text-white">
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
                            : 
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
                              }
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
                          className="p-2 border border-gray-300 text-sm text-gray-800"
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
      {isViewMultipleSampleCpiRecords && (
        <Popup>
          <ViewMultipleSampleCpi />
        </Popup>
      )}
      {showAddlnFee && (
        <Popup>
          <ViewAddlnFee />
        </Popup>
      )}
      {showSowList && (
        <Popup>
          <h1>This is Sow List</h1>
          <ViewSowUploadList />
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

export default ProjectReport;
