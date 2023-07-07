// import React, { useState, useEffect } from "react";
// import "./dashboard.scss";
// import { CiCalendarDate } from "react-icons/ci";
// import { IoCheckmarkDoneSharp } from "react-icons/io5";
// import { FaReceipt } from "react-icons/fa";
// import { IoCubeSharp } from "react-icons/io5";
// import { RiAccountCircleLine } from "react-icons/ri";
// import { MdOutlineContentCut } from "react-icons/md";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import SecondBtn from "../../../components/Buttons/SecondBtn";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { RxCross2 } from "react-icons/rx";

// const Dashboard = () => {
//   const [isDivVisible, setIsDivVisible] = useState(false);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const [selectedDate, setSelectedDate] = useState("");
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const currentYear = new Date().getFullYear();
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const handlePreviousMonth = () => {
//     setCurrentMonth((prevMonth) => prevMonth - 1);
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth((prevMonth) => prevMonth + 1);
//   };

//   const handleDateClick = (day) => {
//     setSelectedDate(day);
//     handleSubmit();
//   };

//   const renderCalendar = () => {
//     const daysInMonth = getDaysInMonth(currentMonth, currentYear);
//     const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
//     const weeks = Math.ceil((daysInMonth + firstDayIndex) / 7);

//     const calendar = [];

//     let dayCounter = 1;

//     for (let i = 0; i < weeks; i++) {
//       const week = [];

//       for (let j = 0; j < 7; j++) {
//         if ((i === 0 && j < firstDayIndex) || dayCounter > daysInMonth) {
//           week.push(<td key={`${i}-${j}`}></td>);
//         } else {
//           week.push(
//             <td
//               key={`${i}-${j}`}
//               onClick={() => handleDateClick(dayCounter)}
//               className={selectedDate === dayCounter ? "selected" : ""}
//             >
//               {dayCounter}
//             </td>
//           );
//           dayCounter++;
//         }
//       }

//       calendar.push(<tr key={i}>{week}</tr>);
//     }

//     return calendar;
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       // Fetch appointments
//       const appointmentsResponse = await axios.get(
//         "https://admin.obwsalon.com/api/appointments",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const allAppointments = appointmentsResponse.data;

//       // Filter appointments based on selected date
//       const filteredAppointments = allAppointments.filter((appointment) => {
//         const appointmentDate = new Date(appointment.appointment_date);
//         return (
//           appointmentDate.getDate() === selectedDate &&
//           appointmentDate.getMonth() === currentMonth &&
//           appointmentDate.getFullYear() === currentYear
//         );
//       });

//       console.log("Appointments for selected date:", filteredAppointments);

//       setAppointments(filteredAppointments);
//       setLoading(false);
//     } catch (error) {
//       console.log("Error fetching appointments:", error);
//       setLoading(false);
//     }
//     setIsDivVisible(true);

//     const targetDiv = document.getElementById("coverddiv");
//     targetDiv.classList.add("changebackgrounddark");

//     setSelectedDate(date); // Set the selected date
//   };

//   useEffect(() => {
//     // Fetch appointments data (replace with your own API endpoint)
//     const fetchAppointments = async () => {
//       try {
//         setLoading(true);

//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           "https://admin.obwsalon.com/api/appointments",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log(response.data);
//         setAppointments(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching appointments:", error);
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);
//   const handleBackClick = () => {
//     const targetDiv = document.getElementById("coverddiv");
//     targetDiv.classList.remove("changebackgrounddark");
//     setIsDivVisible(false);
//   };
//   return (
//     <>
//       <div id="dashboard">
//         <div id="topmegamenu">
//           <Link to={"/dashboard"} className="megamenuLinks" id="Option1">
//             <CiCalendarDate />
//             <p>Appointments</p>
//           </Link>
//           <Link to={"/bookings"} className="megamenuLinks" id="Option2">
//             <IoCheckmarkDoneSharp />
//             <p>Bookings</p>
//           </Link>
//           <Link to={"/bills"} className="megamenuLinks" id="Option3">
//             <FaReceipt />
//             <p>Bills</p>
//           </Link>
//           <Link to={"/products"} className="megamenuLinks" id="Option4">
//             <IoCubeSharp />
//             <p>Products</p>
//           </Link>
//           <Link to={"/customers"} className="megamenuLinks" id="Option5">
//             <RiAccountCircleLine />
//             <p>Customer</p>
//           </Link>
//           <Link to={"/stylist"} className="megamenuLinks" id="Option6">
//             <MdOutlineContentCut />

//             <p>Stylist</p>
//           </Link>
//         </div>
//       </div>

