// // import { useState } from "react";
// // import dayjs from "dayjs";
// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// // import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// // import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
// // import Button from "./Button";
// // const DateRangeFilter = ({ dateRange, setDateRange }) => {
// //   const [openDateRange, setOpenDateRange] = useState(false);
// //   // const ref1 = useRef();
// //   // const ref = useRef();

// //   // const handleDate = (e) => {
// //   //   const { name, value } = e.target;
// //   //   setDateRange((prev) => ({ ...prev, [name]: value }));
// //   // };
// //   const shortcutsItems = [
// //     {
// //       label: "This Week",
// //       getValue: () => {
// //         const today = dayjs();
// //         return [today.startOf("week"), today.endOf("week")];
// //       },
// //     },
// //     {
// //       label: "Last Week",
// //       getValue: () => {
// //         const today = dayjs();
// //         const prevWeek = today.subtract(7, "day");
// //         return [prevWeek.startOf("week"), prevWeek.endOf("week")];
// //       },
// //     },
// //     {
// //       label: "Last 7 Days",
// //       getValue: () => {
// //         const today = dayjs();
// //         return [today.subtract(7, "day"), today];
// //       },
// //     },
// //     {
// //       label: "Current Month",
// //       getValue: () => {
// //         const today = dayjs();
// //         return [today.startOf("month"), today.endOf("month")];
// //       },
// //     },
// //     {
// //       label: "Prev Month",
// //       getValue: () => {
// //         const today = dayjs();
// //         const startOfPreviousMonth = today.startOf("month").add(-1, "day");
// //         return [
// //           startOfPreviousMonth.startOf("month"),
// //           startOfPreviousMonth.endOf("month"),
// //         ];
// //       },
// //     },
// //     { label: "Reset", getValue: () => [null, null] },
// //   ];
// //   return (
// //     // <div className="w-full flex">
// //     //   <input
// //     //     ref={ref}
// //     //     type={"text"}
// //     //     name={"startDate"}
// //     //     className={
// //     //       " rounded-full p-2 m-1 border border-black bg-transparent w-28"
// //     //     }
// //     //     onChange={handleDate}
// //     //     placeholder={"Start Date"}
// //     //     value={dateRange.startDate}
// //     //     onFocus={() => (ref.current.type = "date")}
// //     //     onBlur={() => (ref.current.type = "text")}
// //     //   />
// //     //   <input
// //     //     ref={ref1}
// //     //     type={"text"}
// //     //     name={"endDate"}
// //     //     className={"p-2 m-1 border border-black rounded-full w-28"}
// //     //     onChange={handleDate}
// //     //     placeholder={"End Date"}
// //     //     value={dateRange.endDate}
// //     //     onFocus={() => (ref1.current.type = "date")}
// //     //     onBlur={() => (ref1.current.type = "text")}
// //     //   />
// //     // </div>
// //     <div className="relative w-full">
// //       <Button
// //         name={"Select Date Range"}
// //         className={"bg-transparent rounded-full border-black border p-1 m-1"}
// //         onClick={() => setOpenDateRange(!openDateRange)}
// //       />
// //       {openDateRange && (
// //         <div className="absolute top-10 left-0 w-[50rem] overflow-visible bg-white border z-50">
// //           <div className="w-full">
// //             <LocalizationProvider dateAdapter={AdapterDayjs}>
// //               <StaticDateRangePicker
// //                 slotProps={{
// //                   shortcuts: {
// //                     items: shortcutsItems,
// //                   },
// //                   actionBar: { actions: [] },
// //                 }}
// //                 calendars={2}
// //               />
// //             </LocalizationProvider>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DateRangeFilter;

// import { useState } from "react";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
// import Button from "./Button";

// const DateRangeFilter = ({ dateRange, setDateRange }) => {
//   const [openDateRange, setOpenDateRange] = useState(false);

