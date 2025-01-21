export const DateValidationForWeekend = (currentDateValue, DateNeedToVerify) => {
    const selectedDate = new Date(currentDateValue);
    const tentativeStartDate = new Date(DateNeedToVerify);
    let errorMsg = "";
  
    if (selectedDate <= tentativeStartDate) {
      errorMsg = "End date must be after the start date.";
    } 
    
    if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
      errorMsg = "Weekend dates are not allowed.";
    }
  
    // Return both values as an object or array for better clarity
    return { errorMsg, selectedDate };
  };
  