import { createContext, useState } from "react";

export const FormDataContext = createContext();

export const FormDataValueProvider = ({ children }) => {
  const user_role = localStorage.getItem("userrole");
  const [advancePAyment, setAdvancePAyment] = useState(false);
  const [isOtherFee, setIsOtherFee] = useState(false);
  const [otherCost, setOtherCost] = useState(false);
  const [translationCost, setTranslationCost] = useState(false);
  const [projectManagerData, setProjectManagerData] = useState([
    "demo manager1",
    "demo manager2",
  ]);
  const [managerList, setManagerList] = useState();

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
    created_by: user_role,
    project_manager: "",
    operation_select: true,
    finance_select: advancePAyment,
    upload_document: "",
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
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
