import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const StylistList = () => {
  const [stylists, setStylists] = useState([]);

  const [showDiv, setShowDiv] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await axios.get(
          "https://admin.obwsalon.com/api/stylists"
        );
        setStylists(response.data);
      } catch (error) {
        console.log("Error fetching stylists:", error);
      }
    };

    fetchStylists();
    setShowDiv(true);
  }, []);
  const handleCrossClick = () => {
    setIsSliderVisible(false);
  };

  return (
    <>
      {/* <h1>Stylist List</h1>
      <ul>
        {stylists.map((stylist) => (
          <li key={stylist.id}>
            <p>First Name: {stylist.first_name}</p>
            <p>Last Name: {stylist.last_name}</p>
            <p>Gender: {stylist.gender}</p>
            <p>Phone Number: {stylist.phone_number}</p>
            <p>Experience: {stylist.experience}</p>
            <p>Photo: {stylist.photo}</p>
          </li>
        ))}
      </ul> */}

      <div className={`overlay ${showDiv ? "show" : ""}`}>
        {/* Slider content */}
        <div className="content">
          <div className="service-details">
            <div id="topLayerForSerBook">
              <div id="middledataforserbook">
                <h1>Stylists</h1>
              </div>
              <div className="back-button" onClick={handleCrossClick}>
                <RxCross2 />
              </div>
            </div>

            {/* Self-coded */}
            <div id="middleFetchedData">
            {stylists.map((stylist) => (
          <li key={stylist.id}>
            <p>First Name: {stylist.first_name}</p>
            <p>Last Name: {stylist.last_name}</p>
            <p>Gender: {stylist.gender}</p>
            <p>Phone Number: {stylist.phone_number}</p>
            <p>Experience: {stylist.experience}</p>
            <p>Photo: {stylist.photo}</p>
          </li>
        ))}
            </div>
            <Link to="/checkout">Add Services</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StylistList;
