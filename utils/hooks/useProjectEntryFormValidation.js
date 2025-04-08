import { useSelector } from "react-redux";


 export const useProjectEntryFormValidation = (formData) => {
    const isMultipleSampleCheckbox = useSelector(
        (store) => store.addMultipleSampleCpi.isMultipleSampleCheckbox
      );
      const isCpiValid = isMultipleSampleCheckbox
    ? formData.cpi === "" || formData.cpi == 0 || formData.cpi === null
    : formData.cpi !== "" && formData.cpi > 0;

    return (
      formData.name !== "" &&
      formData.project_type && formData.project_type !== "" &&
      formData.clients && formData.clients !== "" &&
      formData.sample > 0 &&
      isCpiValid &&
      formData.set_up_fee !== "" &&
      formData.tentative_start_date !== "" &&
      formData.tentative_end_date !== "" &&
      formData.project_samples !== ""
    );
  };
