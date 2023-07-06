// import React, { useEffect, useState } from "react";
// import { FiX } from "react-icons/fi";
// import "./loginAppointment.scss";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import {
//   fetchCustomers,
//   clearErrors,
// } from "../../../../../redux/Actions/CustomerAction";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";

// const Login = () => {
//   const dispatch = useDispatch();
//   const { customers, loading, error } = useSelector((state) => state.customers);

//   const [showDiv, setShowDiv] = useState(false);
//   const [searchInput, setSearchInput] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedValue, setSelectedValue] = useState("");

//   const [nameInput, setNameInput] = useState("");
//   const [phoneNumberInput, setPhoneNumberInput] = useState("");
//   const [dateTimeInput, setDateTimeInput] = useState(new Date());
//   const [timeInput, setTimeInput] = useState("00:00");

//   const handleNameChange = (e) => {
//     setNameInput(e.target.value);
//     filterSuggestions(e.target.value);
//   };

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumberInput(e.target.value);
//     filterSuggestions(e.target.value);
//   };

//   const handleDateTimeChange = (date) => {
//     setDateTimeInput(date);
//   };

//   const handleTimeChange = (time) => {
//     setTimeInput(time);
//   };

//   const Navigate = useNavigate();

//   useEffect(() => {
//     setShowDiv(true);
//     dispatch(fetchCustomers());
//     return () => {
//       dispatch(clearErrors());
//     };
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     setSearchInput(e.target.value);
//     filterSuggestions(e.target.value);
//   };

//   const filterSuggestions = (input) => {
//     if (customers && input) {
//       const filteredSuggestions = customers.filter(
//         (suggest) =>
//           suggest.first_name.toLowerCase().includes(input.toLowerCase()) ||
//           suggest.contact_no.includes(input)
//       );

//       const limitedSuggestions = filteredSuggestions.slice(0, 4);

//       setSuggestions(limitedSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionClick = (value) => {
//     const suggestion = suggestions.find(
//       (suggest) =>
//         suggest.first_name === value || suggest.contact_no === value
//     );

//     if (suggestion) {
//       setNameInput(suggestion.first_name);
//       setPhoneNumberInput(suggestion.contact_no);
//     }

//     setSuggestions([]);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Prepare the data object
//       const data = {
//         customer_id: selectedValue,
//         name: nameInput,
//         contact_no: phoneNumberInput,
//         date: dateTimeInput.toLocaleDateString(),
//         time: timeInput,
//       };

//       // Make the POST request
//       const response = await axios.post(
//         "https://admin.obwsaloon.com/create/appointment",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       // Handle the response as needed
//       console.log("Appointment created successfully:", response.data);

//       // Redirect to the dashboard or perform any other action
//       Navigate("/dashboard");
//     } catch (error) {
//       console.log("Error creating appointment:", error);
//       // Handle the error as needed
//     }
//   };

//   const handleCrossClick = () => {
//     setShowDiv(false);
//   };

//   useEffect(() => {
//     if (error) {
//       // Display an alert with the error message
//       toast(`Error: ${error}`);
//     }
//   }, [error]);

//   return (
//     <div className="App">
//       <div className={`overlay ${showDiv ? "show" : ""}`}>
//         <div className="content">
//           <div id="suggestionsBox">
//             <h2>Submit Details</h2>
//             <input
//               className="namecontcidapt"
//               placeholder="Name"
//               type="text"
//               value={nameInput}
//               onChange={handleNameChange}
//             />

//             <input
//               className="namecontcidapt"
//               placeholder="Phone Number"
//               type="text"
//               value={phoneNumberInput}
//               onChange={handlePhoneNumberChange}
//             />

//             <div id="newTmepickers">
//               <DatePicker
//                 selected={dateTimeInput}
//                 onChange={handleDateTimeChange}
//                 dateFormat="MM/dd/yyyy"
//               />
//               <div style={{ marginLeft: "1rem" }} id="newTimepickers01">
//                 <TimePicker
//                   className="time-input"
//                   value={timeInput}
//                   onChange={handleTimeChange}
//                   format="h:mm a"
//                   disableClock={true}
//                 />
//               </div>
//             </div>

//             {suggestions.length > 0 && (
//               <ul className="suggestions">
//                 {suggestions.map((suggestion) => (
//                   <li
//                     key={suggestion.id}
//                     className="suggestion-item"
//                     onClick={() =>
//                       handleSuggestionClick(
//                         suggestion.first_name || suggestion.contact_no
//                       )
//                     }
//                   >
//                     {suggestion.first_name} - {suggestion.contact_no}
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <button id="idforaptpage" type="submit" onClick={handleSubmit}>
//               Submit
//             </button>
//           </div>
//           <button className="cross-button" onClick={handleCrossClick}>
//             <FiX />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import "./loginAppointment.scss";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";

// function Login() {
//   const [name, setName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showSecondForm, setShowSecondForm] = useState(false);
//   const [dateTimeInput, setDateTimeInput] = useState(new Date());
//   const [timeInput, setTimeInput] = useState("10:00 AM");

//   const token = localStorage.getItem("token");
//   const Navigate = useNavigate();

