// import React, { useContext, useEffect, useRef, useState } from "react";
// import DataTable from "react-data-table-component";
// import { useSelector, useDispatch } from "react-redux";
// import { DataTableContext } from "../ContextApi/DataTableContext";
// import { Data } from "../../utils/tableData/data";
// import { customStyles } from "../../utils/tableData/DataTablesData";
// import FilterProject from "../project/FilterProject";
// import ProjectNameAndFilter from "../project/ProjectNameAndFilter";
// import { useNavigate } from "react-router-dom";
// import ABRStatusTabs from "../project/projectCRUDOperations/ABRStatusTabs";
// import { FilterContext } from "../ContextApi/FilterContext";
// import { addPageNumber, addPageSize } from "../../utils/slices/ProjectSlice";
// import useAbrProjectData from "../../utils/hooks/useAbrProjectData";
// import { addFilterProjectData } from "../../utils/slices/FilterProjectDataSlice";
// import { abrTableColumn } from "../../utils/tableData/abrTableColumn";
// import { toggleViewMultipleCpiSample } from "../../utils/slices/MultipleSampleCpiRecordsSlice";

// const AbrDashboard = () => {
//   const {totalRows,ProjectData} = useSelector((store) => store.projectData);
//   const darkMode = useSelector((store) => store.darkMode.isDarkMode);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const buttonRef = useRef(null);

//   const {
//     setShowSowList,
//     setSowList,
//     toggledClearRows,
//     setToggleClearRows,
//     isDrawerOpen,
//   } = useContext(DataTableContext);
//   const { setActiveTabValue } = useContext(FilterContext);
//     const [multipleCpiSample, setMultipleCpiSample] = useState([]);
  

//   const finance = useAbrProjectData();
//   dispatch(addFilterProjectData(finance));

//   useEffect(() => {
//     setActiveTabValue("Advanced Billing Raised");
//   }, []);

//   const data = Data();
//   const currentDate = new Date().toISOString().split("T")[0];

//   const desabledRowData = data?.map((item) => {
//     let desabled = false;
//     if (
//       item.status === "Completed" ||
//       item.status === "cbr_raised" ||
//       new Date(item.tentative_end_date) < new Date(currentDate)
//     ) {
//       desabled = true;
//     }
//     return { ...item, desabled };
//   });

//   const handleClearRows = () => {
//     setToggleClearRows(!toggledClearRows);
//   };
//   useEffect(() => {
//     if (isDrawerOpen == false) {
//       handleClearRows(); // Call clear rows when new data is loaded
//     }
//   }, [isDrawerOpen]);

//   const handlePerRowsChange = (e) => {
//     dispatch(addPageSize(e));
//   };
//   const handlePageChange = (e) => {
//     dispatch(addPageNumber(e));
//   };
//   const handleViewCpi = (row) => {
//       const viewSampleCpi = financeProjectData.filter((item) => {
//         return item?.project?.id === row?.id;
//       });
//       setMultipleCpiSample(viewSampleCpi);
//       dispatch(toggleViewMultipleCpiSample(true));
//     };
//      const handleViewAddnl = (row) => {
//         const viewSampleCpi = ProjectData.filter((item) => item?.id === row?.id);
//         setMultipleCpiSample(viewSampleCpi);
//         dispatch(toggleViewMultipleCpiSample(true));
//       };
//   return (
//     <div
//       className={`${
//         darkMode ? "bg-black border-white border" : "bg-white"
//       } p-4 rounded-md mt-8 shadow-lg`}
//     >
//       <div className="w-full">
//         <div
//           className={`${
//             isDrawerOpen ? "opacity-30 relative overflow-hidden" : "opacity-100"
//           }`}
//         >
//           <ProjectNameAndFilter
//             data={data}
//             ProjectHeading={"Advanced Billing Requisition	"}
//             NoProjectHeading={"No Project Found"}
//           />
//           <div className="relative w-full">
//             <ABRStatusTabs
//               className={
//                 "absolute top-[10px] overflow-x-auto left-0 z-10 no-scrollbar w-8/12"
//               }
//             />
//           </div>

//           <DataTable
//             columns={abrTableColumn({
//               buttonRef,
//               handleViewCpi,
//               setShowSowList,
//               setSowList,
//               navigate,
//               data,
//               handleViewAddnl,
//             })}
//             data={desabledRowData}
//             pagination
//             paginationServer
//             onChangeRowsPerPage={handlePerRowsChange}
//             onChangePage={handlePageChange}
//             customStyles={customStyles}
//             selectableRowDisabled={(row) => row.desabled}
//             actions={<FilterProject />}
//             clearSelectedRows={toggledClearRows} // Pass the toggle state here
//             striped={true}
//             paginationTotalRows={totalRows}
//             highlightOnHover={true}
//             paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
//             theme={darkMode ? "dark" : "default"}
//             persistTableHead={true}
//             loading={"Loading...."}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AbrDashboard;

