import { useContext, useEffect, useState } from "react";
import { NotifiactionContext } from "../ContextApi/NotificationContext";
import Button from "../Atom/Button";
import {
  getWithAuth,
  patchWithAuth,
  postWithAuth,
  putWithAuth,
} from "../provider/helper/axios";
import {
  ACCEPTPROJECTREQUEST,
  EDITPROJECTREQUEST,
  REJECTPROJECTREQUEST,
} from "../../utils/constants/urls";
import SweetAlert from "../components/SweetAlert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Tooltip from "../components/Tooltip";
import ViewMultipleSampleCpi from "../project/projectCRUDOperations/ViewMultipleSampleCpi";
import Popup from "../Atom/Popup";
import { toggleViewMultipleCpiSample } from "../../utils/slices/MultipleSampleCpiRecordsSlice";
import { setnotification } from "../../utils/slices/notificationCountSlice";
import { notificationCount } from "../../utils/apis/notificationCount";
import { ProjectData } from "../../utils/apis/projectData";
import { setProjects } from "../../utils/slices/ProjectSlice";
import { FilterContext } from "../ContextApi/FilterContext";

const OpenNotification = ({ notification_btn_ref }) => {
  const {
    notificationProjectList,
    setIsViewNotification,
    setNotificationProjectList,
  } = useContext(NotifiactionContext);
  const {activeTabValue} = useContext(FilterContext)
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const isMultipleCpiSample = useSelector(
    (store) => store.MultiSampleCpiRecord.isViewMultipleSampleCpiRecords
  );
    const {page_number,page_size} = useSelector(store=>store.projectData)

  const token = localStorage.getItem("token");

  const [dataToUpdate, setDataToUpdate] = useState({
    id: "",
    tentative_end_date: "",
    sample: "",
    reason_for_adjustment: "",
    send_email_manager: "",
  });
  const [multipleView, setMultipleView] = useState();
  const [projectData, setProjectData] = useState([]);
  const project = useSelector((store) => store.projectData.projects);

  useEffect(() => {
    const fetchProjectData = () => {
      setProjectData(project);
    };
    fetchProjectData();
  }, [token]);

  const handleAccept = async (id) => {
    const response = await postWithAuth(ACCEPTPROJECTREQUEST(id),{
      "is_approved": "True"
  });
    if (response?.status == true) {
      SweetAlert({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
      });
      setIsViewNotification(false);
      setNotificationProjectList([]);
      const notificationCountfreshData = await notificationCount();
      dispatch(setnotification(notificationCountfreshData));
      const projectData = await ProjectData(page_number,page_size,activeTabValue);
      dispatch(setProjects(projectData.results));
    } else {
      SweetAlert({
        title: "Error",
        text:
          response.ex.response.data.tentative_end_date ||
          "Somethings went wrong",
        icon: "error",
      });
    }
  };

  const handleViewCpi = (dataType) => {
    const dataToView =
      dataType === "old" ? getOldProjectData : notificationProjectList;
    dispatch(toggleViewMultipleCpiSample(true));
    setMultipleView(dataToView);
  };

  const getOldProjectData = projectData?.filter((item) => {
    return notificationProjectList?.some(
      (notificationItem) => notificationItem?.project?.id === item?.id
    );
  });

  const totalNewProjectSampleCount = notificationProjectList?.reduce(
    (acc, item) => {
      return (acc = acc + Number(item?.pending_changes?.sample)) || 0;
    },
    0
  );
  const handleReject = async (id) => {
    const response = await patchWithAuth(REJECTPROJECTREQUEST(id),{
      "is_rejected": "False"
  });
    if (response?.status == true) {
      SweetAlert({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
      });
      setIsViewNotification(false);
      setNotificationProjectList([]);
      const notificationCountfreshData = await notificationCount();
      dispatch(setnotification(notificationCountfreshData));
      const projectData = await ProjectData(page_number,page_size,activeTabValue);
      dispatch(setProjects(projectData));
    }
    setIsViewNotification(false);
  };
  const combinedRemarks = notificationProjectList
    ?.map((data) => data?.pending_changes?.remark)
    .join(", ");

  return (
    <div className="z-40" ref={notification_btn_ref}>
      <div
        className={`${
          darkMode
            ? "bg-black text-white border-b-white"
            : "text-black border-b-black"
        } mb-2 cursor-pointer p-4 rounded-md  mt-4`}
      >
        <div>
          <h3>
            Edit Request For Project :
            <span className="font-bold">{getOldProjectData[0]?.name}</span>
          </h3>
        </div>
        <div className="flex justify-between relative">
          <div className="w-1/2 p-4">
            <div className="border">
              <h3 className="border-b-black border font-bold text-xl">
                Old Project Data
              </h3>
              <div className="border-b-black border">
                Project Code:
                {getOldProjectData[0]?.project_code?.toUpperCase()}
              </div>
              <div className="border-b-black border flex text-center justify-center items-center">
                Previous Sample Size:
                {getOldProjectData[0]?.project_samples.length > 1 ? (
                  <Tooltip text={"View Multiple CPI"} className={"w-40"}>
                    <span
                      className="text-xl no-underline"
                      onClick={() => handleViewCpi("old")}
                    >
                      {getOldProjectData[0]?.sample}
                      <span className="cursor-pointer text-xs ml-2 text-blue-700 underline">
                        View Details
                      </span>
                    </span>
                  </Tooltip>
                ) : (
                  getOldProjectData[0]?.sample
                )}
              </div>
              <div className="border-b-black border">
                Previous Date Given:
                {getOldProjectData[0]?.tentative_end_date?.split("T")[0]}
              </div>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <h3 className="border-b-black border font-bold text-xl">
              New Required Project Data
            </h3>
            <div className="border-b-black border">
              Project Code:
              {getOldProjectData[0]?.project_code?.toUpperCase()}
            </div>
            <div className="border-b-black border flex justify-center items-center">
              Sample Revised:
              {getOldProjectData[0]?.project_samples.length > 0 ? (
                <Tooltip text={"View Multiple CPI"} className={"w-40"}>
                  <span
                    className="text-xl no-underline"
                    onClick={() => handleViewCpi("new")}
                  >
                    {totalNewProjectSampleCount}
                    <span className="cursor-pointer text-xs ml-2 text-blue-700 underline">
                      View Details
                    </span>
                  </span>
                </Tooltip>
              ) : (
                getOldProjectData[0]?.sample
              )}
            </div>
            <div className="border-b-black border">
              Date Required:
              {notificationProjectList[0]?.pending_changes?.tentative_end_date?.split(
                "T"
              )[0] || getOldProjectData[0]?.tentative_end_date?.split("T")[0]}
            </div>
            <div className="">
              Reason:{" "}
              {combinedRemarks ||
                notificationProjectList[0]?.reason_for_adjustment}
            </div>
            <div className="flex">
              <Button
                className=" bg-green-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold"
                onClick={() =>
                  handleAccept(notificationProjectList[0]?.project?.id)
                }
                name="Accept"
              />
              <Button
                className=" bg-red-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold"
                onClick={() =>
                  handleReject(notificationProjectList[0]?.project?.id)
                }
                name="Reject"
              />
            </div>
          </div>
        </div>
      </div>
      {isMultipleCpiSample && (
        <Popup>
          <ViewMultipleSampleCpi viewRecord={multipleView} />
        </Popup>
      )}
      <Button
        className="absolute top-0 right-2 border rounded-md p-2 bg-red-300 hover:bg-red-500 text-whilte"
        onClick={() => {
          setIsViewNotification(false);
        }}
        name={"X"}
      />
    </div>
  );
};

export default OpenNotification;
