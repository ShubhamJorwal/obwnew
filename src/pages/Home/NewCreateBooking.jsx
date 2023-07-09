import React, { useEffect, useState } from "react";
import "./createbooking.scss";
import { useNavigate } from "react-router-dom";

function UserEndBooking() {
  const {id} = useParams()
  const Navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const handleBooking = () => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      const userBookingData = JSON.parse(localStorage.getItem("UserBookingData"));

      if (!userBookingData || !userBookingData.customer || !userBookingData.customer.id) {
        setErrorMessage("Something Went Wrong");
        return;
      }

      const id  = userBookingData.customer.id;
      const branch_id = JSON.parse(localStorage.getItem("branchName"));
      
      console.log(id, 'id from local storage');
      const existingData = localStorage.getItem("SelectedData");
      const product = localStorage.getItem("selectedProducts");
      let allSubServices = [];
  
      const ServicesTotalprice = localStorage.getItem("TotalAmountBookOFser");
      const ProductsTotalprice = localStorage.getItem("TotalAmountBook");
  
      const num1 = parseInt(ServicesTotalprice);
      const num2 = parseInt(ProductsTotalprice);
      const totalAmou = num1 + num2;
      let subtotal = null;

      if (existingData) {
        const dataArray = JSON.parse(existingData);
        const productArr = product ? JSON.parse(product) : null;
        const allservicesarray = [];

        dataArray.forEach((item) => {
          item.subServices.forEach((subService) => {
            allservicesarray.push(subService);
          });
        });
      
        console.log(productArr, 'product');
        const subserviceArr = allservicesarray.map(obj => ({
          service_name: obj.service_name,
          qty: obj.quantity,
          price: obj.price_including_gst,
          gst: obj.gst,
          total: obj.price_including_gst*obj.quantity,
          stylist_id: obj.stylist_info ? obj.stylist_info.id : null,
          date: null,
          type: "service"
        }));
        

        if (productArr) {
          console.log(productArr, "product");
          const Allproducts = productArr.map(obj => ({
            service_name: obj.product_name,
            qty: obj.selectedQuantity,
            price: obj.amount_with_gst,
            gst: obj.gst,
            total: obj.amount_with_gst*obj.selectedQuantity,
            stylist_id: obj.stylist_info ? obj.stylist_info.id : null,
            date: null,
            type: "product"
          }));

          const servideDataTobeposted = [...subserviceArr, ...Allproducts];
          allSubServices = servideDataTobeposted;
          subtotal = (
            productArr.reduce(
              (total, product) =>
                total +
                product.amount_with_gst *
                  product.selectedQuantity *
                  (product.gst / 100),
              0
            ) +
            allservicesarray.reduce(
              (total, subService) =>
                total +
                subService.price_including_gst *
                  subService.quantity *
                  (subService.gst / 100),
              0
            )
          ).toFixed(2);
        } else {
          allSubServices = subserviceArr;
        }
      }

      // Create the booking data
      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
      const bookingData = {
        branch_id: branch_id,
        customer_id: id,
        sub_total: totalAmou - subtotal,
        discount: null,
        total: totalAmou,
        status: "pending",
        date: currentDate,
        services: allSubServices,
      };
      console.log(bookingData, 'posted data');
  
      // Send the POST request to the API
      fetch("https://admin.obwsalon.com/api/create/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Booking failed. Please try again."); // Throw an error if the response is not successful
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response data as needed
          // console.log(data);

          setTimeout(() => {
            // Navigate("/services/women");
          }, 3000);
        })
        .catch((error) => {
          // Handle any errors
          setErrorMessage(error.message);
          console.error(error);
        });
    };
  
    const removeItem = () => {
      localStorage.removeItem("UserBookingData");
      localStorage.removeItem("selectedProducts");
      localStorage.removeItem("SelectedData");
      localStorage.removeItem("selectedStylist");
      localStorage.removeItem("selectedStylist");
      localStorage.removeItem("TotalAmountBookOFser");
      localStorage.removeItem("TotalAmountBook");
    };
  
    handleBooking();
    removeItem();

  }, []);
  
  // Clear session history
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };

  const handleGoHome = () => {
    // Implement the logic to navigate back to the home page
    localStorage.removeItem("UserBookingData");
    localStorage.removeItem("selectedProducts");
    localStorage.removeItem("SelectedData");
    localStorage.removeItem("selectedStylist");
    localStorage.removeItem("selectedStylist");
    localStorage.removeItem("TotalAmountBookOFser");
    localStorage.removeItem("TotalAmountBook");
    Navigate("/services/women");
  };

  return (
    <div id="createuseendbook">
      {errorMessage ? (
        <div id="concreabook">
          <p>{errorMessage}</p>
          <button style={{ margin: "1rem 0" }} id="firstbtn" onClick={handleGoHome}>Try Again</button>
        </div>
      ) : (
        <div id="concreabook">
<svg
            id="successAnimation"
            className="animated"
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 70 70"
          
          >
                <svg id="successAnimation" class="animated" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
  <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
  <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="transparent"/>
  <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent"/>
</svg>
          </svg>
          <p>Booking created successfully</p>
          {/* <button style={{ margin: "1rem 0" }} id="firstbtn" onClick={handleGoHome}>Book Again</button> */}
        </div>
      )}
    </div>
  );
}

export default UserEndBooking;



