import React, { useContext, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import FilterProject from "../project/FilterProject";
import { customStyles } from "../../utils/tableData/DataTablesData";
import { useDispatch, useSelector } from "react-redux";
import { DataTableContext } from "../ContextApi/DataTableContext";
import ProjectNameAndFilter from "../project/ProjectNameAndFilter";
import { useNavigate } from "react-router-dom";
import CBRStatusTabs from "../project/projectCRUDOperations/CBRStatusTabs";
import { FilterContext } from "../ContextApi/FilterContext";
import { addPageNumber, addPageSize } from "../../utils/slices/ProjectSlice";
import { cbrTableColumn, financeTableColumn } from "../../utils/tableData/cbrTableColumn";
import { Data } from "../../utils/tableData/data";
import Popup from "../Atom/Popup";
import ViewMultipleSampleCpi from "../project/projectCRUDOperations/ViewMultipleSampleCpi";
import { toggleViewMultipleCpiSample } from "../../utils/slices/MultipleSampleCpiRecordsSlice";
import { addFilterProjectData } from "../../utils/slices/FilterProjectDataSlice";
import useCbrProjectData from "../../utils/hooks/useCbrProjectData";
import useAbrProjectData from "../../utils/hooks/useAbrProjectData";

const AbrDashboard = () => {
  const ProjectData = useSelector((store) => store.projectData.projects);
  const isMultipleCpiSample = useSelector(
    (store) => store.MultiSampleCpiRecord.isViewMultipleSampleCpiRecords
  );
  const totalRows = useSelector((store) => store.projectData.totalRows);
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const { setActiveTabValue, financeProjectData } = useContext(FilterContext);
  const [multipleCpiSample, setMultipleCpiSample] = useState([]);
  const { setShowSowList, setSowList, toggledClearRows, isDrawerOpen } =
    useContext(DataTableContext);

  const finance = useCbrProjectData();
  const finance1 = useAbrProjectData();
  console.log("🚀 ~ AbrDashboard ~ useAbrProjectData:", finance1)
  console.log("🚀 ~ AbrDashboard ~ useCbrProjectData:", finance)
  dispatch(addFilterProjectData(finance1))
  useEffect(() => {
    setActiveTabValue("Advanced Billing Raised");
  }, []);

  const data = Data();

  const handlePerRowsChange = (e) => {
    dispatch(addPageSize(e));
  };
  const handlePageChange = (e) => {
    dispatch(addPageNumber(e));
  };

  const handleViewCpi = (row) => {
    const viewSampleCpi = financeProjectData.filter((item) => {
      return item?.project?.id === row?.id;
    });
    setMultipleCpiSample(viewSampleCpi);
    dispatch(toggleViewMultipleCpiSample(true));
  };
  const handleViewAddnl = (row) => {
    console.log(row);
    const viewSampleCpi = ProjectData.filter((item) => item?.id === row?.id);
    setMultipleCpiSample(viewSampleCpi);
    dispatch(toggleViewMultipleCpiSample(true));
  };
  return (
    <div
      className={`${
        darkMode ? "bg-black border-white border" : "bg-white"
      } p-4 rounded-md mt-8 shadow-lg`}
    >
      <div className="w-full">
        <div
          className={`${
            isDrawerOpen ? "opacity-30 relative overflow-hidden" : "opacity-100"
          }`}
        >
          <ProjectNameAndFilter
            data={data}
            ProjectHeading={"Advanced Billing Requisition"}
            NoProjectHeading={"No Project Found"}
          />
          <div className="relative w-full">
            <CBRStatusTabs
              className={
                "absolute top-[10px] overflow-x-auto left-0 z-10 no-scrollbar w-8/12"
              }
            />
          </div>

          <DataTable
            columns={cbrTableColumn({
              buttonRef,
              handleViewCpi,
              setShowSowList,
              setSowList,
              navigate,
              data,
              handleViewAddnl,
            })}
            data={data}
            pagination
            paginationServer
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            customStyles={customStyles}
            selectableRowDisabled={(row) => row.desabled}
            actions={<FilterProject />}
            clearSelectedRows={toggledClearRows} // Pass the toggle state here
            striped={true}
            paginationTotalRows={totalRows}
            highlightOnHover={true}
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
            theme={darkMode ? "dark" : "default"}
            persistTableHead={true}
            loading={"Loading...."}
          />
        </div>
      </div>
      {isMultipleCpiSample && (
        <Popup>
          <ViewMultipleSampleCpi viewRecord={multipleCpiSample} />
        </Popup>
      )}
    </div>
  );
};

export default AbrDashboard;