//       <div className="calendar">
//         <div className="month-navigation">
//           <button onClick={handlePreviousMonth}>
//             <AiOutlineArrowLeft />
//           </button>
//           <h2>{months[currentMonth]}</h2>
//           <button onClick={handleNextMonth}>
//             <AiOutlineArrowRight />
//           </button>
//         </div>
//         <table id="tableforcalender">
//           <thead>
//             <tr>
//               <th>Sun</th>
//               <th>Mon</th>
//               <th>Tue</th>
//               <th>Wed</th>
//               <th>Thu</th>
//               <th>Fri</th>
//               <th>Sat</th>
//             </tr>
//           </thead>
//           <tbody>{renderCalendar()}</tbody>
//         </table>
//       </div>

//       <div id="lastbtnfordashboard">
//         <Link to={"/create/appointment"}>
//           <SecondBtn title={"Create Appointment"} onClick={handleSubmit} />
//         </Link>
//       </div>
//       {isDivVisible && (
//         <div id="appoinmentsbydate">
//           {appointments.length === 0 ? (
//             <div id="content-to-display">
//               <div id="content-to-display02">
//                 <div></div>
//                 <div id="tophead">
//                   <h2>
//                     {selectedDate}-{currentMonth}
//                   </h2>
//                   <h3>Appointments</h3>
//                 </div>
//                 <button onClick={handleBackClick}>
//                   <RxCross2 size={"2rem"} color="red" />{" "}
//                 </button>
//               </div>
//               <div id="midcompline">
//                 <p>Name</p>
//                 <p>Phone Number</p>
//                 <p>Time</p>
//                 <p>Status</p>
//               </div>
//               <div id="insideDateofdash">
//                 <p>No appointments found for the selected date.</p>
//               </div>
//             </div>
//           ) : (
//             <div id="content-to-display">
//               <p>Appointments for selected date:</p>
//               <ul>
//                 {appointments.map((appointment) => (
//                   <li key={appointment.id}>{appointment.appointment_id}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//       <div id="coverddiv"></div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { CiCalendarDate } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineContentCut } from "react-icons/md";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import SecondBtn from "../../../components/Buttons/SecondBtn";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import Calendar from "react-calendar";

