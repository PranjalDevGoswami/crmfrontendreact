import React, { useEffect } from "react";
import { PROJECTTYPES } from "../../../../utils/urls.js";
import { getWithAuth } from "../../../provider/helper/axios.js";

export const ProjectTypeList = async () => {
  return await getWithAuth(PROJECTTYPES);
};
