import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineContentCut } from "react-icons/md";
import "./customers.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../../../redux/Actions/CustomerAction";
import SecondBtn from "../../../../components/Buttons/SecondBtn";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers(searchTerm));
  }, [dispatch, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {/* Existing JSX code */}
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
        <div id="headofcfdash">
          <p>Name</p>
          <p>Phone Number</p>
          <p>Gender</p>
          <p>CS type</p>
        </div>
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
                <Link to={`/customer/details/${customer.id}`}  key={customer.id}>
                  <div id="CustomersDataDash" key={customer.id}>
                    <p id="f1ofcdd">
                      {customer.first_name}
                      {customer.last_name}
                    </p>
                    <p id="f2ofcdd">{customer.contact_no}</p>
                    <p id="f3ofcdd">{customer.gender}</p>
                    <p id="f4ofcdd">{customer.customer_type}</p>
                    {/* Render other customer details */}
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
      <Link to={"/add/customer"}>
        <div id="lastbtnfordashboard">
          <SecondBtn title={"Add Customer"} />
        </div>
      </Link>
    </>
  );
};

export default Customers;