const Dashboard = () => {
  const Navigate = useNavigate();
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [Calandervalue, setCalandervalue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [displayDatanew, setdisplayDatanew] = useState([]);
  const [reloadtrigerr, setreloadtrigerr] = useState(false);
  const [badgearr, setbadgearr] = useState([]);

  const handleSubmit = async (date) => {
    console.log("====================================");
    console.log("submitt");
    console.log("====================================");
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // Fetch appointments
      const appointmentsResponse = await axios.get(
        "https://admin.obwsalon.com/api/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const allAppointments = appointmentsResponse.data;

      // Filter appointments based on selected date
      const filteredAppointments = allAppointments.filter((appointment) => {
        console.log(
          appointment.appointment_date,
          "app date",
          date,
          "selectedDate"
        );
        return appointment.appointment_date === date;
      });
      console.log(filteredAppointments, filteredAppointments);
      setAppointments(filteredAppointments);
      setreloadtrigerr((e) => !e);
    } catch (error) {
      console.log("Error fetching appointments:", error);

      setLoading(false);
    }
  };

  const handleBackClick = () => {
    setAppointments([]);
    setdisplayDatanew([]);
    setIsDivVisible(false);
    const targetDiv = document.getElementById("coverddiv");
    targetDiv.classList.remove("changebackgrounddark");
  };

  const convertDateFormat = (dateString) => {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = originalDate.getMonth() + 1;
    const day = originalDate.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    return formattedDate;
  };

  useEffect(() => {
    console.log("effect 2");
    const formateddate = convertDateFormat(Calandervalue);
    // console.log(formateddate,'fd');
    // setSelectedDate(convertDateFormat(Calandervalue));

    setAppointments([]);
    setdisplayDatanew([]);

    handleSubmit(formateddate);
    return () => {};
  }, [Calandervalue]);

  let hadledatepicked = (date) => {
    console.log(date, "date");

    setIsDivVisible(true);
    const targetDiv = document.getElementById("coverddiv");
    targetDiv.classList.add("changebackgrounddark");
    setCalandervalue(date);
  };

  useEffect(() => {
    console.log("effect3");
    const fetchData = async () => {
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
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setdisplayDatanew(
      appointments.map((appointment) => {
        const customer = customerData.find(
          (cust) => cust.id === appointment.customer_id
        );
        return {
          ...appointment,
          customer: customer ? { ...customer } : null,
        };
      })
    );
  }, [reloadtrigerr]);

  // new code

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch appointments
    const fetchData = async () => {
      try {
        const appointmentsResponse = await axios.get(
          "https://admin.obwsalon.com/api/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const apointentstobeextracedofdata = appointmentsResponse.data;
        const datesapp = extractDates(apointentstobeextracedofdata);
        setbadgearr(datesapp);

        console.log(datesapp, "dattaaa");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  function extractDates(appointments) {
    const dateMap = {};

    // // Count the occurrences of each date
    // appointments.forEach((appointment) => {
    //   const date = appointment.appointment_date;
    //   if (appointment.appointment_date) {
    //     const dateOnly = date.split("T")[0]; // Extract date without time
    //     dateMap[dateOnly] = dateMap[dateOnly] ? dateMap[dateOnly] + 1 : 1;
    //   }
    // });

    // Convert the dateMap into the desired format
    const result = Object.entries(dateMap).map(([date, number]) => ({
      date,
      number,
    }));

    return result;
  }

  const tileContent = ({ date }) => {
    const matchingDate = badgearr.find((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === date.getFullYear() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getDate() === date.getDate()
      );
    });

    if (matchingDate) {
      const { number } = matchingDate;
      return <sup className="badge_over_date">{number}</sup>;
    }

    return <div></div>;
  };

  const handleAppointmentClick = (appointmentId) => {
    // setSelectedAppointmentId(appointmentId);
    Navigate(`/saved/appointment/${appointmentId}`);
    setshowdiv(false);
    const clearLocalStorage = () => {
      localStorage.removeItem("TotalAmountBookOFser");
      localStorage.removeItem("appointmentData");
      localStorage.removeItem("responseData");
      localStorage.removeItem("selectedProducts");
      localStorage.removeItem("SelectedData");
      localStorage.removeItem("TotalAmountBook");
      localStorage.removeItem("selectedStylist");
      localStorage.removeItem("formData");
    };
    clearLocalStorage();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // new code end date superscript badge
  return (
    <>
      <div id="dashboard">
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

      <Calendar
        onClickDay={(e) => hadledatepicked(e)}
        value={Calandervalue}
        tileContent={tileContent}
      />

      <div id="lastbtnfordashboard">
        <Link to={"/create/appointment"}>
          <SecondBtn title={"Create Appointment"} onClick={handleSubmit} />
        </Link>
      </div>

      {isDivVisible && (
        <div id="appoinmentsbydate">
          <div id="content-to-display02">
            <div></div>
            <div id="tophead">
              <h2>{convertDateFormat(Calandervalue)}</h2>
              <h3>Appointments</h3>
            </div>
            <button onClick={handleBackClick}>
              <RxCross2 size={"2rem"} color="red" />{" "}
            </button>
          </div>
          {appointments.length === 0 ? (
            <div id="content-to-display">
              {/* <div id="content-to-display02"> */}
              {/* <div></div> */}
              {/* <div id="tophead"> */}
              {/* <h2>{convertDateFormat(Calandervalue)}</h2> */}
              {/* <h3>Appointments</h3> */}
              {/* </div> */}
              {/* </div> */}
              <div id="midcompline">
                <p style={{ flexBasis: "30%" }}>Name</p>
                <p style={{ flexBasis: "25%" }}>Phone Number</p>
                <p style={{ flexBasis: "19%" }}>Time</p>
                <p style={{ flexBasis: "26%" }}>Status</p>
              </div>
              <div id="insideDateofdash">
                <p>No appointments found for the selected date.</p>
              </div>
            </div>
          ) : (
            <div id="content-to-display">
              {" "}
              <div id="midcompline">
                <p style={{ flexBasis: "30%" }}>Name</p>
                <p style={{ flexBasis: "25%" }}>Phone Number</p>
                <p style={{ flexBasis: "19%" }}>Time</p>
                <p style={{ flexBasis: "26%" }}>Status</p>
              </div>
              {appointments.map((appointment, index) => (
                <div key={appointment.id} id="content-to-display">
                  <div
                    id="insideDateofdash"
                    onClick={() => handleAppointmentClick(appointment.id)}
                  >
                    <p style={{ flexBasis: "30%" }}>
                      {" "}
                      {displayDatanew[index]
                        ? displayDatanew[index].customer?.first_name +
                          " " +
                          displayDatanew[index].customer?.last_name
                        : "null"}
                    </p>
                    <p style={{ flexBasis: "25%" }}>
                      {displayDatanew[index]
                        ? displayDatanew[index].customer?.contact_no
                        : "null"}
                    </p>
                    <p style={{ flexBasis: "19%" }}>
                      {appointment.appointment_time}
                    </p>
                    <p style={{ flexBasis: "26%" }}>{appointment.status}</p>
                  </div>
                </div>
              ))}
              {/* <ul>
                {appointments.map((appointment,index) => (
                  <li key={appointment.id}>
                    {appointment.appointment_id}, <b>{appointment.appointment_date}</b>,
                    {appointment.status},
                    {displayDatanew[index]
                      ? displayDatanew[index].customer?.first_name + ' '+displayDatanew[index].customer?.last_name 
                      : 'null'}
                  </li>
                ))}
              </ul> */}
            </div>
          )}
        </div>
      )}
      <div id="coverddiv"></div>
    </>
  );
};

export default Dashboard;
