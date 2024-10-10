import { useContext, useEffect, useState } from "react";
import { NotifiactionContext } from "../ContextApi/NotificationContext";
import Button from "../components/Button";
import { putWithAuth } from "../provider/helper/axios";
import { PROJECTUPDATEWITHPROJECTCODE } from "../../utils/constants/urls";
import SweetAlert from "../components/SweetAlert";
import { useSelector } from "react-redux";

const OpenNotification = ({ notification_btn_ref }) => {
  const { notificationProjectList, setIsViewNotification } =
    useContext(NotifiactionContext);
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const token = localStorage.getItem("token");

  const [dataToUpdate, setDataToUpdate] = useState({
    id: "",
    tentative_end_date: "",
    sample: "",
    reason_for_adjustment: "",
    send_email_manager: "",
  });
  const [projectData, setProjectData] = useState([]);
  const project = useSelector((store) => store.projectData.projects);
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setProjectData(project);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, [token]);

  console.log(notificationProjectList);

  const handleAccept = async (id) => {
    const selectedProject = notificationProjectList.find(
      (item) => item.id == id
    );
    if (selectedProject) {
      const updatedData = {
        id: selectedProject?.project_id,
        tentative_end_date: selectedProject?.tentative_end_date,
        sample: selectedProject?.sample,
        reason_for_adjustment: selectedProject?.reason_for_adjustment,
        send_email_manager: false,
      };
      setDataToUpdate(updatedData);
      if (Object.keys(updatedData).length > 0) {
        const response = await putWithAuth(
          PROJECTUPDATEWITHPROJECTCODE,
          updatedData
        );
        if (response?.status == true) {
          SweetAlert({
            title: "Success",
            text: response?.data?.message,
            icon: "success",
          });
          setIsViewNotification(false);
        } else {
          SweetAlert({
            title: "Error",
            text: "Somethings went wrong",
            icon: "error",
          });
        }
      }
    }
  };

  const getOldProjectData = projectData?.filter((item) => {
    return item?.id == notificationProjectList?.map((item) => item?.project_id);
  });

  const handleReject = async (projectCode) => {
    setIsViewNotification(false);
  };

  return (
    <div className="z-40" ref={notification_btn_ref}>
      <div
        className={`${
          darkMode
            ? "bg-black text-white border-b-white"
            : "bg-gray-50 text-black border-b-black"
        } mb-2 border cursor-pointer p-4 rounded-md `}
      >
        <div className="flex justify-between">
          <div className="w-1/2 p-4">
            <div className="border">
              <h3 className="border-b-black border font-bold text-xl">
                Old Project Data
              </h3>
              <div className="border-b-black border">
                Project Code:
                {getOldProjectData[0]?.project_code?.toUpperCase()}
              </div>
              <div className="border-b-black border">
                Previous Sample Size: {getOldProjectData[0]?.sample}
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
            <div className="border-b-black border">
              Sample Revised: {notificationProjectList[0]?.sample}
            </div>
            <div className="border-b-black border">
              Date Required:
              {notificationProjectList[0]?.tentative_end_date?.split("T")[0]}
            </div>
            <div className="">
              Reason: {notificationProjectList[0]?.reason_for_adjustment}
            </div>
            <div className="flex">
              <Button
                className=" bg-green-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold"
                onClick={() => handleAccept(notificationProjectList[0]?.id)}
                name="Accept"
              />
              <Button
                className=" bg-red-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold"
                onClick={() => handleReject(notificationProjectList[0]?.id)}
                name="Reject"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenNotification;
