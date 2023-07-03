import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stylistlist.scss";
import { Link } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineContentCut } from "react-icons/md";

const StylistList = () => {
  const [stylists, setStylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStylist, setSelectedStylist] = useState(null);

  useEffect(() => {
    // Fetch stylists data using Axios
    const token = localStorage.getItem("token");
    const fetchStylists = async () => {
      try {
        const response = await axios.get(
          "https://admin.obwsalon.com/api/stylists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStylists(response.data);
      } catch (error) {
        console.error("Error fetching stylists:", error);
      }
    };

    fetchStylists();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStylistClick = (stylist) => {
    setSelectedStylist(stylist);
  };

  const filteredStylists = stylists.filter(
    (stylist) =>
      stylist.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stylist.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stylist.phone_number.includes(searchTerm)
  );

  return (
    <div>
      <div id="stylistpage">
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
      <input
        id="searchstylistbar"
        type="text"
        placeholder="Search stylist..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul id="ulofstylsitlist">
        {filteredStylists.map((stylist) => (
          <div id="boxstylsitlist">
            <img src="https://www.anoos.com/assets/img/men.jpg" alt="" />
            <div id="secstylsit">
              <li
                id="firstLiofstylist"
                key={stylist.id}
                onClick={() => handleStylistClick(stylist)}
              >
                {stylist.first_name} {stylist.last_name}
              </li>
              <li id="secondstLiofstylist">
                <p style={{flexBasis:"45%", textAlign:"left"}}>Experience - {stylist.experience}</p>
                <p style={{flexBasis:"35%"}}>{stylist.phone_number}</p> 
                <p style={{flexBasis:"20%"}}>{stylist.gender}</p>
              </li>
            </div>
          </div>
        ))}
      </ul>

      {selectedStylist && (
        <div id="selectedstylsitstylistlsit">
          {/* <h2>
            {selectedStylist.first_name} {selectedStylist.last_name}
          </h2>
          <p>Contact: {selectedStylist.phone_number}</p>
          <p>Experience: {selectedStylist.experience}</p> */}
        </div>
      )}
      
    </div>
  );
};

export default StylistList;
