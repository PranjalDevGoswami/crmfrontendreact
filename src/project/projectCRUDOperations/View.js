import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ManWorkPerDays } from "../../fetchApis/projects/perDayManWork/GetDaysManWork";
import ManDaysDetails from "./ManDaysDetails";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BASEURL } from "../../../utils/constants/urls.js";
import { DataTableContext } from "../../ContextApi/DataTableContext.js";
import SweetAlert from "../../components/SweetAlert";
import { useSelector } from "react-redux";
import Popup from "../../Atom/Popup.js";

const View = () => {
  const [isManDaysDetails, setIsManDaysDetails] = useState(false);
  const [perDayDetailsData, setPerDayDetailsData] = useState([]);
  const [currentProjectDetails, setCurrentProjectDetails] = useState(null);
  const location = useLocation();
  const { state: data } = location;
  const navigate = useNavigate();
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const { closeView, setCloseView, setisView } = useContext(DataTableContext);
  const projectResponse = useSelector(
    (store) => store.projectDataFiltered.projects
  );
  const handleViewDetails = async (projectid) => {
    const response = await ManWorkPerDays({ project_id: projectid });
    if (response?.status) {
      setIsManDaysDetails(true);
      setPerDayDetailsData(response.data);
    } else {
      SweetAlert({
        title: "Data not found!!",
        text: "",
        icon: "info",
      });
    }
  };

  const handleCloseManDaysDetails = (e) => {
    e.preventDefault();
    setIsManDaysDetails(false);
  };

  useEffect(() => {
    const fetchProjectData = () => {
      if (projectResponse) {
        const currentProject = projectResponse.find(
          (item) => item.project_code === data?.project_code
        );
        setCurrentProjectDetails(currentProject || null);
      }
    };
    fetchProjectData();
  }, [data]);

  const renderListItem = (label, value, index, hasDetails = false) => (
    <li
      key={label}
      className={`border p-1 flex items-center text-xl justify-between w-1/2 ${
        darkMode
          ? "bg-black text-white border-b border-white"
          : index % 2 === 0
          ? index % 4 === 0
            ? "bg-white"
            : "bg-gray-100"
          : index % 4 === 1
          ? "bg-gray-100"
          : "bg-white"
      }`}
    >
      <span className="text-xl mr-8 w-5/12">{label}</span>
      <span className="w-2/12">:</span>
      <span className="w-5/12 relative">
        {value}
        {hasDetails && value && (
          <span
            className="absolute top-1 right-1 cursor-pointer underline text-blue-700"
            onClick={() => handleViewDetails(currentProjectDetails.id)}
          >
            Show Details
          </span>
        )}
      </span>
    </li>
  );

  return (
    <div
      className={`${
        darkMode ? "w-full bg-black text-white" : "bg-white"
      } w-full p-8 mt-16 `}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-3xl p-4 underline pl-0 mb-4">Project View</h3>
        <button
          className="bg-gray-300 p-4 pt-2 pb-2"
          onClick={() => {
            navigate(-1);
            setCloseView(false);
            setisView(false);
          }}
        >
          <FaLongArrowAltLeft className="text-3xl" />
        </button>
      </div>
      {currentProjectDetails && (
        <ul className="flex flex-wrap text-left border w-full justify-between rounded-sm">
          {[
            {
              label: "Project Code",
              value: currentProjectDetails.project_code.toUpperCase(),
            },
            { label: "Project Name", value: currentProjectDetails.name },
            {
              label: "Project Type",
              value: currentProjectDetails.project_type?.name,
            },
            { label: "Clients", value: currentProjectDetails.clients?.name },
            {
              label: "Project Manager",
              value: currentProjectDetails.project_manager?.name,
            },
            {
              label: "Project Teamlead",
              value: currentProjectDetails.project_teamlead?.name,
            },
            {
              label: "Operation Team",
              value: currentProjectDetails.operation_team || "N/A",
            },
            {
              label: "Finance Team",
              value: currentProjectDetails.finance_team || "N/A",
            },
            {
              label: "Tentative Start Date",
              value: currentProjectDetails.tentative_start_date?.split("T")[0],
            },
            {
              label: "Tentative End Date",
              value: currentProjectDetails.tentative_end_date?.split("T")[0],
            },
            { label: "Sample", value: currentProjectDetails.sample },
            {
              label: "Achiev Target",
              value: currentProjectDetails.total_achievement,
            },
            {
              label: "Total Man Days",
              value: currentProjectDetails.man_days,
              hasDetails: true,
            },
            { label: "Cost Per Interview", value: currentProjectDetails.cpi },
            {
              label: "Other Cost",
              value: currentProjectDetails.other_cost || "N/A",
            },
            { label: "Set Up Fee", value: currentProjectDetails.set_up_fee },
            {
              label: "Translation Cost",
              value: currentProjectDetails.transaction_fee || "N/A",
            },
            { label: "Status", value: currentProjectDetails.status },
            {
              label: "Sow",
              value: currentProjectDetails.upload_document && (
                <Link
                  to={BASEURL + currentProjectDetails.upload_document}
                  target="_blank"
                >
                  <img
                    src={BASEURL + currentProjectDetails.upload_document}
                    className="w-8 h-8"
                    alt="sow file"
                  />
                  <span className="absolute top-1 right-1 cursor-pointer underline text-blue-700">
                    View
                  </span>
                </Link>
              ),
            },
          ].map(({ label, value, hasDetails }, index) =>
            renderListItem(label, value, index, hasDetails)
          )}
        </ul>
      )}
      {isManDaysDetails && (
        <Popup>
          <div
            className={`${darkMode ? "bg-black text-white" : "bg-gray-300"}`}
          >
            <h3
              className={`${
                darkMode ? "bg-black text-white" : "bg-white"
              } text-xl mt-4 p-2 `}
            >
              Day wise Detail View of achieving Target and Men-days utilization
              for Targeted Sample Size:
              <span className="font-bold">{' "' + data.sample + '" '}</span>
            </h3>
            <ManDaysDetails perDayDetailsData={perDayDetailsData} />
            <div className="absolute top-3 right-1 p-0 m-0 rounded w-8 h-8 flex items-center justify-center text-xl">
              <button onClick={handleCloseManDaysDetails}>X</button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default View;
