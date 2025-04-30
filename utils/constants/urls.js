// export const BASEURL = "https://crmapi.unimrkt.com"; //live server
export const BASEURL = "https://uaterpapi.unimrkt.com"; //uat Server
// export const BASEURL = "http://127.0.0.1:8000";
// export const BASEURL = "http://65.0.180.82"; // new Uat Server //temp
// export const BASEURL = "https://erp.unimrkt-bharat.com" // new unimrkt india

export const VERSION_NUMBER = "V-1.0.1"
export const DEPARTMENTS_APIS = BASEURL + "/api/user/department/";
export const CLIENT_DATA_APIS = BASEURL + "/api/project/clients/";
export const UPDATE_TL_ASSIGNMENT =
  BASEURL + "/api/project/project-assignments/";
export const LOGIN_APIS = BASEURL + "/api/user/login/";
export const POST_MAN_DAYS_DATA =
  BASEURL + "/api/operation/projects/add/man-days/";
export const USER_LIST = BASEURL + "/api/user/api/users-list/";
export const PROJECT_TYPES = BASEURL + "/api/project/project_type/";
export const MANDAYS_PER_DAY =
  BASEURL + "/api/operation/projects/man-days/perday/";
export const REGISTER = BASEURL + "/api/user/register/";
export const REFRESH_TOKEN = BASEURL + "/token/refresh/";
export const PROJECT_MANAGER = BASEURL + "/api/project/userrole/managers/";
export const CHANGE_STATUS = BASEURL + "/api/project/update-project-status/";
export const RESET_PASSWORD = BASEURL + "/api/user/send_reset_password_email/";
export const CONFIRM_PASSWORD = BASEURL + "/api/user/confirm-password/";
export const CHANGE_PASSWORD = BASEURL + "/api/user/change-password/";
export const UPDATE_PROFILE = BASEURL + "/api/user/update-profile/";
export const PROJECT_HOD = BASEURL + "/api/project/hods/";
export const PROJECT_TL = BASEURL + "/api/project/project-teamleads/";
export const USER_STATUS = BASEURL + "/api/user/user/status/";
export const UPDATED_PROJECT_LIST = BASEURL + "/api/project/updated-data/";
export const PROJECT_UPDATE_WITH_PROJECT_CODE =
  BASEURL + "/api/project/update/with-projectid/";
export const MANDAYS_LIST = BASEURL + "/api/operation/projects/man-days/list";
export const USER_ROLE = BASEURL + "/api/project/userrole/";
export const ALL_WORK_AND_MEN_DAYS =
  BASEURL + "/api/operation/project/perday/list/";
export const SOW_LIST = (id) => {
  if (!id) {
    throw new Error("ID is required to get the SOW list URL");
  }
  return `${BASEURL}/api/project/${id}/get-update/sow/`;
};
export const EDIT_PROJECT_REQUEST = (id) => {
  if (!id) {
    throw new Error("ID is required to get the update sample edit");
  }
  return `${BASEURL}/api/project/project-samples/edit/${id}/`;
};
export const ACCEPT_PROJECT_REQUEST = (id) => {
  if (!id) {
    throw new Error("ID is required to get the update sample edit");
  }
  return `${BASEURL}/api/project/project-samples/${id}/approve/`;
};
export const REJECT_PROJECT_REQUEST = (id) => {
  if (!id) {
    throw new Error("ID is required to get the reject sample request");
  }
  return `${BASEURL}/api/project/reject-samples/${id}/`;
};
export const PROJECT_SOW_UPDATE = (id) => {
  if (!id) {
    throw new Error("ID is required to get the update sow");
  }
  return `${BASEURL}/api/project/${id}/get-update/sow/`;
};

export const PROJECT_DATA_APIS = (page_number, page_size, activeTabs) => {
  if (!page_number) {
    throw new Error("Page Number is required to get the Project Data");
  }
  return `${BASEURL}/api/project/projects/?page=${page_number}&page_size=${page_size}`;
};
export const DASHBOARD_PROJECT = BASEURL + "/api/project/dashbord-projects/";
export const PROJECT_ENTRY_APIS = BASEURL + "/api/project/projects/";
export const NOTIFICATION_COUNT = BASEURL + "/api/project/notifications/count/";
export const CREATE_ADVANCE_PAYMENT = BASEURL + "/api/finance/abr/create/";

export const GET_COMPANY_DETAILS = (id) => {
  if (!id) {
    throw new Error("ID is required to get company details!!");
  }
  return `${BASEURL}/api/user/entity/${id}`;
};
export const GET_ALL_COMPANY_NAME = BASEURL + "/api/user/entities";
export const RAISE_CBR = BASEURL + "/api/finance/cbr-create/";
export const RAISE_VPR = BASEURL + "/api/finance/vpr-create/";
export const ABR_PROJECT_LIST = BASEURL + "/api/finance/abr/project-list/";
export const CBR_PROJECT_LIST = BASEURL + "/api/finance/cbr/project-list/";
export const VIEW_CBR_DETAILS = (id) => {
  return `${BASEURL}/api/finance/project-cbr-data/${id}`;
};
export const GET_CBR_SINGLE_PROJECT = (id) => {
  if (!id) {
    throw new Error("ID is required to raised CBR!!");
  }
  return `${BASEURL}/api/finance/project-cbr-data/${id}/`;
};
export const GET_ABR_SINGLE_PROJECT = (id) => {
  if (!id) {
    throw new Error("ID is required to raised CBR!!");
  }
  return `${BASEURL}/api/finance/abr/${id}/`;
};
export const GENERATE_INVOICE = BASEURL + "/api/finance/generate-invoice/";
