import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import Button from "../Atom/Button";
import { useHandleOutsideClick } from "../../utils/hooks/useHandleOutSideClick";
import { BsCalendarDate } from "react-icons/bs";

const Heading = ({
  date,
  changeMonth,
  changeYear,
  resetDate,
  toggleMonthView,
  toggleYearView,
}) => (
  <nav className="calendar--nav">
    <a onClick={() => changeMonth(date.month() - 1)}>&#8249;</a>
    <h1>
      <span onClick={toggleMonthView} className="mr-2">
        {date.format("MMMM")}
      </span>
      <small onClick={toggleYearView}>{date.format("YYYY")}</small>
    </h1>
    <a onClick={() => changeMonth(date.month() + 1)}>&#8250;</a>
  </nav>
);

const MonthGrid = ({ selectMonth }) => {
  const months = moment.months();
  return (
    <div className="flex flex-wrap">
      {months.map((month, index) => (
        <div
          key={index}
          onClick={() => selectMonth(index)}
          className="p-1 m-1 cursor-pointer"
        >
          {month}
        </div>
      ))}
    </div>
  );
};

const YearGrid = ({ currentYear, selectYear }) => {
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);
  return (
    <div className="flex flex-wrap">
      {years.map((year, index) => (
        <div
          key={index}
          onClick={() => selectYear(year)}
          className="p-1 m-1 cursor-pointer"
        >
          {year}
        </div>
      ))}
    </div>
  );
};

const Day = ({ currentdate, date, startDate, endDate, onClick }) => {
  let className = [];

  if (moment().isSame(date, "day")) {
    className.push("active");
  }

  if (date.isSame(startDate, "day")) {
    className.push("start");
  }

  if (date.isBetween(startDate, endDate, "day")) {
    className.push("between");
  }

  if (date.isSame(endDate, "day")) {
    className.push("end");
  }

  if (!date.isSame(currentdate, "month")) {
    className.push("muted");
  }

  return (
    <span onClick={() => onClick(date)} className={className.join(" ")}>
      {date.date()}
    </span>
  );
};

