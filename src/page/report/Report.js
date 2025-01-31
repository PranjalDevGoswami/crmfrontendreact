import React, { useContext, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import {
  customStyles,
  Dummycolumns,
  DummyData,
} from "../../../utils/tableData/DataTablesData";
import FilterProject from "../../project/FilterProject";
import Shimmer from "../../Atom/Shimmer";
import ProjectNameAndFilter from "../../project/ProjectNameAndFilter";
import ProjectStatusTabs from "../../project/projectCRUDOperations/ProjectStatusTabs";
import { FilterContext } from "../../ContextApi/FilterContext";
import { DataTableContext } from "../../ContextApi/DataTableContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TableColumnReport } from "../../../utils/tableData/dataTableColumnsReport";
import { ReportData } from "../../../utils/tableData/reportData";
import { toggleViewMultipleCpiSample } from "../../../utils/slices/MultipleSampleCpiRecordsSlice";
import { useDispatch } from "react-redux";
import Popup from "../../Atom/Popup";
import ViewMultipleSampleCpi from "../../project/projectCRUDOperations/ViewMultipleSampleCpi";
import { addPageNumber, addPageSize } from "../../../utils/slices/ProjectSlice";
import ViewAddlnFee from "../../project/projectCRUDOperations/ViewAddlnFee";

const Report = () => {
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const buttonRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, setIsLoading, setActiveTabValue } =
    useContext(FilterContext);
  const { setShowSowList, setSowList, toggledClearRows, isDrawerOpen } =
    useContext(DataTableContext);
  const { totalRows, projects, page_size } = useSelector(
    (store) => store.projectData
  );
  const [multipleCpiSample, setMultipleCpiSample] = useState([]);
  const [addlnFee, setAddlnFee] = useState([]);
  const isMultipleCpiSample = useSelector(
    (store) => store.MultiSampleCpiRecord.isViewMultipleSampleCpiRecords
  );
  const [isAddlnFee,setisAddlnFee] = useState(false)
  useEffect(() => {
    setActiveTabValue("all");
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [projects]);

  const handleViewCpi = (row) => {
    const viewSampleCpi = projects?.filter((item) => item?.id === row?.id);
    console.log("🚀 ~ handleViewCpi ~ viewSampleCpi:", viewSampleCpi)
    setMultipleCpiSample(viewSampleCpi);
    dispatch(toggleViewMultipleCpiSample(true));
  };
  const handleViewAddnl = (row) =>{    
    setisAddlnFee(true)
    const addlnfee1 = 
        {
          setupFee:row.set_up_fee,
          otherFee:row.other_cost,
          translationFee:row.transaction_fee
        }
          
    setAddlnFee(addlnfee1)
  }
  const handlePerRowsChange = (e) => {
    dispatch(addPageSize(e));
  };
  const handlePageChange = (e) => {
    dispatch(addPageNumber(e));
  };

  const data = ReportData();

  const currentDate = new Date().toISOString().split("T")[0];

  const desabledRowData = data?.map((item) => {
    let desabled = false;
    if (
      item.status === "Completed" ||
      item.status === "CBR Raised" ||
      new Date(item.tentative_end_date) < new Date(currentDate)
    ) {
      desabled = true;
    }
    return { ...item, desabled };
  });

  return (
    <div
      className={`${
        darkMode ? "bg-black border-white border" : "bg-white"
      } p-4 rounded-md mt-8 shadow-lg w-full`}
    >
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="w-full">
          <div
            className={`${
              isDrawerOpen
                ? "opacity-30 relative overflow-hidden"
                : "opacity-100"
            }`}
          >
            <ProjectNameAndFilter
              data={data}
              ProjectHeading={"Report"}
              NoProjectHeading={"No Project Found"}
            />
            <div className="">
              <div className="relative">
                <DataTable
                  columns={
                    data?.length > 0
                      ? TableColumnReport({
                          buttonRef,
                          handleViewCpi,
                          setShowSowList,
                          setSowList,
                          navigate,
                          desabledRowData,
                          handleViewAddnl
                        })
                      : Dummycolumns
                  }
                  data={data?.length > 0 ? desabledRowData : DummyData}
                  pagination
                  paginationServer
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  customStyles={customStyles}
                  selectableRowDisabled={(row) => row.desabled}
                  actions={<FilterProject />}
                  clearSelectedRows={toggledClearRows}
                  striped={true}
                  paginationTotalRows={totalRows}
                  highlightOnHover={true}
                  paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
                  theme={darkMode ? "dark" : "default"}
                  paginationPerPage={page_size}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {isMultipleCpiSample && (
        <Popup>
          <ViewMultipleSampleCpi viewRecord={multipleCpiSample} />
        </Popup>
      )}
        {isAddlnFee && (
        <Popup>
          <ViewAddlnFee viewRecord={addlnFee} setisAddlnFee={setisAddlnFee}/>
        </Popup>
      )}
    </div>
  );
};

export default Report;