//   const shortcutsItems = [
//     {
//       label: "This Week",
//       getValue: () => {
//         const today = dayjs();
//         return [today.startOf("week"), today.endOf("week")];
//       },
//     },
//     {
//       label: "Last Week",
//       getValue: () => {
//         const today = dayjs();
//         const prevWeek = today.subtract(7, "day");
//         return [prevWeek.startOf("week"), prevWeek.endOf("week")];
//       },
//     },
//     {
//       label: "Last 7 Days",
//       getValue: () => {
//         const today = dayjs();
//         return [today.subtract(7, "day"), today];
//       },
//     },
//     {
//       label: "Current Month",
//       getValue: () => {
//         const today = dayjs();
//         return [today.startOf("month"), today.endOf("month")];
//       },
//     },
//     {
//       label: "Prev Month",
//       getValue: () => {
//         const today = dayjs();
//         const startOfPreviousMonth = today.startOf("month").add(-1, "day");
//         return [
//           startOfPreviousMonth.startOf("month"),
//           startOfPreviousMonth.endOf("month"),
//         ];
//       },
//     },
//     { label: "Reset", getValue: () => [null, null] },
//   ];

//   return (
//     <div className="relative w-10/12">
//       <Button
//         name={"Select Date Range"}
//         className={
//           "bg-transparent rounded-full border-black border p-[6px] m-1"
//         }
//         onClick={() => setOpenDateRange(!openDateRange)}
//       />
//       {openDateRange && (
//         <div className="absolute top-11 left-0 w-[47rem] overflow-visible bg-white border z-50">
//           <div className="w-full">
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <StaticDateRangePicker
//                 // value={[dateRange.startDate, dateRange.endDate]}
//                 onChange={(newValue) => {
//                   setDateRange({
//                     startDate: newValue[0],
//                     endDate: newValue[1],
//                   });
//                 }}
//                 slotProps={{
//                   shortcuts: {
//                     items: shortcutsItems,
//                   },
//                   actionBar: { actions: [] },
//                 }}
//                 calendars={2}
//               />
//             </LocalizationProvider>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateRangeFilter;

// import React, { useState } from "react";
// import moment from "moment";
// import Button from "./Button";

// const Heading = ({
//   date,
//   changeMonth,
//   changeYear,
//   resetDate,
//   toggleMonthView,
//   toggleYearView,
// }) => (
//   <nav className="calendar--nav">
//     <a onClick={() => changeMonth(date.month() - 1)}>&#8249;</a>
//     <h1>
//       <span onClick={toggleMonthView} className="mr-2">
//         {date.format("MMMM")}
//       </span>
//       <small onClick={toggleYearView}>{date.format("YYYY")}</small>
//     </h1>
//     <a onClick={() => changeMonth(date.month() + 1)}>&#8250;</a>
//   </nav>
// );

// const MonthGrid = ({ selectMonth }) => {
//   const months = moment.months();
//   return (
//     <div className="flex flex-wrap">
//       {months.map((month, index) => (
//         <div
//           key={index}
//           onClick={() => selectMonth(index)}
//           className="p-1 m-1 cursor-pointer"
//         >
//           {month}
//         </div>
//       ))}
//     </div>
//   );
// };

// const YearGrid = ({ currentYear, selectYear }) => {
//   const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);
//   return (
//     <div className="flex flex-wrap">
//       {years.map((year, index) => (
//         <div
//           key={index}
//           onClick={() => selectYear(year)}
//           className="p-1 m-1 cursor-pointer"
//         >
//           {year}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Day = ({ currentdate, date, startDate, endDate, onClick }) => {
//   let className = [];

//   if (moment().isSame(date, "day")) {
//     className.push("active");
//   }

//   if (date.isSame(startDate, "day")) {
//     className.push("start");
//   }

//   if (date.isBetween(startDate, endDate, "day")) {
//     className.push("between");
//   }

//   if (date.isSame(endDate, "day")) {
//     className.push("end");
//   }

//   if (!date.isSame(currentdate, "month")) {
//     className.push("muted");
//   }

//   return (
//     <span onClick={() => onClick(date)} className={className.join(" ")}>
//       {date.date()}
//     </span>
//   );
// };

// const Days = ({ date, startDate, endDate, onClick }) => {
//   const thisDate = moment(date);
//   const daysInMonth = moment(date).daysInMonth();
//   const firstDayDate = moment(date).startOf("month");
//   const previousMonth = moment(date).subtract(1, "month");
//   const previousMonthDays = previousMonth.daysInMonth();
//   const nextMonth = moment(date).add(1, "month");
//   let days = [];
//   let labels = [];

//   for (let i = 1; i <= 7; i++) {
//     labels.push(
//       <span className="label" key={i}>
//         {moment().day(i).format("ddd")}
//       </span>
//     );
//   }

//   for (let i = firstDayDate.day(); i > 1; i--) {
//     previousMonth.date(previousMonthDays - i + 2);

//     days.push(
//       <Day
//         key={moment(previousMonth).format("DD MM YYYY")}
//         onClick={onClick}
//         currentdate={date}
//         date={moment(previousMonth)}
//         startDate={startDate}
//         endDate={endDate}
//       />
//     );
//   }

//   for (let i = 1; i <= daysInMonth; i++) {
//     thisDate.date(i);

//     days.push(
//       <Day
//         key={moment(thisDate).format("DD MM YYYY")}
//         onClick={onClick}
//         currentdate={date}
//         date={moment(thisDate)}
//         startDate={startDate}
//         endDate={endDate}
//       />
//     );
//   }

//   const daysCount = days.length;
//   for (let i = 1; i <= 42 - daysCount; i++) {
//     nextMonth.date(i);
//     days.push(
//       <Day
//         key={moment(nextMonth).format("DD MM YYYY")}
//         onClick={onClick}
//         currentdate={date}
//         date={moment(nextMonth)}
//         startDate={startDate}
//         endDate={endDate}
//       />
//     );
//   }

//   return (
//     <nav className="calendar--days">
//       {labels.concat()}
//       {days.concat()}
//     </nav>
//   );
// };
// import React, { useState, useEffect, useRef } from "react";
// import moment from "moment";
// import Button from "./Button";

// const DateRangeFilter = ({ dateRange, setDateRange }) => {
//   const [date, setDate] = useState(moment());
//   const [openDateRange, setOpenDateRange] = useState(false);
//   const [viewMode, setViewMode] = useState("days"); // "days", "months", "years"
//   const calendarRef = useRef(null); // To reference the calendar container

//   // Close the calendar if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (calendarRef.current && !calendarRef.current.contains(event.target)) {
//         setOpenDateRange(false);
//       }
//     };

//     if (openDateRange) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [openDateRange]);
//   const setThisWeek = () => {
//     const startOfWeek = moment().startOf("week");
//     const endOfWeek = moment().endOf("week");

//     setDate(moment()); // Show current month/week
//     setViewMode("days"); // Ensure the view goes back to "days"

//     setDateRange({
//       startDate: startOfWeek,
//       endDate: endOfWeek,
//     });
//   };

//   const setLastWeek = () => {
//     const startOfLastWeek = moment().subtract(1, "week").startOf("week");
//     const endOfLastWeek = moment().subtract(1, "week").endOf("week");

//     setDate(moment().subtract(1, "week")); // Show last week's month
//     setViewMode("days"); // Ensure the view goes back to "days"

//     setDateRange({
//       startDate: startOfLastWeek,
//       endDate: endOfLastWeek,
//     });
//   };

//   const setLast7Days = () => {
//     const startOfLast7Days = moment().subtract(6, "days");
//     const endOfLast7Days = moment();

//     setDate(moment()); // Show current month for last 7 days
//     setViewMode("days"); // Ensure the view goes back to "days"

//     setDateRange({
//       startDate: startOfLast7Days,
//       endDate: endOfLast7Days,
//     });
//   };

//   const setCurrentMonth = () => {
//     const startOfCurrentMonth = moment().startOf("month");
//     const endOfCurrentMonth = moment().endOf("month");

//     setDate(moment()); // Show current month
//     setViewMode("days"); // Ensure the view goes back to "days"

//     setDateRange({
//       startDate: startOfCurrentMonth,
//       endDate: endOfCurrentMonth,
//     });
//   };

//   const setPrevMonth = () => {
//     const startOfPrevMonth = moment().subtract(1, "month").startOf("month");
//     const endOfPrevMonth = moment().subtract(1, "month").endOf("month");

//     setDate(moment().subtract(1, "month")); // Show previous month
//     setViewMode("days"); // Ensure the view goes back to "days"

//     setDateRange({
//       startDate: startOfPrevMonth,
//       endDate: endOfPrevMonth,
//     });
//   };

//   const resetDate = () => {
//     setDate(moment()); // Reset to current date
//     setViewMode("days"); // Reset view to "days"
//     setDateRange({
//       startDate: null,
//       endDate: null,
//     });
//   };

//   const changeMonth = (month) => {
//     setDate(moment(date).month(month));
//     setViewMode("days"); // Return to days view after selecting a month
//   };

//   const changeYear = (year) => {
//     setDate(moment(date).year(year));
//     setViewMode("days"); // Return to days view after selecting a year
//   };

//   const changeDate = (selectedDate) => {
//     const { startDate, endDate } = dateRange;

//     if (
//       !startDate ||
//       selectedDate.isBefore(startDate, "day") ||
//       !startDate.isSame(endDate, "day")
//     ) {
//       setDateRange({
//         startDate: moment(selectedDate),
//         endDate: moment(selectedDate),
//       });
//     } else if (
//       selectedDate.isSame(startDate, "day") &&
//       selectedDate.isSame(endDate, "day")
//     ) {
//       setDateRange({
//         startDate: null,
//         endDate: null,
//       });
//     } else if (selectedDate.isAfter(startDate, "day")) {
//       setDateRange({
//         ...dateRange,
//         endDate: moment(selectedDate),
//       });
//     }
//   };

//   const toggleMonthView = () => {
//     setViewMode("months");
//   };

//   const toggleYearView = () => {
//     setViewMode("years");
//   };

//   return (
//     <div className="relative w-10/12">
//       <Button
//         name={
//           dateRange.startDate && dateRange.endDate
//             ? `${moment(dateRange?.startDate).format("DD MMM")}  -  ${moment(
//                 dateRange?.endDate
//               ).format("DD MMM")}`
//             : "Select Date Range"
//         }
//         className={
//           "bg-transparent rounded-full border-black border p-[6px] m-1"
//         }
//         onClick={() => setOpenDateRange(true)}
//       />

//       {openDateRange && (
//         <div
//           ref={calendarRef} // Reference to the calendar container
//           className="absolute top-11 left-0 w-96 overflow-visible bg-gray-50 z-50"
//         >
//           <div className="w-full relative flex justify-between items-center shadow-md">
//             <div className="calendar w-8/12">
//               <Heading
//                 date={date}
//                 changeMonth={changeMonth}
//                 changeYear={changeYear}
//                 resetDate={resetDate}
//                 toggleMonthView={toggleMonthView}
//                 toggleYearView={toggleYearView}
//               />
//               {viewMode === "days" && (
//                 <Days
//                   date={date}
//                   startDate={dateRange.startDate}
//                   endDate={dateRange.endDate}
//                   onClick={changeDate}
//                 />
//               )}
//               {viewMode === "months" && <MonthGrid selectMonth={changeMonth} />}
//               {viewMode === "years" && (
//                 <YearGrid currentYear={date.year()} selectYear={changeYear} />
//               )}
//             </div>
//             <div className="easy-button w-4/12 text-sm">
//               <button className="m-1 p-1 text-xs" onClick={setThisWeek}>
//                 This Week
//               </button>
//               <button className="m-1 p-1 text-xs" onClick={setLastWeek}>
//                 Last Week
//               </button>
//               <button className="m-1 p-1 text-xs" onClick={setLast7Days}>
//                 Last 7 Days
//               </button>
//               <button className="m-1 p-1 text-xs" onClick={setCurrentMonth}>
//                 Current Month
//               </button>
//               <button className="m-1 p-1 text-xs" onClick={setPrevMonth}>
//                 Prev Month
//               </button>
//               <button
//                 className="text-blue-700 p-1 m-1 mt-8"
//                 onClick={resetDate}
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateRangeFilter;