const Days = ({ date, startDate, endDate, onClick }) => {
  const thisDate = moment(date);
  const daysInMonth = moment(date).daysInMonth();
  const firstDayDate = moment(date).startOf("month");
  const previousMonth = moment(date).subtract(1, "month");
  const previousMonthDays = previousMonth.daysInMonth();
  const nextMonth = moment(date).add(1, "month");
  let days = [];
  let labels = [];

  const startDayOfWeek = 0;

  for (let i = startDayOfWeek; i < startDayOfWeek + 7; i++) {
    labels.push(
      <span className="label" key={i}>
        {moment().day(i).format("ddd")}
      </span>
    );
  }

  for (let i = firstDayDate.day() - startDayOfWeek; i > 0; i--) {
    previousMonth.date(previousMonthDays - i + 1);

    days.push(
      <Day
        key={moment(previousMonth).format("DD MM YYYY")}
        onClick={onClick}
        currentdate={date}
        date={moment(previousMonth)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    thisDate.date(i);

    days.push(
      <Day
        key={moment(thisDate).format("DD MM YYYY")}
        onClick={onClick}
        currentdate={date}
        date={moment(thisDate)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  const daysCount = days.length;
  for (let i = daysCount; i < 42; i++) {
    nextMonth.date(i - daysCount + 1);
    days.push(
      <Day
        key={moment(nextMonth).format("DD MM YYYY")}
        onClick={onClick}
        currentdate={date}
        date={moment(nextMonth)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  return (
    <nav className="calendar--days">
      {labels.concat()}
      {days.concat()}
    </nav>
  );
};

const DateRangeFilter = ({ dateRange, setDateRange }) => {
  const [date, setDate] = useState(moment());
  const [openDateRange, setOpenDateRange] = useState(false);
  const [viewMode, setViewMode] = useState("days");
  const [selectedButton, setSelectedButton] = useState(null);
  const calendarRef = useRef();

  const handleClose = () => {
    setOpenDateRange(false);
  };

  useHandleOutsideClick(calendarRef, handleClose);

  const resetDate = () => {
    setDate(moment());
    setViewMode("days");
    setDateRange({
      startDate: null,
      endDate: null,
    });
    setSelectedButton(null);
  };

  const setThisWeek = () => {
    const startOfWeek = moment().startOf("week");
    const endOfWeek = moment().endOf("week");

    setDate(moment());
    setViewMode("days");

    setDateRange({
      startDate: startOfWeek,
      endDate: endOfWeek,
    });
    setSelectedButton("thisWeek");
  };

  const setLastWeek = () => {
    const startOfLastWeek = moment().subtract(1, "week").startOf("week");
    const endOfLastWeek = moment().subtract(1, "week").endOf("week");

    setDate(moment().subtract(1, "week"));
    setViewMode("days");

    setDateRange({
      startDate: startOfLastWeek,
      endDate: endOfLastWeek,
    });
    setSelectedButton("lastWeek");
  };

  const setLast7Days = () => {
    const startOfLast7Days = moment().subtract(6, "days");
    const endOfLast7Days = moment();

    setDate(moment());
    setViewMode("days");

    setDateRange({
      startDate: startOfLast7Days,
      endDate: endOfLast7Days,
    });
    setSelectedButton("last7Days");
  };

  const setCurrentMonth = () => {
    const startOfCurrentMonth = moment().startOf("month");
    const endOfCurrentMonth = moment().endOf("month");

    setDate(moment());
    setViewMode("days");

    setDateRange({
      startDate: startOfCurrentMonth,
      endDate: endOfCurrentMonth,
    });
    setSelectedButton("currentMonth");
  };

  const setPrevMonth = () => {
    const startOfPrevMonth = moment().subtract(1, "month").startOf("month");
    const endOfPrevMonth = moment().subtract(1, "month").endOf("month");

    setDate(moment().subtract(1, "month"));
    setViewMode("days");

    setDateRange({
      startDate: startOfPrevMonth,
      endDate: endOfPrevMonth,
    });
    setSelectedButton("prevMonth");
  };

  const changeMonth = (month) => {
    setDate(moment(date).month(month));
    setViewMode("days");
  };

  const changeYear = (year) => {
    setDate(moment(date).year(year));
    setViewMode("days");
  };

  return (
    <div className="relative mr-1">
      <div
        className="p-2 border border-gray-200 bg-gray-100 rounded-sm text-sm flex items-center justify-around text-blue-400 cursor-pointer"
        onClick={() => setOpenDateRange(!openDateRange)}
      >
        <BsCalendarDate className="mr-2" />
        <Button
          name={
            dateRange.startDate && dateRange.endDate
              ? `${moment(dateRange?.startDate).format("DD MMM")}  -  ${moment(
                  dateRange?.endDate
                ).format("DD MMM")}`
              : "Date Range"
          }
          className={"text-sm"}
        />
      </div>
      {openDateRange && (
        <div
          className="fixed top-52 -right-20 w-96 h-96 overflow-visible bg-gray-50 z-50 -translate-x-1/2"
          ref={calendarRef}
        >
          <div className="w-full relative flex items-center shadow-md z-50 h-96">
            <div className="calendar w-8/12">
              <Heading
                date={date}
                changeMonth={changeMonth}
                changeYear={changeYear}
                resetDate={resetDate}
                toggleMonthView={() => setViewMode("months")}
                toggleYearView={() => setViewMode("years")}
              />
              {viewMode === "days" && (
                <Days
                  date={date}
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  onClick={(selectedDate) => {
                    const { startDate, endDate } = dateRange;

                    if (
                      !startDate ||
                      selectedDate.isBefore(startDate, "day") ||
                      !startDate.isSame(endDate, "day")
                    ) {
                      setDateRange({
                        startDate: moment(selectedDate),
                        endDate: moment(selectedDate),
                      });
                    } else if (
                      selectedDate.isSame(startDate, "day") &&
                      selectedDate.isSame(endDate, "day")
                    ) {
                      setDateRange({
                        startDate: null,
                        endDate: null,
                      });
                    } else if (selectedDate.isAfter(startDate, "day")) {
                      setDateRange({
                        ...dateRange,
                        endDate: moment(selectedDate),
                      });
                    }
                  }}
                />
              )}
              {viewMode === "months" && <MonthGrid selectMonth={changeMonth} />}
              {viewMode === "years" && (
                <YearGrid currentYear={date.year()} selectYear={changeYear} />
              )}
            </div>
            <div className="easy-button w-4/12 text-sm">
              <button
                className={`m-1 p-1 text-xs ${
                  selectedButton === "thisWeek" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={setThisWeek}
              >
                This Week
              </button>
              <button
                className={`m-1 p-1 text-xs ${
                  selectedButton === "lastWeek" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={setLastWeek}
              >
                Last Week
              </button>
              <button
                className={`m-1 p-1 text-xs ${
                  selectedButton === "last7Days" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={setLast7Days}
              >
                Last 7 Days
              </button>
              <button
                className={`m-1 p-1 text-xs ${
                  selectedButton === "currentMonth"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={setCurrentMonth}
              >
                Current Month
              </button>
              <button
                className={`m-1 p-1 text-xs ${
                  selectedButton === "prevMonth" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={setPrevMonth}
              >
                Prev Month
              </button>
              <button
                className="text-blue-700 p-1 m-1 mt-8"
                onClick={resetDate}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
