
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./createNewbook.scss";

function CreateNewBooking() {
  const Navigate = useNavigate()
  const [mobileNumber, setMobileNumber] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const fetchCustomerSuggestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://admin.obwsalon.com/api/customers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const customers = response.data;
          setSuggestions(customers);
        } else {
          console.error("Failed to fetch customer data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomerSuggestions();
  }, []);

  const handleMobileNumberChange = (event) => {
    const input = event.target.value;
    setMobileNumber(input);
    filterSuggestions(input);
  };

  const filterSuggestions = (input) => {
    const filteredSuggestions = suggestions.filter((customer) =>
      customer.contact_no.includes(input)
    );
    setFilteredSuggestions(filteredSuggestions.slice(0, 5));
  };

  const handleSuggestionClick = (customer) => {
    setSelectedCustomer(customer);
    setMobileNumber(customer.contact_no);
    setFilteredSuggestions([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedCustomer) {
      setErrorMessage(
        "No customer found. Please select from suggestions. Create new user"
      );
      // setErrorMessage("");
      return;
    }

    const token = localStorage.getItem("token");

    const customerId = selectedCustomer.id; // Get the customer ID from the "id" property

    const appointmentData = {
      customer_id: customerId, // Use the customer ID
      appointment_date: dateTime.slice(0, 10),
      appointment_time: dateTime.slice(11),
      status: "not assigned",
    };

    try {
      const response = await axios.post(
        "https://admin.obwsalon.com/api/create/appointments",
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      if (response.status === 200) {
        console.log("Appointment created successfully");
        // Store the response data in localStorage
        localStorage.setItem("responseData", JSON.stringify(response.data));
      } else {
        console.error("Failed to create appointment");
      }
    } catch (error) {
      console.error("An error occurred while creating the appointment:", error);
    }

    // Save form data and appointment data in localStorage
    localStorage.setItem(
      "formData",
      JSON.stringify({
        mobileNumber,
        firstName: selectedCustomer.first_name,
        lastName: selectedCustomer.last_name,
      })
    );
    localStorage.setItem("appointmentData", JSON.stringify(appointmentData));

    // Clear form fields
    setMobileNumber("");
    setSelectedCustomer(null);
    setErrorMessage("");
    
    // Navigate("/create/appointment/success");
    Navigate("/save/appointment/");
  };



  return (
    <>
      <div id="backgroundblackcol"></div>
      <div class="animation-container">
        <div class="animation-element">
          <div id="StartBook">
            <div
              id="suggestionsBox"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h2>ENTER DETAILS</h2>
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Mobile Number"
                  type="number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                />
                {filteredSuggestions.length > 0 && (
                  <ul style={{padding:"0.5rem"}}>
                    {filteredSuggestions.map((customer) => (
                      <li style={{padding:"1rem"}}
                        key={customer.customerId}
                        onClick={() => handleSuggestionClick(customer)}
                      >
                        {customer.contact_no} - {customer.first_name}{" "}
                        {customer.last_name}
                      </li>
                    ))}
                  </ul>
                )}

                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
                <br />
                <button type="submit">Submit</button>
              </form>
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
      <div id="fixedbtnforall">
        <Link to={"/add/customer"}>
          <button id="secondbtn">Create New Customer</button>
        </Link>
      </div>
      <div id="fixedbtnforall01">
        <Link to={"/dashboard"}>
          <button id="firstbtn"> <AiOutlineArrowLeft /> &nbsp; Back</button>
        </Link>
      </div>
    </>
  );
}

export default CreateNewBooking
