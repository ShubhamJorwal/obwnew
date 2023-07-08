import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const ConfCancBooking = () => {
    const { id } = useParams();
    const [bookingData, setBookingData] = useState(null);
  
    useEffect(() => {
      const fetchBookingData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `https://admin.obwsalon.com/api/booking/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setBookingData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchBookingData();
    }, [id]);
  return (
    <div>
       {bookingData && (
        <div>
          <p>Booking ID: {bookingData.bookings.booking_id}</p>
          <p>Status: {bookingData.bookings.status}</p>
          {/* Display other booking details as needed */}
          {/* Display the services */}
          {bookingData.services.map((service) => (
            <div key={service.id}>
              <p>Service Name: {service.service_name}</p>
              <p>Quantity: {service.qty}</p>
              <p>Price: {service.price}</p>
              {/* Display other service details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConfCancBooking
