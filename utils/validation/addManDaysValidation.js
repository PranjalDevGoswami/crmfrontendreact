import SweetAlert from "../../src/components/SweetAlert";

export const addManDaysValidation = (mandaysData) => {
  const validateFields = () => {
    for (const item of mandaysData) {
      if (!item.update_date) {
        SweetAlert({
          title: "Error",
          text: "Update date is required",
          icon: "error",
        });
        return false;
      }
      if (!item.total_man_days) {
        SweetAlert({
          title: "Error",
          text: "Total man days is required",
          icon: "error",
        });
        return false;
      } else if (item.total_man_days == 0) {
        SweetAlert({
          title: "Error",
          text: "Total man days can not be 0",
          icon: "error",
        });
        return false;
      }
      if (!item.total_achievement) {
        SweetAlert({
          title: "Error",
          text: "Total achievement is required",
          icon: "error",
        });
        return false;
      } 
      // else if (item.total_achievement == 0) {
      //   SweetAlert({
      //     title: "Error",
      //     text: "Total Achievement can not be 0",
      //     icon: "error",
      //   });
      //   return false;
      // }
      if (!item.status || item.status === "--Select Status--") {
        SweetAlert({
          title: "Error",
          text: "Status is required",
          icon: "error",
        });
        return false;
      }
    }
    return true;
  };
  return validateFields;
};
