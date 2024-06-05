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
  buttonRef,
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
      name: "SN.",
      selector: (row) => row.id,
      sortable: true,
      width: "75px",
    },
    {
      name: "Project Code",
      selector: (row) => row.project_code,
      sortable: true,
      width: "120px",
    },
    {
      name: "Client Name",
      selector: (row) => row.clients,
      sortable: true,
      width: "100px",
    },
    {
      name: "Project Name",
      selector: (row) => row.name,
      sortable: true,
      width: "auto",
    },
    {
      name: "Type",
      selector: (row) => row.project_type,
      sortable: true,
      width: "85px",
    },
    {
      name: "Start Date",
      selector: (row) => row.tentative_start_date,
      sortable: true,
      width: "110px",
    },
    {
      name: "End Date",
      selector: (row) => row.tentative_end_date,
      sortable: true,
      width: "110px",
    },
    {
      name: "CPI",
      selector: (row) => row.cpi,
      sortable: true,
      width: "75px",
    },
    {
      name: "Project Target",
      selector: (row) => row.sample,
      sortable: true,
      width: "100px",
    },
    {
      name: "Ach. Target",
      selector: (row) => row.total_achievement,
      sortable: true,
      width: "100px",
    },
    {
      name: "Rem. Target",
      selector: (row) => row.remaining_interview,
      sortable: true,
      width: "100px",
    },
    {
      name: "T. Man Days",
      selector: (row) => row.man_days,
      sortable: true,
      width: "100px",
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
      width: "90px",
    },
    {
      name: "Actions",
      key: "action",
      text: "Action",
      className: "action",
      align: "left",
      sortable: false,
      width: "90px",
      cell: (record, index) => {
        return (
          <div className="relative w-full">
            <div className="flex items-center overflow-visible">
              <button
                onClick={() => handleAddEditOperation(record, index)}
                className="border p-2 rounded-md mr-2 cursor-pointer"
              >
                <MdOutlineMoreVert />
              </button>
              {openDropdownIndex === index ? (
                <div
                  ref={buttonRef}
                  onClick={(e) => e.stopPropagation()}
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
