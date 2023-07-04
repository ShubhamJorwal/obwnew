import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BillDetails = () => {
  const { billId } = useParams();
  const [billDetails, setBillDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const token = localStorage.getItem("token");
  
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(
          `https://admin.obwsalon.com/api/bill/${billId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBillDetails(response.data.bill);

        const customerId = response.data.bill.customer_id;
        const customerResponse = await axios.get(
          `https://admin.obwsalon.com/api/customer/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomerDetails(customerResponse.data.customer);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBillDetails();
  }, [billId, token]);

  if (!billDetails || !customerDetails) {
    return <div>Loading...</div>;
  }

  const goToPreviousPage = () => {
    Navigate("/bills");
  };





  // new functions 
  
  return (
    <div id="checkoutsec">
      <div style={{ marginBottom: "3rem" }} id="TopHeader">
        <div id="backbtn" onClick={goToPreviousPage}>
          <AiOutlineArrowLeft />
        </div>
        <h1>Bill</h1>
        <div id="lastRes"></div>
      </div>
      <div id="topdetailsbilldetai">
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
        <div id="flexsideljk">
          <p>{customerDetails.first_name} {customerDetails.last_name}</p>
          <p>{customerDetails.contact_no}</p>
          <p>{billDetails.date}</p>
          <p>Bill No - {billDetails.bill_id}</p>
        </div>
        {/* Display other customer details */}
      </div>
      <div id="buttonsforcheckout">
          <Link to={"/services/women"}>
            <button>Add Service</button>
          </Link>
          {/* <button onClick={handleAddProducts}>Add Product</button> */}
          <button >Add Product</button>
        </div>
    </div>
  );
};

export default BillDetails;
