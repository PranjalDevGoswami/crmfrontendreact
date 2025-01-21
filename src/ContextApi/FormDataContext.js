import { createContext, useState } from "react";
// import { userRole } from "../config/Role";

export const FormDataContext = createContext();

export const FormDataValueProvider = ({ children }) => {
  const userRole = localStorage.getItem("userrole");

  const [advancePAyment, setAdvancePAyment] = useState(false);
  const [isOtherFee, setIsOtherFee] = useState(false);
  const [otherCost, setOtherCost] = useState(false);
  const [translationCost, setTranslationCost] = useState(false);
  const [projectManagerData, setProjectManagerData] = useState([
    "demo manager1",
    "demo manager2",
  ]);
  const [managerList, setManagerList] = useState();
  const [projectAdded, SetProjectAdded] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    project_type: "",
    clients: "",
    sample: "",
    cpi: "",
    set_up_fee: "",
    tentative_start_date: "",
    tentative_end_date: "",
    other_cost: "",
    transaction_fee: "",
    created_by: userRole,
    project_manager: "",
    operation_select: true,
    finance_select: advancePAyment,
    upload_document: [],
    project_samples: [],
    is_multiple_sample_cpi: null,
  });

  return (
    <FormDataContext.Provider
      value={{
        formData,
        setFormData,
        advancePAyment,
        setAdvancePAyment,
        isOtherFee,
        setIsOtherFee,
        otherCost,
        setOtherCost,
        translationCost,
        setTranslationCost,
        projectManagerData,
        setProjectManagerData,
        managerList,
        setManagerList,
        projectAdded,
        SetProjectAdded,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
