import React, { useState } from 'react';
import './test.scss'

const Test = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://admin.obwsalon.com/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    filterAppointments(date);
  };

  const filterAppointments = (date) => {
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.date === date
    );
    setAppointments(filteredAppointments);
  };

  return (
    <div>
      <h2>Select a date:</h2>
      <button onClick={() => handleDateClick('2023-06-19')}>19th June</button>
      <button onClick={() => handleDateClick('2023-06-22')}>22nd June</button>
      <button onClick={() => handleDateClick('2023-06-23')}>23rd June</button>

      {selectedDate && (
        <div>
          <h3>Appointments on {selectedDate}:</h3>
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id}>{appointment.name}</li>
              ))}
            </ul>
          ) : (
            <p>No appointments found for {selectedDate}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Test;