//   useEffect(() => {
//     const UserAppointmentData = localStorage.getItem("UserAppointmentData");
//     if (UserAppointmentData) {
//       Navigate("/create/appointment");
//     }
//   }, [Navigate]);

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         const response = await fetch(
//           "https://admin.obwsalon.com/api/customers",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setSuggestions(data);
//         } else {
//           console.error("Failed to fetch customer data");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchCustomerData();
//   }, [token]);

//   const handleNameChange = (event) => {
//     const input = event.target.value;
//     setName(input);
//     filterSuggestions(input);
//   };

//   const handlePhoneNumberChange = (event) => {
//     const input = event.target.value;
//     setPhoneNumber(input);
//     filterSuggestions(input);
//   };

//   const filterSuggestions = (input) => {
//     const filteredSuggestions = suggestions.filter(
//       (customer) =>
//         (customer.first_name &&
//           customer.first_name.toLowerCase().startsWith(input.toLowerCase())) ||
//         customer.contact_no.startsWith(input)
//     );
//     setFilteredSuggestions(filteredSuggestions.slice(0, 5));
//   };

//   const handleSuggestionClick = (customer) => {
//     setSelectedCustomer(customer);
//     setName(customer.first_name);
//     setPhoneNumber(customer.contact_no);
//     setFilteredSuggestions([]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!selectedCustomer) {
//       setErrorMessage("No details found. Please create an account first.");
//       return;
//     }

//     try {
//       const appointmentData = {
//         customer_id: selectedCustomer.id,
//         appointment_date: dateTimeInput.toISOString().slice(0, 10),
//         appointment_time: timeInput,
//         status: "Not Assigned",
//       };

//       // Make POST request to the API
//       const response = await axios.post(
//         "https://admin.obwsalon.com/api/create/appointments",
//         appointmentData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         // Appointment created successfully
//         console.log("Appointment created!");
//       } else {
//         // Handle error response
//         console.error("Failed to create appointment");
//       }
//     } catch (error) {
//       console.error("An error occurred while creating the appointment:", error);
//     }

//     // Save user appointment data to localStorage
//     localStorage.setItem(
//       "UserAppointmentData",
//       JSON.stringify(selectedCustomer)
//     );

//     // Reset form fields
//     setName("");
//     setPhoneNumber("");
//     setSelectedCustomer(null);
//     setErrorMessage("");
//     Navigate("/create/appointment");
//   };

//   const handleShowSecondForm = () => {
//     setShowSecondForm(true);
//   };

//   const handleBackButtonClick = () => {
//     setShowSecondForm(false);
//     setErrorMessage("");
//   };

//   const handleCreateCustomer = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(
//         "https://admin.obwsalon.com/api/create/customer",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             first_name: name,
//             contact_no: phoneNumber,
//           }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setSelectedCustomer(data);
//       } else {
//         console.error("Failed to create customer");
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     // Navigate("/appointment");
//   };

//   if (showSecondForm) {
//     return (
//       <>
//         <div id="backgroundblackcol"></div>

//         <div class="animation-container">
//           <div class="animation-element">
//             <div id="StartBook">
//               <div id="suggestionsBox">
//                 <h2>CREATE NEW CUSTOMER</h2>
//                 <form onSubmit={handleCreateCustomer}>
//                   <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={handleNameChange}
//                     placeholder="Name"
//                   />
//                   <input
//                     type="text"
//                     id="phoneNumber"
//                     value={phoneNumber}
//                     onChange={handlePhoneNumberChange}
//                     placeholder="Mobile Number"
//                   />
//                   <button type="submit">Create</button>
//                   <p id="orbackfcre">or</p>
//                   <button type="button" onClick={handleBackButtonClick}>
//                     Back
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div id="backgroundblackcol"></div>
//       <div class="animation-container">
//         <div class="animation-element">
//           <div id="StartBook">
//             <div id="suggestionsBox">
//               <h2>ENTER DETAILS</h2>
//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   id="name"
//                   value={name}
//                   onChange={handleNameChange}
//                   placeholder="Name"
//                 />
//                 <input
//                   type="text"
//                   id="phoneNumber"
//                   value={phoneNumber}
//                   onChange={handlePhoneNumberChange}
//                   placeholder="Mobile Number"
//                 />
//                 <div id="newTmepickers">
//                   <DatePicker
//                     selected={dateTimeInput}
//                     onChange={setDateTimeInput}
//                     dateFormat="MM/dd/yyyy"
//                   />
//                   <div style={{ marginLeft: "1rem" }} id="newTimepickers01">
//                     <TimePicker
//                       className="time-input"
//                       value={timeInput}
//                       onChange={setTimeInput}
//                       format="h:mm a"
//                       disableClock={true}
//                     />
//                   </div>
//                 </div>
//                 <button type="submit">Submit</button>

//                 {filteredSuggestions.length > 0 && (
//                   <ul>
//                     {filteredSuggestions.map((customer) => (
//                       <span key={customer.id}>
//                         <li onClick={() => handleSuggestionClick(customer)}>
//                           {customer.first_name} - {customer.contact_no}
//                         </li>
//                       </span>
//                     ))}
//                   </ul>
//                 )}
//               </form>
//             </div>
//             <div id="error_message">
//               {errorMessage && <p>{errorMessage}</p>}
//             </div>
//             <div id="newusercreate">
//               <p>Not account yet? </p>
//             </div>
//             <div id="SignUp">
//               <button type="button" onClick={handleShowSecondForm}>
//                 Create New Customer
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./loginAppointment.scss";

function AppointmentForm() {
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

export default AppointmentForm;
