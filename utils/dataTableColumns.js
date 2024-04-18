import { MdOutlineMoreVert } from "react-icons/md";
import OpereationButton from "../src/project/projectCRUDOperations/OpereationButton";

export const TableColumn = ({
  setIsStatus,
  setisEdit,
  setisView,
  isView,
  setSelectedRecord,
  selectedRecord,
  openDropdownIndex,
  setOpenDropdownIndex,
  setIsViewOptionIndex,
  setIsViewOptionOpen,
  isViewOptionOpen,
  setSelectedIndex,
}) => {
  const handleAddEditOperation = (record, index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? -1 : index);
    setIsViewOptionIndex(index);
    setIsViewOptionOpen(!isViewOptionOpen);
    setSelectedRecord(record);
    setSelectedIndex(index);
  };
  return (columns = [
    {
      name: "Sr.No.",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Project Code",
      selector: (row) => row.project_code,
      sortable: true,
    },
    {
      name: "Client Name",
      selector: (row) => row.clients,
      sortable: true,
    },
    {
      name: "Project Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.project_type,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.tentative_start_date,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.tentative_end_date,
      sortable: true,
    },
    {
      name: "CPI",
      selector: (row) => row.cpi,
      sortable: true,
    },
    {
      name: "Project Target",
      selector: (row) => row.sample,
      sortable: true,
    },
    {
      name: "Achieved Target",
      selector: (row) => row.total_achievement,
      sortable: true,
    },
    {
      name: "Remaining Target",
      selector: (row) => row.remaining_interview,
      sortable: true,
    },
    {
      name: "T. Man Days",
      selector: (row) => row.man_days,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      key: "action",
      text: "Action",
      className: "action",
      align: "left",
      sortable: false,
      cell: (record, index) => {
        return (
          <div className="relative w-full">
            <div className="flex items-center">
              <button
                onClick={() => handleAddEditOperation(record, index)}
                className="border p-2 rounded-md mr-2 cursor-pointer"
              >
                <MdOutlineMoreVert />
              </button>
              {openDropdownIndex === index ? (
                <div
                  className={`${
                    index <= 5 ? "opration_btn" : "opration_btn_bottom"
                  }`}
                >
                  <OpereationButton
                    record={selectedRecord}
                    isView={isView}
                    setisView={setisView}
                    setisEdit={setisEdit}
                    setIsStatus={setIsStatus}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      },
    },
  ]);
};
