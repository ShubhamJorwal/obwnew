import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import './loginAppointment.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  
  const Navigate = useNavigate()
  useEffect(() => {
    setShowDiv(true);
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    filterSuggestions(e.target.value);
  };

  const filterSuggestions = (input) => {
    const mockSuggestions = [
      { id: 1, name: "John Doe", phoneNumber: "1234567890" },
      { id: 2, name: "Jane Smith", phoneNumber: "0987654321" },
      { id: 3, name: "Alice Johnson", phoneNumber: "5555555555" },
    ];

    const filteredSuggestions = mockSuggestions.filter(
      (suggest) =>
        suggest.name.toLowerCase().includes(input.toLowerCase()) ||
        suggest.phoneNumber.includes(input)
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (value) => {
    setSelectedValue(value);
    setSearchInput(value);
    setSuggestions([]);
  };

  const handleSubmit = () => {
    // Handle form submission
    // You can access the selectedValue or searchInput here
    Navigate('/dashboard')
  };

  const handleCrossClick = () => {
    setShowDiv(false);
  };

  return (
    <div className="App">
      <div className={`overlay ${showDiv ? 'show' : ''}`}>
        <div className="content">
          <div id="suggestionsBox">
            <h2>SELECT CUSTOMER</h2>
            <input
              placeholder="Name"
              type="text"
              value={searchInput}
              onChange={handleInputChange}
            />
            <input
              placeholder="Phone Number"
              type="text"
              value={searchInput}
              onChange={handleInputChange}
            />
            <input
              placeholder="Date & Time"
              type="text"
              value={searchInput}
              onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="suggestion-item"
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion.name || suggestion.phoneNumber
                      )
                    }
                  >
                    {suggestion.name} - {suggestion.phoneNumber}
                  </li>
                ))}
              </ul>
            )}
            <button type="submit" onClick={handleSubmit}>
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
