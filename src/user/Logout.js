import React from "react";
import Login from "./Login";

const Logout = () => {
  localStorage.clear();
  return (
    <div>
      <Login />
    </div>
  );
};

export default Logout;
