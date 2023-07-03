import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { CiCalendarDate } from "react-icons/ci";
// import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoCheckmarkDone, IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineContentCut } from "react-icons/md";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import SecondBtn from "../../../components/Buttons/SecondBtn";
import { RxCross2, RxCrossCircled } from "react-icons/rx";

const CorrectedDashBoard = () => {
  const Navigate = useNavigate();
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    // Fetch appointments from the API using the stored token in localStorage
    const token = localStorage.getItem("token");
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://admin.obwsalon.com/api/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    // Fetch customer data for all appointments
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem("token");
        const customerIds = appointments.map(
          (appointment) => appointment.customer_id
        );
        const promises = customerIds.map((customerId) =>
          axios.get(
            `https://admin.obwsalon.com/api/customers?filter[id]=${customerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );
        const responses = await Promise.all(promises);
        const customerData = responses.map((response) => response.data[0]);
        setCustomerData(customerData);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    if (appointments.length > 0) {
      fetchCustomerData();
    }
  }, [appointments]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setIsDivVisible(true);

    const targetDiv = document.getElementById("coverddiv");
    targetDiv.classList.add("changebackgrounddark");
  };

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.appointment_date === selectedDate
  );

  const formatTime = (timeString) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
  };

  //
  const handleBackClick = () => {
    const targetDiv = document.getElementById("coverddiv");
    targetDiv.classList.remove("changebackgrounddark");
    setIsDivVisible(false);
  };

  const getStatusElement = (status) => {
    if (status === "Confirmed") {
      return (
        <p style={{ flexBasis: "26%", color: "#ADADAD", fontWeight: "500" }}>
          {" "}
          <IoCheckmarkDoneSharp size={"20px"} color="#2EE700" /> &nbsp; {status}
        </p>
      );
    } else if (status === "Cancelled") {
      return (
        <p style={{ flexBasis: "26%", color: "#ADADAD", fontWeight: "500" }}>
          <RxCrossCircled size={"20px"} color="#FF0000" /> &nbsp;{status}
        </p>
      );
    } else if (status === "Not Assigned") {
      return (
        <p style={{ flexBasis: "26%", color: "#ADADAD", fontWeight: "500" }}>
          <IoCheckmarkDoneSharp size={"20px"} /> &nbsp;{status}
        </p>
      );
    }
    return null;
  };

  const handleAppointmentClick = (appointmentId) => {
    // Redirect the user to the appointment details page with the selected appointment ID
    Navigate(`/save/appointment/${appointmentId}`);
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

      <div id="datestofindApt">
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>

      <div id="lastbtnfordashboard">
        <Link to={"/create/appointment"}>
          <SecondBtn title={"Create Appointment"} />
        </Link>
      </div>

      {isDivVisible && (
        <div id="appoinmentsbydate">
                        <div id="content-to-display02">
                <div></div>
                <div id="tophead">
                  <h2>{/* {selectedDate}-{currentMonth} */}</h2>
                  <h3>Appointments</h3>
                </div>
                <button onClick={handleBackClick}>
                  <RxCross2 size={"2rem"} color="red" />{" "}
                </button>
              </div>
              <div id="midcompline">
                <p style={{ flexBasis: "30%" }}>Name</p>
                <p style={{ flexBasis: "25%" }}>Phone Number</p>
                <p style={{ flexBasis: "19%" }}>Time</p>
                <p style={{ flexBasis: "26%" }}>Status</p>
              </div>
          {filteredAppointments.length === 0 ? (
            <div id="content-to-display">

              <div id="insideDateofdashs">
                <p>No appointments found for the selected date.</p>
              </div>
            </div>
          ) : (
            // <p>No appointments for the selected date.</p>
            filteredAppointments.map((appointment) => {
              const customer = customerData.find(
                (customer) => customer.id === appointment.customer_id
              );
              return (
                <div key={appointment.id} id="content-to-display">
                  <div id="content-to-display">
                    
                    <div
                      id="insideDateofdash"
                      onClick={() => handleAppointmentClick(appointment.id)}
                    >
                      <p
                        style={{
                          flexBasis: "30%",
                          color: "#3D4142",
                          fontWeight: "500",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {customer?.first_name} {customer?.last_name}
                      </p>
                      <p
                        style={{
                          flexBasis: "25%",
                          color: "#868686",
                          fontWeight: "400",
                        }}
                      >
                        {customer?.contact_no.substr(0, 7)}***
                      </p>
                      <p
                        style={{
                          flexBasis: "19%",
                          color: "#016E82",
                          fontWeight: "500",
                        }}
                      >
                        {formatTime(appointment.appointment_time)}
                      </p>
                      {/* <p>{appointment.appointment_date}</p> */}
                      {/* <p style={{color:"red" , fontWeight:"500"}}>{appointment.status}</p> */}
                      {getStatusElement(appointment.status)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      <div id="coverddiv"></div>
    </>
  );
};

export default CorrectedDashBoard;
