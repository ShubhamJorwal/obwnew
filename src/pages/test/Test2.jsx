// // import { useState, useEffect } from 'react';

// // const MyComponent = () => {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     // Fetch data from local storage
// //     const storedData = JSON.parse(localStorage.getItem('selectedProducts')) || [];
// //     setData(storedData);
// //   }, []);

// //   const handleSetDiscount = (index, discount) => {
// //     const updatedData = [...data];
// //     updatedData[index].discount = discount;
// //     setData(updatedData);
// //     localStorage.setItem('selectedProducts', JSON.stringify(updatedData));
// //   };

// //   return (
// //     <div>
// //       {data.map((item, index) => (
// //         <div key={item.id}>
// //           <p>Product Name: {item.product_name}</p>
// //           <p>Discount: {item.discount}</p>
// //           <p>Selected Stylist: {item.selectedStylist}</p>
// //           <button onClick={() => handleSetDiscount(index, '10%')}>10%</button>
// //           <button onClick={() => handleSetDiscount(index, '15%')}>15%</button>
// //           <button onClick={() => handleSetDiscount(index, '18%')}>18%</button>
// //           <button onClick={() => handleSetDiscount(index, '20%')}>20%</button>
// //           <hr />
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default MyComponent;

// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const MyComponent = () => {
// //   const [services, setServices] = useState([]);
// //   const [stylists, setStylists] = useState([]);
// //   const [selectedStylist, setSelectedStylist] = useState(null);
// //   const token = localStorage.getItem('token');

// //   useEffect(() => {
// //     // Fetch services from API
// //     axios.get('https://admin.obwsalon.com/api/services', {
// //       headers: {
// //         'Authorization': `Bearer ${token}`
// //       }
// //     })
// //       .then(response => {
// //         setServices(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching services:', error);
// //       });

// //     // Fetch stylists from API
// //     axios.get('https://admin.obwsalon.com/api/stylists', {
// //       headers: {
// //         'Authorization': `Bearer ${token}`
// //       }
// //     })
// //       .then(response => {
// //         setStylists(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching stylists:', error);
// //       });
// //   }, [token]);

// //   const handleStylistSelect = (stylist) => {
// //     setSelectedStylist(stylist);

// //     // Update stylistName field in services and save to local storage
// //     const updatedServices = services.map(service => {
// //       return {
// //         ...service,
// //         stylistName: stylist.name
// //       };
// //     });

// //     // Update selected stylist ID in services
// //     const updatedServicesWithStylist = updatedServices.map(service => {
// //       return {
// //         ...service,
// //         selectedStylist: stylist.id
// //       };
// //     });

// //     // Save updated services with stylist data to local storage
// //     localStorage.setItem('serviceswithstylist', JSON.stringify(updatedServicesWithStylist));
// //   };

// //   return (
// //     <div>
// //       {services.map(service => (
// //         <div key={service.id}>
// //           <h3>{service.name}</h3>
// //           <p>Stylist: {service.stylistName || 'No stylist assigned'}</p>
// //           {stylists.map(stylist => (
// //             <div key={stylist.id}>
// //               <h4>{stylist.name}</h4>
// //               <button onClick={() => handleStylistSelect(stylist)}>
// //                 Select
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default MyComponent;

// import React, { Component } from 'react';
// import axios from 'axios';

// class SubservicesComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       subservices: [],
//       stylistList: [],
//       showStylistList: false
//     };
//   }

//   componentDidMount() {
//     // Fetch the subservices from localStorage
//     const subservices = JSON.parse(localStorage.getItem('SelectedData '));

//     // Fetch the stylist list from the API using axios
//     axios.get('https://admin.obwsalon.com/api/stylists', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//       .then(response => {
//         const stylistList = response.data;

//         // Update the component state with subservices and stylist list
//         this.setState({ subservices, stylistList });
//       })
//       .catch(error => {
//         // Handle error
//         console.error('Error fetching stylist list:', error);
//       });
//   }

//   selectStylist(subserviceIndex, stylistId) {
//     const { subservices } = this.state;
//     const updatedSubservices = [...subservices];

//     // Replace the stylist value for the selected subservice
//     updatedSubservices[subserviceIndex].stylist = stylistId;

//     // Update the subservices in localStorage
//     localStorage.setItem('SelectedData ', JSON.stringify(updatedSubservices));

//     // Hide the stylist list
//     this.setState({ showStylistList: false, subservices: updatedSubservices });
//   }

//   render() {
//     const { subservices, stylistList, showStylistList } = this.state;

//     return (
//       <div>
//         {subservices.map((subservice, index) => (
//           <div key={index}>
//             <p>{subservice.service.service_name}</p>

//             {/* Display the stylist selection */}
//             <p>
//               Selected Stylist: {subservice.stylist || 'No stylist selected'}
//             </p>

//             {/* Add stylist button */}
//             <button
//               onClick={() => this.setState({ showStylistList: index })}
//             >
//               Add Stylist
//             </button>
//           </div>
//         ))}

//         {showStylistList !== false && (
//           <div>
//             {/* Display the stylist list */}
//             {stylistList.map(stylist => (
//               <div key={stylist.id}>
//                 <p>{stylist.name}</p>

//                 {/* Select stylist button */}
//                 <button
//                   onClick={() =>
//                     this.selectStylist(showStylistList, stylist.id)
//                   }
//                 >
//                   Select Stylist
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default SubservicesComponent;


import React, { useEffect, useState } from "react";
import axios from "axios";

const NewAppointment = () => {
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
          total: parseFloat(subservice?.price_including_gst) || 0,
          stylist_id: subservice?.stylist_id || 0,
        };

        services.push(service);
      });
    });

    selectedProducts?.forEach((product) => {
      const service = {
        service_name: product?.product_name || "Unknown Product",
        qty: product?.quantity || 0,
        price: parseFloat(product?.price) || 0,
        total: parseFloat(product?.price) || 0,
        stylist_id: 0, // Assuming no stylist is associated with the product
      };

      services.push(service);
    });

    const appointmentData = {
      appointment_id: appointmentId,
      status: "Confirmed",
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

  return (
    <div>
      {bookingStatus === "success" && <div>Your appointment is booked.</div>}
      {bookingStatus === "error" && (
        <div>Something went wrong. Please try again.</div>
      )}
    </div>
  );
};

export default NewAppointment;

