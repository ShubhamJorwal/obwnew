import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "./loginAppointment.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  fetchCustomers,
  clearErrors,
} from "../../../redux/Actions/CustomerAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const Login = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);

  const [showDiv, setShowDiv] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const [nameInput, setNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState(new Date());   
  const [timeInput, setTimeInput] = useState("00:00");

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
    filterSuggestions(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumberInput(e.target.value);
    filterSuggestions(e.target.value);
  };

  const handleDateTimeChange = (date) => {
    setDateTimeInput(date);
  };

  const handleTimeChange = (time) => {
    setTimeInput(time);
  };

  const Navigate = useNavigate();

  useEffect(() => {
    setShowDiv(true);
    dispatch(fetchCustomers());
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    filterSuggestions(e.target.value);
  };

  const filterSuggestions = (input) => {
    if (customers && input) {
      const filteredSuggestions = customers.filter(
        (suggest) =>
          suggest.first_name.toLowerCase().includes(input.toLowerCase()) ||
          suggest.contact_no.includes(input)
      );

      const limitedSuggestions = filteredSuggestions.slice(0, 4);

      setSuggestions(limitedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value) => {
    const suggestion = suggestions.find(
      (suggest) =>
        suggest.first_name === value || suggest.contact_no === value
    );

    if (suggestion) {
      setNameInput(suggestion.first_name);
      setPhoneNumberInput(suggestion.contact_no);
    }

    setSuggestions([]);
  };

  const handleSubmit = async () => {
    try {
      // Prepare the data object
      const data = {
        customer_id: selectedValue,
        name: nameInput,
        contact_no: phoneNumberInput,
        date: dateTimeInput.toLocaleDateString(),
        time: timeInput,
      };

      // Make the POST request
      const response = await axios.post(
        "https://admin.obwsaloon.com/create/appointment",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Handle the response as needed
      console.log("Appointment created successfully:", response.data);

      // Redirect to the dashboard or perform any other action
      Navigate("/dashboard");
    } catch (error) {
      console.log("Error creating appointment:", error);
      // Handle the error as needed
    }
  };

  const handleCrossClick = () => {
    setShowDiv(false);
  };

  useEffect(() => {
    if (error) {
      // Display an alert with the error message
      toast(`Error: ${error}`);
    }
  }, [error]);

  return (
    <div className="App">
      <div className={`overlay ${showDiv ? "show" : ""}`}>
        <div className="content">
          <div id="suggestionsBox">
            <h2>Submit Details</h2>
            <input
              className="namecontcidapt"
              placeholder="Name"
              type="text"
              value={nameInput}
              onChange={handleNameChange}
            />

            <input
              className="namecontcidapt"
              placeholder="Phone Number"
              type="text"
              value={phoneNumberInput}
              onChange={handlePhoneNumberChange}
            />

            <div id="newTmepickers">
              <DatePicker
                selected={dateTimeInput}
                onChange={handleDateTimeChange}
                dateFormat="MM/dd/yyyy"
              />
              <div style={{ marginLeft: "1rem" }} id="newTimepickers01">
                <TimePicker
                  className="time-input"
                  value={timeInput}
                  onChange={handleTimeChange}
                  format="h:mm a"
                  disableClock={true}
                />
              </div>
            </div>

            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="suggestion-item"
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion.first_name || suggestion.contact_no
                      )
                    }
                  >
                    {suggestion.first_name} - {suggestion.contact_no}
                  </li>
                ))}
              </ul>
            )}
            <button id="idforaptpage" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <button className="cross-button" onClick={handleCrossClick}>
            <FiX />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
