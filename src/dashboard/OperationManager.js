import React, { useState } from "react";
import ProjectDataTable from "../project/ProjectDataTable.js";

const OperationManager = () => {
  const [operationDepartment] = useState(true);

  return <ProjectDataTable PersonDepartment={operationDepartment} />;
};

export default OperationManager;
