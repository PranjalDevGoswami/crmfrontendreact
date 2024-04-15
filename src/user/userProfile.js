import { jwtDecode } from "jwt-decode";
export const userDetails = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { role, username, user_id } = decoded;
  localStorage.setItem("role", role);

  return { role, username, user_id };
};
