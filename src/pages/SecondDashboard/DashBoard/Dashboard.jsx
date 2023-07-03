import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

const Dashboard = () => {
  const [isDivVisible, setIsDivVisible] = useState(false);

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
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth + 1);
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    handleSubmit();
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
              onClick={() => handleDateClick(dayCounter)}
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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // Fetch appointments
      const appointmentsResponse = await axios.get(
        "https://admin.obwsalon.com/api/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allAppointments = appointmentsResponse.data;

      // Filter appointments based on selected date
      const filteredAppointments = allAppointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointment_date);
        return (
          appointmentDate.getDate() === selectedDate &&
          appointmentDate.getMonth() === currentMonth &&
          appointmentDate.getFullYear() === currentYear
        );
      });

      console.log("Appointments for selected date:", filteredAppointments);

      setAppointments(filteredAppointments);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching appointments:", error);
      setLoading(false);
    }
    setIsDivVisible(true);

    const targetDiv = document.getElementById("coverddiv");
    targetDiv.classList.add("changebackgrounddark");

    setSelectedDate(date); // Set the selected date
  };

  useEffect(() => {
    // Fetch appointments data (replace with your own API endpoint)
    const fetchAppointments = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://admin.obwsalon.com/api/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);
  const handleBackClick = () => {
    const targetDiv = document.getElementById("coverddiv");
    targetDiv.classList.remove("changebackgrounddark");
    setIsDivVisible(false);
  };
  return (
    <>
      <div id="dashboard">
        <div id="topmegamenu">
          <Link to={"/dashboard"} className="megamenuLinks" id="Option1">
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
      </div>

      <div id="lastbtnfordashboard">
        <Link to={"/create/appointment"}>
          <SecondBtn title={"Create Appointment"} onClick={handleSubmit} />
        </Link>
      </div>
      {isDivVisible && (
        <div id="appoinmentsbydate">
          {appointments.length === 0 ? (
            <div id="content-to-display">
              <div id="content-to-display02">
                <div></div>
                <div id="tophead">
                  <h2>
                    {selectedDate}-{currentMonth}
                  </h2>
                  <h3>Appointments</h3>
                </div>
                <button onClick={handleBackClick}>
                  <RxCross2 size={"2rem"} color="red" />{" "}
                </button>
              </div>
              <div id="midcompline">
                <p>Name</p>
                <p>Phone Number</p>
                <p>Time</p>
                <p>Status</p>
              </div>
              <div id="insideDateofdash">
                <p>No appointments found for the selected date.</p>
              </div>
            </div>
          ) : (
            <div id="content-to-display">
              <p>Appointments for selected date:</p>
              <ul>
                {appointments.map((appointment) => (
                  <li key={appointment.id}>{appointment.appointment_id}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div id="coverddiv"></div>
    </>
  );
};

export default Dashboard;
