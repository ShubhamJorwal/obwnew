import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineContentCut } from "react-icons/md";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomers } from "../../../../redux/Actions/CustomerAction";

import "./bookings.scss";
import { Link } from "react-router-dom";
import SecondBtn from "../../../../components/Buttons/SecondBtn";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://admin.obwsalon.com/api/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        setAppointments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div id="aptbookings">
        <div id="headboks">
          <p id="f1heboks">Name</p> <p id="f2heboks">Phone Number</p>{" "}
          <p id="f3heboks">Time</p> <p id="f4heboks">Status</p>
        </div>
        {appointments.map((appointment) => (
          <div id="ListOfApts" key={appointment.id}>
            <p id="Loaptsf1">Booking ID: {appointment.booking_id}</p>
            <p id="Loaptsf2">Customer ID: {appointment.customer_id}</p>
            <p id="Loaptsf3" style={{ color: "blue" }}>
              11:30AM
            </p>
            <p id="Loaptsf4" style={{ color: "green" }}>
              Confirmed
            </p>
            {/* Render other appointment details */}
          </div>
        ))}
      </div>
    </>
  );
};
const CsBooking = () => {
  const { customers, loading, error } = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    dispatch(fetchCustomers()); // Fetch customers from the API

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://admin.obwsalon.com/api/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, [dispatch]);

  const getCustomerDetails = (customerId) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer ? `${customer.first_name} (${customer.contact_no})` : "N/A";
  };

  return (
    <>
      <div id="Csbookingbks">
        <div id="headboks">
          <p>Name</p> <p>Phone Number</p> <p>Amount</p>
        </div>

        {bookings.map((booking) => (
          <div id="dataofCsbooks" key={booking.id}>
            <p>Name: {getCustomerDetails(booking.customer_id)}</p>
            <p>{booking.id}</p>
          </div>
        ))}
      </div>
    </>
  );
};
const Ongoing = () => {
  return <>hiddddd</>;
};
const Completed = () => {
  return <>hiafdasd</>;
};

const Bookings = () => {
  const [selectedOption, setSelectedOption] = useState("Appointment");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "Appointment":
        return <Appointment />;
      case "CsBooking":
        return <CsBooking />;
      case "Ongoing":
        return <Ongoing />;
      case "Completed":
        return <Completed />;
      default:
        return null;
    }
  };

  return (
    <>
      <div id="bookingspage">
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

      <div id="FourCatofbookp">
        <div
          className="singbtnBp"
          onClick={() => handleOptionClick("Appointment")}
        >
          {" "}
          Appointment{" "}
        </div>
        <div
          className="singbtnBp"
          onClick={() => handleOptionClick("CsBooking")}
        >
          {" "}
          C.S Booking{" "}
        </div>
        <div className="singbtnBp" onClick={() => handleOptionClick("Ongoing")}>
          {" "}
          Ongoing{" "}
        </div>
        <div
          className="singbtnBp"
          onClick={() => handleOptionClick("Completed")}
        >
          {" "}
          Completed{" "}
        </div>
      </div>

      {renderContent()}

      <div id="lastbtnfordashboard">
        <SecondBtn title={"Create New Booking"} />
      </div>
    </>
  );
};

export default Bookings;
