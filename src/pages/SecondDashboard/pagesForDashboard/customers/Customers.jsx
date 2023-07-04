import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdDelete, MdOutlineContentCut } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import "./customers.scss";
import { Link, useNavigate } from "react-router-dom";
import SecondBtn from "../../../../components/Buttons/SecondBtn";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [isDivVisible, setIsDivVisible] = useState(true);
  const [isDivVisible2O, setIsDivVisible2O] = useState(true);
  const [isDivVisible3O, setIsDivVisible3O] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchCustomers(token);
  }, []);

  const fetchCustomers = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://admin.obwsalon.com/api/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setCustomers(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while fetching customers.");
    }

    setLoading(false);
  };

  const fetchCustomerDetails = async (customerId) => {
    setLoading(true);
    setError(null);

    setIsDivVisible(false);
    setIsDivVisible3O(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://admin.obwsalon.com/api/customer/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setSelectedCustomer(data);

        console.log(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while fetching customer details.");
    }

    setLoading(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCustomerClick = (customerId) => {
    fetchCustomerDetails(customerId);

    setSelectedBooking(null); // Reset selected booking when a new customer is selected
  };

  const goToPreviousPage = () => {
    Navigate("/customers");
    location.reload();
  };
  const fetchBookingDetails = async (bookingId) => {
    setLoading(true);
    setError(null);

    setIsDivVisible(false);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://admin.obwsalon.com/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        const selectedBooking = data.filter(
          (booking) => booking.id === bookingId
        );
        setSelectedBooking(selectedBooking);
        console.log(selectedBooking);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while fetching booking details.");
    }

    setLoading(false);
  };

  const handleBookingClick = async (bookingId) => {
    await fetchBookingDetails(bookingId);
    setIsDivVisible2O(true);
    setIsDivVisible(false);
    setIsDivVisible3O(false);
  };

  return (
    <>
      {isDivVisible3O && (
        <div>
          {selectedCustomer && (
            <div id="selctedcustomedata">
              <div id="selectedstylsitstylistlsit">
                <div id="TopHeader">
                  <div id="backbtn" onClick={goToPreviousPage}>
                    <AiOutlineArrowLeft />
                  </div>
                  <h1>Customer Details</h1>
                  <div id="lastRes"></div>
                </div>
                <div id="topdataforstyde">
                  <div id="firstlinestli">
                    <p>
                      {selectedCustomer.customer.first_name}{" "}
                      {selectedCustomer.customer.last_name}
                    </p>
                    <p>{selectedCustomer.customer.gender}</p>
                    <p>Age : {selectedCustomer.customer.age}yrs</p>

                    <p>{selectedCustomer.customer.contact_no}</p>
                  </div>
                  <div id="secondstylili">
                    <p>
                      Customer Since :{" "}
                      {selectedCustomer.customer.customer_since}
                    </p>
                    <p>
                      <GrEdit />{" "}
                    </p>
                  </div>
                  <div id="bookingsbyeachstylist">
                    <h1>Bookings</h1>
                    <div id="headstylsit">
                      <p style={{ flexBasis: "25%" }}>Date</p>
                      <p style={{ flexBasis: "35%" }}>Name</p>
                      <p style={{ flexBasis: "20%" }}>Bill No</p>
                      <p style={{ flexBasis: "20%" }}>Amount</p>
                    </div>
                  </div>
                  <div id="bookingsofthatstylist">
                    {selectedCustomer.bookings.map((booking) => (
                      <div
                        id="bookingrowstylistid"
                        key={booking.id}
                        className="bookingItem"
                        onClick={() => handleBookingClick(booking.id)} // Fetch booking details on click
                      >
                        <p style={{ flexBasis: "25%" }}>{booking.date}</p>
                        <p style={{ flexBasis: "35%" }}>
                          <p>
                            {selectedCustomer.customer.first_name}{" "}
                            {selectedCustomer.customer.last_name}
                          </p>
                        </p>
                        <p style={{ flexBasis: "20%" }}>{booking.booking_id}</p>
                        <p style={{ flexBasis: "20%" }}>{booking.total}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isDivVisible2O && (
        <div>
          {selectedBooking && (
            <div id="selectedstylsitstylistlsit">
              {/* Render selected booking details */}
              <div id="TopHeader">
                <div id="backbtn" onClick={goToPreviousPage}>
                  <AiOutlineArrowLeft />
                </div>
                <h1>Booking</h1>
                <div id="lastRes"></div>
              </div>

              <div id="topdataforstyde">
                {selectedCustomer && (
                  <div
                    id="divupfirs"
                    style={{ borderBottom: "1px solid #8D8D8D" }}
                  >
                    <h2
                      style={{
                        fontWeight: "600",
                        fontSize: "26px",
                        textDecoration: "underline",
                        lineHeight: "1rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      Customer
                    </h2>
                    <div style={{ justifyContent: "unset" }} id="firstlinestli">
                      <p style={{ marginRight: "4rem", color: "black" }}>
                        {selectedCustomer.customer.first_name}{" "}
                        {selectedCustomer.customer.last_name}
                      </p>
                      <p style={{ marginRight: "4rem", color: "black" }}>
                        Date :{" "}
                      </p>
                      <p style={{ marginRight: "4rem", color: "black" }}>
                        Time :{" "}
                      </p>
                    </div>
                    <div style={{ justifyContent: "unset" }} id="firstlinestli">
                      <p style={{ marginRight: "4rem", color: "black" }}>
                        Age : {selectedCustomer.customer.age}yrs
                      </p>

                      <p style={{ marginRight: "4rem", color: "black" }}>
                        {selectedCustomer.customer.contact_no}
                      </p>
                    </div>
                  </div>
                )}
                {/* <div id="firstlinestli"> */}
                {/* <p> */}
                {/* {selectedStylist.first_name} {selectedStylist.last_name} */}
                {/* </p> */}
                {/* <p>{selectedStylist.gender}</p> */}
                {/* <p>Exp : {selectedStylist.experience}</p> */}
                {/* <p>{selectedStylist.phone_number}</p> */}
                {/* </div> */}
                <div id="checkoutsec">
                  <div id="mainsecforcheck">
                    <div id="toplinescheck">
                      <h2 style={{ flexBasis: "25%" }} id="firsttoplinech">
                        {" "}
                        Item
                      </h2>
                      <h2 style={{ flexBasis: "15%" }} id="ndtoplinech">
                        Qty
                      </h2>
                      <h2 style={{ flexBasis: "20%" }} id="rdtoplinech">
                        Price
                      </h2>
                      <h2 style={{ flexBasis: "15%" }} id="thtoplinech">
                        DC
                      </h2>
                      <h2 style={{ flexBasis: "20%" }} id="thtoplinech">
                        Total
                      </h2>
                      <div id="afdsasdfdssd">
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {selectedCustomer.bookings.map((booking) => (
                  <div
                    id="bookingrowstylistid"
                    key={booking.id}
                    className="bookingItem"
                    onClick={() => handleBookingClick(booking)}
                  >
                    {booking.status}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Existing JSX code */}
      {isDivVisible && (
        <div id="wholcussyls">
          <div id="Customersecdash">
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
          <input
            type="text"
            placeholder="Search by name or mobile number"
            value={searchTerm}
            onChange={handleSearch}
            id="searchstylistbar"
          />
          {/* Existing JSX code */}
          <div id="dataofcustomersfordash">
            <div id="headofcfdash">{/* ... */}</div>
            {loading ? (
              <p>Loading customers...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <div>
                {customers
                  .filter(
                    (customer) =>
                      (customer.first_name &&
                        customer.first_name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())) ||
                      (customer.last_name &&
                        customer.last_name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())) ||
                      (customer.contact_no &&
                        customer.contact_no.includes(searchTerm))
                  )
                  .map((customer) => (
                    <div
                      id="CustomersDataDash"
                      key={customer.id}
                      onClick={() => handleCustomerClick(customer.id)}
                    >
                      <p id="f1ofcdd">
                        {customer.first_name} {customer.last_name}
                      </p>
                      <p id="f2ofcdd">{customer.contact_no}</p>
                      <p id="f3ofcdd">{customer.gender}</p>
                      <p id="f4ofcdd">{customer.customer_type}</p>
                      {/* Render other customer details */}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* </div> */}
          <Link to={"/add/customer"}>
            <div id="lastbtnfordashboard">
              <SecondBtn title={"Add Customer"} />
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Customers;
