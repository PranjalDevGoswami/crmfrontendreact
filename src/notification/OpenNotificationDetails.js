import { useContext, useState } from "react";
import { NotifiactionContext } from "../ContextApi/NotificationContext";
import Button from "../components/Button";
import { putWithAuth } from "../provider/helper/axios";
import { PROJECTUPDATEWITHPROJECTCODE } from "../../utils/urls";

const OpenNotification = ({ notification_btn_ref }) => {
  const { notificationProjectList, setIsViewNotification } =
    useContext(NotifiactionContext);
  const [dataToUpdate, setDataToUpdate] = useState({
    project_code: "",
    tentative_end_date: "",
    sample: "",
    reason_for_adjustment: "",
    send_email_manager: "",
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
        send_email_manager: false,
      };
      setDataToUpdate(updatedData);
      if (Object.keys(updatedData).length > 0) {
        const response = await putWithAuth(
          PROJECTUPDATEWITHPROJECTCODE,
          updatedData
        );
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
      {notificationProjectList?.map((item, ind) => (
        <div
          key={ind}
          className="border-b border-black mb-2 border bg-gray-200 cursor-pointer p-4 rounded-md"
        >
          {/* <div className="flex justify-between">
            <div className="w-1/2 p-4">
              <div>
                <h3 className="border-b-black border font-bold text-xl">
                  Old Project Data
                </h3>
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
              </div>
            </div> */}
          <div className=" p-4">
            <h3 className="border-b-black border font-bold text-xl">
              New Required Project Data
            </h3>
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
            <div className="flex">
              <Button
                className=" bg-green-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold"
                onClick={() => handleAccept(item.project_code)}
                name="Accept"
              />
              <Button
                className=" bg-red-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold"
                onClick={() => handleReject(item.project_code)}
                name="Reject"
              />
            </div>
          </div>
        </div>
        // </div>
      ))}
    </div>
  );
};

export default OpenNotification;
