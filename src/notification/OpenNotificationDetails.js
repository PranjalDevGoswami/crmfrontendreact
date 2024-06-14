import { useContext, useState } from "react";
import { NotifiactionContext } from "../ContextApi/NotificationContext";
import Button from "../components/Button";
import { putWithAuth } from "../provider/helper/axios";
import { UPDATEPROJECTDATAAPIS } from "../../utils/urls";

const OpenNotification = ({ notification_btn_ref }) => {
  const { notificationProjectList, setIsViewNotification } =
    useContext(NotifiactionContext);
  const [dataToUpdate, setDataToUpdate] = useState({
    project_code: "",
    tentative_end_date: "",
    sample: "",
    reason_for_adjustment: "",
  });

  const handleAccept = async (projectCode) => {
    const selectedProject = notificationProjectList.find(
      (item) => item.project_code === projectCode
    );

    if (selectedProject) {
      const updatedData = {
        project_code: selectedProject.project_code,
        tentative_end_date: selectedProject.tentative_end_date,
        sample: selectedProject.sample,
        reason_for_adjustment: selectedProject.reason_for_adjustment,
      };
      setDataToUpdate(updatedData);
      if (Object.keys(updatedData).length > 0) {
        const response = await putWithAuth(UPDATEPROJECTDATAAPIS, updatedData);
        if (response?.status == true) {
          alert(response?.data?.message);
          setIsViewNotification(false);
        } else {
          alert("please fill data");
        }
      }
    }
  };
  const handleReject = (projectCode) => {
    // console.log(dataToUpdate);
    setIsViewNotification(false);
  };
  return (
    <div className="" ref={notification_btn_ref}>
      {notificationProjectList.map((item, ind) => (
        <div
          key={ind}
          className="border-b border-black mb-2 border bg-gray-200 cursor-pointer p-4 rounded-md"
        >
          <div className="border-b-black border">
            Project Code: {item.project_code}
          </div>
          <div className="border-b-black border">
            Sample Revised: {item.sample}
          </div>
          <div className="border-b-black border">
            Date Required: {item.tentative_end_date?.split("T")[0]}
          </div>
          <div className="">Reason: {item.reason_for_adjustment}</div>
          <Button
            className=" bg-green-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold"
            onClick={() => handleAccept(item.project_code)}
            name="Accept"
          />
          <Button
            onClick={() => handleReject(item.project_code)}
            name="Reject"
          />
        </div>
      ))}
    </div>
  );
};

export default OpenNotification;
