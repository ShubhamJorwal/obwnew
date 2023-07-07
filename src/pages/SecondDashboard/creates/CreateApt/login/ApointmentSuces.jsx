import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApointmentSuces = () => {
  const Navigate = useNavigate();
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = "https://admin.obwsalon.com/api/save/appointments";

    // Fetching appointment data from localStorage
    const responseData = JSON.parse(localStorage.getItem("responseData"));
    const appointmentId = responseData?.appointment?.id;

    // Fetching services data from localStorage
    const selectedData = JSON.parse(localStorage.getItem("SelectedData"));

    // Fetching products data from localStorage
    const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts"));

    const services = [];

    selectedData?.forEach((data) => {
      const subservices = data?.subServices || [];

      subservices?.forEach((subservice) => {
        const service = {
          service_name: subservice?.service_name || "Unknown Service",
          qty: subservice?.quantity || 0,
          price: parseFloat(subservice?.price_including_gst) || 0,
          total: parseFloat(subservice?.price_including_gst*subservice?.quantity || 0) || 0,
          stylist_id: subservice?.stylist_id || 0,
          type: "services",
          id: subservice?.id || 0
        };

        services.push(service);
      });
    });

    selectedProducts?.forEach((product) => {
      const service = {
        service_name: product?.product_name || "Unknown Product",
        qty: product?.selectedQuantity || 0,
        price: parseFloat(product?.amount_with_gst) || 0,
        total: parseFloat(product?.amount_with_gst*product?.selectedQuantity || 0,) || 0,
        stylist_id: 0, // Assuming no stylist is associated with the product
        type: "products",
        id: product?.id || 0
      };

      services.push(service);
    });

    const appointmentData = {
      appointment_id: appointmentId,
      status: "Not Assigned",
      services: services,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(apiUrl, appointmentData, { headers })
      .then((response) => {
        console.log("Appointment created successfully:", response.data);
        setBookingStatus("success");
        clearLocalStorage();
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
        setBookingStatus("error");
      });
      setTimeout(() => {
        Navigate("/dashboard");
      }, 3000);
    
  }, []);

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

  const handleGoHome = () => {
    Navigate("/dashboard")
  }
  return (
    <div>
      {bookingStatus === "success" && <div id="createuseendbook">
      <div id="concreabook">
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
        <p>Your Appointment is Booked</p>

        {/* <button style={{margin:"1rem 0"}} id="firstbtn" onClick={handleGoHome}>Book Again</button> */}
      </div>
    </div>}
      {bookingStatus === "error" && (
                 <div id="concreabook">
                 <button style={{margin:"1rem 0"}} id="firstbtn" onClick={handleGoHome}>Something went wrong. Please try again. Try Again</button>
               </div>
      )}
    </div>
  );
};
export default ApointmentSuces;































// import React, { useEffect, useState } from "react";
// // import "./createbooking.scss";
// import { useNavigate } from "react-router-dom";

// function ApointmentSuces() {
//   const Navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     const handleBooking = () => {
//       // Retrieve the token from localStorage
//       const token = localStorage.getItem("token");
//       const userBookingData = JSON.parse(localStorage.getItem("UserBookingData"));

//       if (!userBookingData || !userBookingData.customer || !userBookingData.customer.id) {
//         setErrorMessage("Something Went Wrong");
//         return;
//       }

//       const { id } = userBookingData.customer;


//       const existingData = localStorage.getItem("SelectedData");
//       let allSubServices = [];

//       const ServicesTotalprice = localStorage.getItem("TotalAmountBookOFser");
//       const ProductsTotalprice = localStorage.getItem("TotalAmountBook");

//       const num1 = parseInt(ServicesTotalprice);
//       const num2 = parseInt(ProductsTotalprice);
//       const totalAmou = num1 + num2;

//       if (existingData) {
//         const dataArray = JSON.parse(existingData);

//         allSubServices = dataArray.reduce((accumulator, item) => {
//           const subServices = item.subServices.map((subService) => ({
//             price: parseFloat(subService.price_including_gst),
//             qty: subService.quantity,
//             service_name: subService.service_name,
//             stylist_id: 1,
//             total: parseFloat(
//               subService.price_including_gst * subService.quantity
//             ),
//           }));

//           return [...accumulator, ...subServices];
//         }, []);
//       }

//       // Create the booking data
//       const bookingData = {
//         customer_id: id,
//         total_amount: totalAmou,
//         status: "pending",
//         date: "2023-06-16",
//         services: allSubServices,
//       };
//       console.log(bookingData)

//       // Send the POST request to the API
//       fetch("https://admin.obwsalon.com/api/create/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//         },
//         body: JSON.stringify(bookingData),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Booking failed. Please try again."); // Throw an error if the response is not successful
//           }
//           return response.json();
//         })
//         .then((data) => {
//           // Handle the response data as needed
//           // console.log(data);

//           setTimeout(() => {
//             Navigate("/dashboard");
//           }, 3000);
//         })
//         .catch((error) => {
//           // Handle any errors
//           setErrorMessage(error.message);
//           console.error(error);
//         });
//     };

//     const removeItem = () => {
//       localStorage.removeItem("UserBookingData");
//       localStorage.removeItem("selectedProducts");
//       localStorage.removeItem("SelectedData");
//       localStorage.removeItem("selectedStylist");
//       localStorage.removeItem("selectedStylist");
//       localStorage.removeItem("TotalAmountBookOFser");
//       localStorage.removeItem("TotalAmountBook");
//     };

//     handleBooking();
//     removeItem();


//   }, []);

//     // Clear session history
//     window.history.pushState(null, "", window.location.href);
//     window.onpopstate = function () {
//       window.history.go(1);
//     };
//   const handleGoHome = () => {
//     // Implement the logic to navigate back to the home page

//     localStorage.removeItem("UserBookingData");
//     localStorage.removeItem("selectedProducts");
//     localStorage.removeItem("SelectedData");
//     localStorage.removeItem("selectedStylist");
//     localStorage.removeItem("selectedStylist");
//     localStorage.removeItem("TotalAmountBookOFser");
//     localStorage.removeItem("TotalAmountBook");
//     Navigate("/services/women")
//   };

//   return (
//     <div id="createuseendbook">
//       {errorMessage ? (
//         <div id="concreabook">
//           <p>{errorMessage}</p>
//           <button style={{margin:"1rem 0"}} id="firstbtn" onClick={handleGoHome}>Try Again</button>
//         </div>
//       ) : (
//         <div id="concreabook">
//           <svg
//             id="successAnimation"
//             className="animated"
//             xmlns="http://www.w3.org/2000/svg"
//             width="70"
//             height="70"
//             viewBox="0 0 70 70"

//           >
//                 <svg id="successAnimation" class="animated" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
//   <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
//   <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="transparent"/>
//   <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent"/>
// </svg>
//           </svg>
//           <p>Your Appointment created successfully</p>


//           {/* <button style={{margin:"1rem 0"}} id="firstbtn" onClick={handleGoHome}>Book Again</button> */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ApointmentSuces;
