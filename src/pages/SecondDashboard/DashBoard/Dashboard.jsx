import React, { useState } from "react";
import "./dashboard.scss";
import { CiCalendarDate } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineContentCut } from "react-icons/md";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import SecondBtn from "../../../components/Buttons/SecondBtn";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const currentYear = new Date().getFullYear();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth + 1);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const weeks = Math.ceil((daysInMonth + firstDayIndex) / 7);

    const calendar = [];

    let dayCounter = 1;

    for (let i = 0; i < weeks; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayIndex) || dayCounter > daysInMonth) {
          week.push(<td key={`${i}-${j}`}></td>);
        } else {
          week.push(
            <td
              key={`${i}-${j}`}
              onClick={() => setSelectedDate(dayCounter)}
              className={selectedDate === dayCounter ? "selected" : ""}
            >
              {dayCounter}
            </td>
          );
          dayCounter++;
        }
      }

      calendar.push(<tr key={i}>{week}</tr>);
    }

    return calendar;
  };

  const handleSubmit = () => {
    Navigate("/dashboard");
  };

  return (
    <>
      <div id="dashboard">
        <div id="topmegamenu">
          <Link to={"/appointment"} className="megamenuLinks" id="Option1">
            <CiCalendarDate />
            <p>Appointments</p>
          </Link>
          <Link to={"/bookings"} className="megamenuLinks" id="Option2">
            <IoCheckmarkDoneSharp />
            <p>Bookings</p>
          </Link>
          <Link to={"/bills"} className="megamenuLinks" id="Option3">
            <FaReceipt />
            <p>Bills</p>
          </Link>
          <Link to={"/products"} className="megamenuLinks" id="Option4">
            <IoCubeSharp />
            <p>Products</p>
          </Link>
          <Link to={"/customers"} className="megamenuLinks" id="Option5">
            <RiAccountCircleLine />
            <p>Customer</p>
          </Link>
          <Link to={"/stylist"} className="megamenuLinks" id="Option6">
            <MdOutlineContentCut />

            <p>Stylist</p>
          </Link>
        </div>
      </div>

      <div className="calendar">
        <div className="month-navigation">
          <button onClick={handlePreviousMonth}>
            <AiOutlineArrowLeft />
          </button>
          <h2>{months[currentMonth]}</h2>
          <button onClick={handleNextMonth}>
            <AiOutlineArrowRight />
          </button>
        </div>
        <table id="tableforcalender">
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody>
        </table>
        {/* <div>
        Selected Date: {selectedDate || 'None'}
      </div> */}
      </div>
      <div id="lastbtnfordashboard">
        <SecondBtn title={"Create Appointment"} />
      </div>
    </>
  );
};

export default Dashboard;
