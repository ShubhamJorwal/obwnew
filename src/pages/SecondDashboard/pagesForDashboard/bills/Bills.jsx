import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineContentCut } from "react-icons/md";
import "./bills.scss";
import { Link } from "react-router-dom";
import { fetchCustomers } from "../../../../redux/Actions/CustomerAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SecondBtn from "../../../../components/Buttons/SecondBtn";
import { useNavigate } from "react-router-dom";

const Bills = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBills, setFilteredBills] = useState([]);
  const Navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const { customers, loading, error } = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers()); // Fetch customers from the API
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          "https://admin.obwsalon.com/api/bills",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the request headers
            },
          }
        );
        console.log(response.data);
        setBills(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBills();
  }, [dispatch]);
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getCustomerDetails = (customerId) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer ? `${customer.first_name}` : "N/A";
  };

  useEffect(() => {
    const filtered = bills.filter((bill) =>
      getCustomerDetails(bill.customer_id)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredBills(filtered);
  }, [bills, searchQuery]);

  const handleBillClick = (billId) => {
    const token = localStorage.getItem("token");
    const url = `https://admin.obwsalon.com/api/bill/${billId}`;

    // Redirect the user to the bill details page
    Navigate(`/bill/${billId}`);

    // Fetch the bill details using the API and token
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the bill details response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };

  return (
    <>
      <div id="BillsOfDash">
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

      <div id="middlebillsdata">
        <div id="searchbarsda">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            id="searchstylistbar"
          />
        </div>
        <div id="headofbk">
          <p>Bill N.O</p>
          <p>Name</p>
          <p>Date</p>
          <p>Amount</p>
        </div>
        {filteredBills.map((bill) => (
          <div
            id="listingbills"
            key={bill.id}
            onClick={() => handleBillClick(bill.id)}
          >
            <p style={{ color: "#868686" }}>{bill.bill_id}</p>
            <p style={{ color: "#3D4142" }}>
              {getCustomerDetails(bill.customer_id)}
            </p>
            <p style={{ color: "#3D4142" }}>{bill.date}</p>
            <p style={{ color: "#18959E" }}>{bill.total}</p>
            {/* Render other bill details */}
          </div>
        ))}
      </div>
      <div id="lastbtnfordashboard">
        <SecondBtn title={"Create Bill"} />
      </div>
    </>
  );
};

export default Bills;
