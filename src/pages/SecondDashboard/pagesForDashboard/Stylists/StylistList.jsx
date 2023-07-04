import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stylistlist.scss";
import { Link, useNavigate } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineContentCut } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";

const StylistList = () => {
  const Navigate = useNavigate();

  const [stylists, setStylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [bookings, setBookings] = useState([]);
  
  const [isDivVisible, setIsDivVisible] = useState(true);

  useEffect(() => {
    // Fetch stylists data using Axios
    const fetchStylists = async () => {
      try {
        const token = localStorage.getItem("token");
        const branchId = localStorage.getItem("branchName");
        const response = await axios.get(
          "https://admin.obwsalon.com/api/stylists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredData = response.data.filter(
          (stylist) => stylist.branch_id === parseInt(branchId)
        );

        console.log(filteredData);
        setStylists(filteredData);
      } catch (error) {
        console.error("Error fetching stylists:", error);
      }
    };

    fetchStylists();
  }, []);

  useEffect(() => {
    // Fetch bookings for selected stylist
    
    const fetchStylistBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const branchId = localStorage.getItem("branchName");
        const response = await axios.get(
          "https://admin.obwsalon.com/api/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredBookings = response.data.filter(
          (booking) => booking.stylist_id === selectedStylist.id
        );
        console.log(filteredBookings);
        setBookings(filteredBookings);
        
    setIsDivVisible(false);
      } catch (error) {
        console.error("Error fetching stylist bookings:", error);
      }
    };

    if (selectedStylist) {
      fetchStylistBookings();
    }
  }, [selectedStylist]);

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

  // show stylist details
  const goToPreviousPage = () => {
    Navigate("/stylist");
    location.reload();
  };
  return (
    <div>
           {isDivVisible && ( <>
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
          <div
            id="boxstylsitlist"
            key={stylist.id}
            onClick={() => handleStylistClick(stylist)}
            className={selectedStylist === stylist ? "selecteddas" : ""}
          >
            <img src="https://www.anoos.com/assets/img/men.jpg" alt="" />
            <div id="secstylsit">
              <li id="firstLiofstylist">
                {stylist.first_name} {stylist.last_name}
              </li>
              <li id="secondstLiofstylist">
                <p style={{ flexBasis: "45%", textAlign: "left" }}>
                  Experience - {stylist.experience}
                </p>
                <p style={{ flexBasis: "35%" }}>{stylist.phone_number}</p>
                <p style={{ flexBasis: "20%" }}>{stylist.gender}</p>
              </li>
            </div>
          </div>
        ))}
      </ul></>
)}
      {selectedStylist && (
        <div id="selectedstylsitstylistlsit">
          <div id="TopHeader">
            <div id="backbtn" onClick={goToPreviousPage}>
              <AiOutlineArrowLeft />
            </div>
            <h1>Stylist Details</h1>
            <div id="lastRes"></div>
          </div>
          <div id="topdataforstyde">
            <div id="secondstylili">
              <p>
                {selectedStylist.first_name} {selectedStylist.last_name}
              </p>
              <p>{selectedStylist.gender}</p>
              <p>Exp : {selectedStylist.experience}</p>
              <p>{selectedStylist.phone_number}</p>
            </div>
            <div id="bookingsbyeachstylist">
              <h1>Bookings</h1>
              <div id="headstylsit">
                <p style={{ flexBasis: "25%" }}>Date</p>
                <p style={{ flexBasis: "35%" }}>Name</p>
                <p style={{ flexBasis: "20%" }}>Bill No</p>
                <p style={{ flexBasis: "20%" }}>Amount</p>
              </div>
            </div>
            <div id="bookingsofthatstylist">
              {bookings.map((booking) => (
                <div id="bookingrowstylistid" key={booking.id}>
                  {/* <div id="bookingrowstylistid">
                  <p>0.00.0000</p>
                  <p>Lorem Ipsum</p>
                  <p>Lorem Ipsum</p>
                  <p>₹ 00000000</p>
                </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StylistList;
