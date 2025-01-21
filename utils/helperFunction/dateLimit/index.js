export const getMinDate = () => {
    let currentDate = new Date();
    let daysBack = 0;
    while (daysBack < 2) {
      if (currentDate.getDay() === 1) {
        currentDate.setDate(currentDate.getDate() - 3);
      } else if (currentDate.getDay() === 0) {
        currentDate.setDate(currentDate.getDate() - 2);
      } else {
        currentDate.setDate(currentDate.getDate() - 1);
      }
      daysBack++;
    }
    return currentDate.toISOString().split("T")[0];
  };