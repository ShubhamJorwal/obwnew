import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BillDetails = () => {
  const { billId } = useParams();
  const [billDetails, setBillDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const token = localStorage.getItem("token");

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
  return (
    <div>
      <div style={{ marginBottom: "3rem" }} id="TopHeader">
        <div id="backbtn" onClick={goToPreviousPage}>
          <AiOutlineArrowLeft />
        </div>
        <h1>Bill</h1>
        <div id="lastRes"></div>
      </div>
      <div id="topdetailsbilldetai">
        <h2>Customer</h2>
        <div>
          <p>Customer ID: {customerDetails.customer_id}</p>
          <p>First Name: {customerDetails.first_name}</p>
          <p>Last Name: {customerDetails.last_name}</p>
          <p>Gender: {customerDetails.gender}</p>
        </div>
        {/* Display other customer details */}
      </div>
      <div id="">
        <h2>Customer</h2>
        <p>{billDetails.bill_id}</p>
        <p>{billDetails.date}</p>
        <p>{billDetails.total}</p>
        {/* Display other bill details */}
      </div>
    </div>
  );
};

export default BillDetails;
