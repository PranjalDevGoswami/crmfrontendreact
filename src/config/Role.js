export const role = localStorage.getItem("role");
export const isSuperUserRole = role === "superUser";
export const isDirectorRole = role === "Director";
export const isHodRole = role === "HOD";
export const isSrManagerRole = role === "Sr.Manager";
export const isManagerRole = role === "Manager";
export const isAssManagerRole = role === "Ass.Manager";
export const isTeamLeadRole = role === "Team Lead";
export const allManagerRolesRole = [
  "Sr.Manager",
  "Ass.Manager",
  "Manager",
].includes(role);

export const isSuperUser = "superUser";
export const isDirector = "Director";
export const isHod = "HOD";
export const isSrManager = "Sr.Manager";
export const isManager = "Manager";
export const isAssManager = "Ass.Manager";
export const isTeamLead = "Team Lead";
export const allManagerRoles = ["Sr.Manager", "Ass.Manager", "Manager"];

export const department = localStorage.getItem("department");
export const isSuperUserDepartment = [1, 2, 3, 4];
export const userRole = localStorage.getItem("userrole");
export const userName = localStorage.getItem("username");
export const Token = localStorage.getItem("token");
