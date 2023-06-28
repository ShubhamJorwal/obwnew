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

      // Fetch all customers
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://admin.obwsalon.com/api/customers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const customers = response.data;

      // Filter appointments based on selected date
      const filteredAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointment_date);
        return (
          appointmentDate.getDate() === selectedDate &&
          appointmentDate.getMonth() === currentMonth &&
          appointmentDate.getFullYear() === currentYear
        );
      });

      // Display customer names for the filtered appointments
      const customerNames = filteredAppointments.map((appointment) => {
        const customer = customers.find(
          (customer) => customer.id === appointment.customer_id
        );
        return customer ? customer.name : "";
      });

      console.log("Appointments for selected date:", customerNames);

      setLoading(false);
    } catch (error) {
      console.log("Error fetching appointments:", error);
      setLoading(false);
    }
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

        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

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
    </>
  );
};

export default Dashboard;
