import { useSelector, useDispatch } from "react-redux";
import Button from "../Atom/Button";
import { patchWithAuth, postWithAuth } from "../provider/helper/axios";
import {
  ACCEPT_PROJECT_REQUEST,
  REJECT_PROJECT_REQUEST,
} from "../../utils/constants/urls";
import SweetAlert from "../components/SweetAlert";
import Tooltip from "../components/Tooltip";
import ViewMultipleSampleCpi from "../project/view/ViewMultipleSampleCpi";
import Popup from "../Atom/Popup";
import {
  addNotification,
  toggleViewNotification,
} from "../../utils/slices/notificationSlice";
import { notificationCount } from "../../utils/apis/notificationCount";
import { ProjectData } from "../../utils/apis/projectData";
import { setProjects } from "../../utils/slices/projectSlice";
import {
  addMultipleSample,
  toggleViewMultipleCpiSample,
} from "../../utils/slices/addMutipleSampleCpiSlice";

const OpenNotification = ({ notification_btn_ref }) => {
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const { isViewMultipleSampleCpiRecords } = useSelector(
    (store) => store.addMultipleSampleCpi
  );
  const { notificationList } = useSelector((store) => store.notification);
  const { page_number, page_size, activeTab, projectsWithoutAnyFilter } =
  useSelector((store) => store.projectData);
  const dispatch = useDispatch();

  const handleAccept = async (id) => {
    const response = await postWithAuth(ACCEPT_PROJECT_REQUEST(id), {
      is_approved: "True",
    });
    if (response?.status == true) {
      SweetAlert({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
      });
      dispatch(toggleViewNotification());
      const notificationCountfreshData = await notificationCount();
      dispatch(addNotification(notificationCountfreshData));
      const projectData = await ProjectData(page_number, page_size);
      dispatch(setProjects({ data: projectData?.results, reset: true }));
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
    let data;
    if (dataType === "old") {
      data = getOldProjectData;
    } else {
      data = {
        id: 2243,
        project_samples: notificationList.map((item) => item.pending_changes),
      };
    }
    dispatch(addMultipleSample(data));
    dispatch(toggleViewMultipleCpiSample(true));
  };

  const getOldProjectData = projectsWithoutAnyFilter?.find((item) =>
    notificationList?.some(
      (notificationItem) => notificationItem?.project?.id === item?.id
    )
  );

  const totalNewProjectSampleCount = notificationList?.reduce((acc, item) => {
    if (Array.isArray(item?.pending_changes)) {
      return (acc = acc + Number(item?.pending_changes?.sample)) || 0;
    }
    return acc + Number(item?.pending_changes?.sample || 0);
  }, 0);

  const handleReject = async (id) => {
    const response = await patchWithAuth(REJECT_PROJECT_REQUEST(id), {
      is_rejected: "False",
    });
    if (response?.status == true) {
      SweetAlert({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
      });
      dispatch(toggleViewNotification());
      const notificationCountfreshData = await notificationCount();
      dispatch(addNotification(notificationCountfreshData));
      const projectData = await ProjectData(page_number, page_size);
      dispatch(setProjects({ data: projectData?.results, reset: true }));
    }
  };
  const combinedRemarks = notificationList
    ?.map((data) => data?.pending_changes?.remark)
    .join(", ");

  return (
    <div className="" ref={notification_btn_ref}>
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
            <span className="font-bold">{getOldProjectData?.name}</span>
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
                {getOldProjectData?.project_code?.toUpperCase()}
              </div>
              <div className="border-b-black border flex text-center justify-center items-center">
                Previous Sample Size:
                {getOldProjectData?.project_samples.length > 1 ? (
                  <Tooltip text={"View Multiple CPI"} className={"w-40"}>
                    <span
                      className="text-xl no-underline"
                      onClick={() => handleViewCpi("old")}
                    >
                      {getOldProjectData?.sample}
                      <span className="cursor-pointer text-xs ml-2 text-blue-700 underline">
                        View Details
                      </span>
                    </span>
                  </Tooltip>
                ) : (
                  getOldProjectData?.sample
                )}
              </div>
              <div className="border-b-black border">
                Previous Date Given:
                {getOldProjectData?.tentative_end_date?.split("T")[0]}
              </div>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <h3 className="border-b-black border font-bold text-xl">
              New Required Project Data
            </h3>
            <div className="border-b-black border">
              Project Code:
              {getOldProjectData?.project_code?.toUpperCase()}
            </div>
            <div className="border-b-black border flex justify-center items-center">
              Sample Revised:
              {notificationList.length > 1 ? (
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
                totalNewProjectSampleCount
              )}
            </div>
            <div className="border-b-black border">
              Date Required:
              {notificationList[0]?.pending_changes?.tentative_end_date?.split(
                "T"
              )[0] || getOldProjectData?.tentative_end_date?.split("T")[0]}
            </div>
            <div className="">
              Reason:{" "}
              {combinedRemarks || notificationList[0]?.reason_for_adjustment}
            </div>
            <div className="flex">
              <Button
                className=" bg-green-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold"
                onClick={() => handleAccept(notificationList[0]?.project?.id)}
                name="Accept"
              />
              <Button
                className=" bg-red-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold"
                onClick={() => handleReject(notificationList[0]?.project?.id)}
                name="Reject"
              />
            </div>
          </div>
        </div>
      </div>
      {isViewMultipleSampleCpiRecords && (
        <Popup>
          <ViewMultipleSampleCpi />
        </Popup>
      )}
      <Button
        className="absolute top-0 right-2 border rounded-md p-2 bg-red-300 hover:bg-red-500 text-whilte"
        onClick={async () => {
          const response = await notificationCount();
          if (response) {
            dispatch(addNotification(response));
          }
          dispatch(toggleViewNotification());
        }}
        name={"X"}
      />
    </div>
  );
};

export default OpenNotification;
