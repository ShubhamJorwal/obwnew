import React, { useState } from 'react';
import axios from 'axios';
import './EditCustomer.scss';
import { useNavigate } from 'react-router-dom';
const EditUserForm = ({ user, close }) => {
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');
  const [age, setAge] = useState(user.age || '');
  const [gender, setGender] = useState(user.gender || '');
  const [contactNo, setContactNo] = useState(user.contact_no || '');
  const [customerType, setCustomerType] = useState(user.customer_type || '');
  const [customerSince] = useState(user.customer_since || '');
  const [id] = useState(user.id || '');
  const navigate = useNavigate();
  const temprorytestdta = {
    customer_id: 430441,
    first_name: 'af12s',
    last_name: null,
    gender: null,
    age: null,
    contact_no: '321',
    customer_type: null,
    customer_since: '2023-07-06T12:13:30.277494Z',
    updated_at: '2023-07-06T12:13:30.000000Z',
    created_at: '2023-07-06T12:13:30.000000Z',
    id: 93
  };

  const formatUpdatedUser = () => {
    return {
      customer_id: user.customer_id,
      first_name: firstName || null,
      last_name: lastName || null,
      gender: gender || null,
      age: age || null,
      contact_no: contactNo || null,
      customer_type: customerType || null,
      customer_since: customerSince || null,
      updated_at: new Date().toISOString(),
      id: user.id
    };
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = formatUpdatedUser();

    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.post(
        'https://admin.obwsalon.com/api/update/customer',
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      console.log('User updated:', response.data,updatedUser);
      console.log('/customerr');
      navigate('/customers');
      location.reload();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="edit_form">
      <h1 onClick={() => close(false)}>X</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <label>
          Gender:
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contact No:
          <input
            type="text"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </label>
       
        <br />
        <label>
          Customer Type:
          <input
            type="text"
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default EditUserForm;
