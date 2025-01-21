import { USERLIST } from "../constants/urls";
// import {
//   isFinanceDept,
//   isOperationDept,
//   isSalesDept,
// } from "../../src/config/Departments";
// import { isDirectorRole, isSuperUserRole } from "../../src/config/Role";

const role = localStorage.getItem("role");

export const useRedirectUser = async (navigate) => {  
  try {
    const userList = await fetch(USERLIST);
    const userListJson = await userList.json();
    let email = localStorage.getItem("user");
    const userData = userListJson.users;
    function getUserByEmail(email) {
      return userData.filter((user) => user.email === email);
    }

    const userDetails = getUserByEmail(email);

    if (userDetails.length > 0) {
      const department = userDetails[0].user_department?.id;

      localStorage.setItem("department", department);
      if (role === "Director" || role === "superUser") {
        navigate("/report");
      } else if (department == 1) {
        navigate("/sales-dashboard");
      } else if (department == 2) {
        navigate("/operation-dashboard");
      } else if (department == 3) {
        navigate("/finance-dashboard");
      } else if (userDetails[0]?.email === "admin@unimrkt.com") {
        navigate("/Admin-dashboard");
      } else {
        navigate("/default-dashboard");
      }
    }
  } catch (error) {
    console.error("Error redirecting user:", error);
  }
};
