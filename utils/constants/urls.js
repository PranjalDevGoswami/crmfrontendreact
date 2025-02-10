// export const BASEURL = "https://crmapi.unimrkt.com"; //live server
export const BASEURL = "https://uaterpapi.unimrkt.com"; //uat Server
// export const BASEURL = "http://127.0.0.1:8000";
// export const BASEURL = "http://65.0.180.82"; // new Uat Server //temp
export const DEPARTMENTSAPIS = BASEURL + "/api/user/department/";
export const CLIENTDATAAPIS = BASEURL + "/api/project/clients/";
export const UPDATETLASSIGNMENT = BASEURL + "/api/project/project-assignments/";
export const LOGINPOSTAPIS = BASEURL + "/api/user/login/";
export const POSTMANDAYSDATA =
  BASEURL + "/api/operation/projects/add/man-days/";
export const USERLIST = BASEURL + "/api/user/api/users-list/";
export const PROJECTTYPES = BASEURL + "/api/project/project_type/";
export const MANDAYSPERDAY =
  BASEURL + "/api/operation/projects/man-days/perday/";
export const REGISTER = BASEURL + "/api/user/register/";
export const REFRESH_TOKEN = BASEURL + "/token/refresh/";
export const PROJECT_MANAGER = BASEURL + "/api/project/userrole/managers/";
export const CHANGE_STATUS = BASEURL + "/api/project/update-project-status/";
export const RESETPASSWORD = BASEURL + "/api/user/send_reset_password_email/";
export const CONFIRM_PASSWORD = BASEURL + "/api/user/confirm-password/";
export const CHANGE_PASSWORD = BASEURL + "/api/user/change-password/";
export const UPDATE_PROFILE = BASEURL + "/api/user/update-profile/";
export const PROJECT_HOD = BASEURL + "/api/project/hods/";
export const PROJECT_TL = BASEURL + "/api/project/project-teamleads/";
export const USERSTATUS = BASEURL + "/api/user/user/status/";
export const UPDATEDPROJECTLIST = BASEURL + "/api/project/updated-data/";
export const PROJECTUPDATEWITHPROJECTCODE =
  BASEURL + "/api/project/update/with-projectid/";
export const MANDAYSLIST = BASEURL + "/api/operation/projects/man-days/list";
export const USERROLE = BASEURL + "/api/project/userrole/";
export const ALLWORKANDMENDAYS =
  BASEURL + "/api/operation/project/perday/list/";
export const SOWLIST = (id) => {
  if (!id) {
    throw new Error("ID is required to get the SOW list URL");
  }
  return `${BASEURL}/api/project/${id}/get-update/sow/`;
};
export const EDITPROJECTREQUEST = (id) => {
  if (!id) {
    throw new Error("ID is required to get the update sample edit");
  }
  return `${BASEURL}/api/project/project-samples/edit/${id}/`;
};
export const ACCEPTPROJECTREQUEST = (id) => {
  if (!id) {
    throw new Error("ID is required to get the update sample edit");
  }
  return `${BASEURL}/api/project/project-samples/${id}/approve/`;
};
export const REJECTPROJECTREQUEST = (id) => {
  if (!id) {
    throw new Error("ID is required to get the reject sample request");
  }
  return `${BASEURL}/api/project/reject-samples/${id}/`;
};
export const PROJECTSOWUPDATE = (id) => {
  if (!id) {
    throw new Error("ID is required to get the update sow");
  }
  return `${BASEURL}/api/project/${id}/get-update/sow/`;
};
export const NOTIFICATIONCOUNT = BASEURL + "/api/project/notifications/count/";
export const RAISECBR = (id) => {
  if (!id) {
    throw new Error("ID is required to raised CBR!!");
  }
  return `${BASEURL}/api/finance/projects/${id}/cbr-raised/`;
};
export const PROJECTDATAAPIS = (page_number, page_size, activeTabValue) => {
  if (!page_number) {
    throw new Error("Page Number is required to get the Project Data");
  }
  return `${BASEURL}/api/project/projects/?page=${page_number}&page_size=${page_size}&status=${activeTabValue}`;
};
export const POSTPROJECTDATAAPIS = BASEURL + "/api/project/projects/";

export const GETCBR = (id) => {
  if (!id) {
    throw new Error("ID is required to raised CBR!!");
  }
  return `${BASEURL}/api/finance/project-cbr-data/${id}/`;
};
export const DASHBOARDPROJECT = BASEURL + "/api/project/dashbord-projects/";
export const GETCOMPANYDETAILS = (id) => {
  if (!id) {
    throw new Error("ID is required to get company details!!");
  }
  return `${BASEURL}/api/user/entity/${id}`;
};
export const GETALLCOMPANYNAME =  BASEURL + "/api/user/entities";
export const ADVANCEBILLING = BASEURL + 'finance/advance-billing'