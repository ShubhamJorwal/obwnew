import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./addcustomer.scss";
import { Link, useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");
  const [gst, setGst] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const Navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    const customerData = {
      first_name: firstName,
      last_name: lastName,
      contact_no: contactNo,
      gender,
      age,
      gst,
      customer_type: customerType,
    };

    try {
      const response = await fetch(
        "https://admin.obwsalon.com/api/create/customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(customerData),
        }
      );

      if (response.ok) {
        // Customer created successfully
        setMessage("Customer created successfully!");
        setError(null);
      } else {
        // Handle error case
        setMessage(null);
        setError("Failed to add customer");
      }
    } catch (error) {
      setMessage(null);
      setError("Error occurred");
      console.error("Error:", error);
    }
  };
  const goToPreviousPage = () => {
    Navigate("/customers");
  };
  return (
    <div id="Addcustomerdat">
      <div style={{ marginBottom: "3rem" }} id="TopHeader">
        <div id="backbtn" onClick={goToPreviousPage}>
          <AiOutlineArrowLeft />
        </div>
        <h1>ADD CUSTOMER</h1>
        <div id="lastRes"></div>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div id="fisrlastnameadd">
          <input
            style={{ marginRight: "1rem" }}
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
          <input
            style={{ marginLeft: "1rem" }}
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </div>
        <div id="genderselector">
          <label htmlFor="casual">Gender</label>
          <label>
            <input
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={() => setGender("Male")}
              placeholder="Gender"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={() => setGender("Female")}
            />
            Female
          </label>
        </div>
        <div id="rowofcontageaddda">
          <input
            type="number"
            id="contact-no"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
            placeholder="Contact No"
          />
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="Age"
          />
        </div>

        <div id="gstandtypeadd">
          <input
            type="text"
            id="gst"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            // required
            placeholder="GST"
          />
          <input
            type="text"
            id="customer-type"
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)}
            // required
            placeholder="Customer Type"
          />
        </div>

        <button className="lastbtnaddcustom" id="secondbtn" type="submit">
          Add
        </button>
      </form>

      <div id="finalresstatus">
        {message && (
          <div className="success_message">
            {" "}
            <svg
              id="successAnimation"
              className="animated"
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 70 70"
            >
              <svg
                id="successAnimation"
                class="animated"
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 70 70"
              >
                <path
                  id="successAnimationResult"
                  fill="#D8D8D8"
                  d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"
                />
                <circle
                  id="successAnimationCircle"
                  cx="35"
                  cy="35"
                  r="24"
                  stroke="#979797"
                  stroke-width="2"
                  stroke-linecap="round"
                  fill="transparent"
                />
                <polyline
                  id="successAnimationCheck"
                  stroke="#979797"
                  stroke-width="2"
                  points="23 34 34 43 47 27"
                  fill="transparent"
                />
              </svg>
            </svg>
            {message}
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default AddCustomer;
