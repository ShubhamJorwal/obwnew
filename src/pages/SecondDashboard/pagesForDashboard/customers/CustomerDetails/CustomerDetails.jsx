import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import the useParams hook
import { AiOutlineArrowLeft } from "react-icons/ai";

const CustomerDetails = () => {
  const { customerId } = useParams(); // Extract the customerId from the URL params
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const Navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchCustomerDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://admin.obwsalon.com/api/customer/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        setCustomer(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching customer details");
        setLoading(false);
      }
    };
    fetchCustomerDetails();
  }, [customerId]);

  const goToPreviousPage = () => {
    Navigate("/customers");
  };

  const getCustomerDetails = (customerId) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer ? `${customer.first_name} ` : "N/A";
  };
  const getCustomerDetailss = (customerId) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer ? `${customer.contact_no} ` : "N/A";
  };

  return (
    <>
      <div style={{ marginBottom: "3rem" }} id="TopHeader">
        <div id="backbtn" onClick={goToPreviousPage}>
          <AiOutlineArrowLeft />
        </div>
        <h1>Customer Details</h1>
        <div id="lastRes"></div>
      </div>
      {loading ? (
        <p>Loading customer details...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div id="midcompcustomerdetails">
          <div id="topdetailsshos">
            <h2>
              {customer.first_name} {customer.last_name}
            </h2>
            <p>Phone Number: {customer.contact_no}</p>
            <p>Gender: {customer.gender}</p>
            <p>Customer Type: {customer.customer_type}</p>
          </div>
          {/* Render other customer details */}
        </div>
      )}
    </>
  );
};

export default CustomerDetails;
